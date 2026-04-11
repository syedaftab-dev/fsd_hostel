import { Complaint } from '../models/Complaint.js';
import { MessMenuItem } from '../models/MessMenuItem.js';
import { LeaveRequest } from '../models/LeaveRequest.js';
import { GatePass } from '../models/GatePass.js';
import { Parcel } from '../models/Parcel.js';
import { LostAndFoundItem } from '../models/LostAndFoundItem.js';
import { Notification } from '../models/Notification.js';
import { EmergencyAlert } from '../models/EmergencyAlert.js';
import { HealthRecord } from '../models/HealthRecord.js';
import { AntiRagging } from '../models/AntiRagging.js';

export const handleChatbotMessage = async (req, res) => {
  try {
    const { message, previousState } = req.body;
    const user = req.user;
    const lowerStr = message.toLowerCase();

    // 1. Reset Flow
    if (lowerStr.includes('cancel') || lowerStr.includes('exit')) {
      return res.json({ reply: "Okay, I've canceled the operation. How else can I help?", newState: 'IDLE' });
    }

    // 2. State-Based Workflows
    if (previousState === 'AWAITING_COMPLAINT_SUBJECT') {
      return res.json({
        reply: "Got it. Now, please describe your issue in detail.",
        newState: 'AWAITING_COMPLAINT_DESC',
        contextData: { subject: message }
      });
    }

    if (previousState === 'AWAITING_COMPLAINT_DESC') {
      const subject = req.body.contextData?.subject || 'Chatbot Complaint';
      const newComplaint = new Complaint({
        student: user._id,
        studentName: user.name || 'Student',
        rollNumber: user.rollNumber || 'Unknown',
        subject: subject,
        description: message,
        status: 'pending'
      });
      await newComplaint.save();
      return res.json({
        reply: "Your complaint has been successfully reported and escalated to the warden. We will notify you once it's resolved. Can I help you with anything else?",
        newState: 'IDLE',
        contextData: null
      });
    }

    // 3. Dynamic Queries
    
    // Mess Menu & Food
    if (lowerStr.includes('menu') || lowerStr.includes('food') || lowerStr.includes('mess') || lowerStr.includes('lunch') || lowerStr.includes('breakfast') || lowerStr.includes('dinner')) {
      const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      
      // Determine what day the user is asking about
      let targetDay = days[new Date().getDay()]; // default to today
      for (const d of days) {
        if (lowerStr.includes(d)) {
          targetDay = d;
          break;
        }
      }
      
      // Determine if they are asking for a specific meal
      const wantsBreakfast = lowerStr.includes('breakfast');
      const wantsLunch = lowerStr.includes('lunch');
      const wantsSnacks = lowerStr.includes('snack');
      const wantsDinner = lowerStr.includes('dinner');
      const specificMeal = wantsBreakfast || wantsLunch || wantsSnacks || wantsDinner;

      // Ensure first letter is capitalized for DB query based on how your data is saved (e.g., "Monday")
      const formattedDay = targetDay.charAt(0).toUpperCase() + targetDay.slice(1);
      
      const menu = await MessMenuItem.findOne({ day: formattedDay });
      
      if (!menu) return res.json({ reply: `I'm sorry, the mess menu for ${formattedDay} hasn't been uploaded yet.`, newState: 'IDLE' });
      
      let reply = `Here is the menu for ${formattedDay}:\n`;
      if (!specificMeal || wantsBreakfast) reply += `• Breakfast: ${menu.breakfast}\n`;
      if (!specificMeal || wantsLunch) reply += `• Lunch: ${menu.lunch}\n`;
      if (!specificMeal || wantsSnacks) reply += `• Snacks: ${menu.snacks || 'Not provided'}\n`;
      if (!specificMeal || wantsDinner) reply += `• Dinner: ${menu.dinner}`;
      
      return res.json({ reply: reply.trim(), newState: 'IDLE' });
    }

    // Fee Status
    if (lowerStr.includes('fee') || lowerStr.includes('pay') || lowerStr.includes('due')) {
        const status = user.feePaid ? "paid" : "unpaid";
        if (user.feePaid) {
             return res.json({ reply: "Great news! Your fees are currently marked as fully paid.", newState: 'IDLE' });
        } else {
             return res.json({ reply: "It looks like you have pending fee dues. Please navigate to the Fee Payment module to clear them.", newState: 'IDLE' });
        }
    }

    // Leave Request Status
    if (lowerStr.includes('leave request') || (lowerStr.includes('leave') && lowerStr.includes('status'))) {
        const latestLeave = await LeaveRequest.findOne({ rollNumber: user.rollNumber }).sort({ createdAt: -1 });
        if (!latestLeave) return res.json({ reply: "You don't have any recent leave requests.", newState: 'IDLE' });
        return res.json({ reply: `Your latest leave request (from ${latestLeave.fromDate} to ${latestLeave.toDate}) is currently: ${latestLeave.status.toUpperCase()}.`, newState: 'IDLE' });
    }

    // Gate Pass Status
    if (lowerStr.includes('gate pass') || (lowerStr.includes('pass') && lowerStr.includes('status'))) {
        const latestPass = await GatePass.findOne({ rollNumber: user.rollNumber }).sort({ createdAt: -1 });
        if (!latestPass) return res.json({ reply: "You don't have any recent gate pass requests.", newState: 'IDLE' });
        return res.json({ reply: `Your latest gate pass request for ${latestPass.fromDate} is currently: ${latestPass.status.toUpperCase()}.`, newState: 'IDLE' });
    }

    // Parcels
    if (lowerStr.includes('parcel') || lowerStr.includes('delivery')) {
        const pendingParcels = await Parcel.find({ student: user._id, collected: false });
        if (pendingParcels.length === 0) return res.json({ reply: "You don't have any pending parcels to collect at the moment.", newState: 'IDLE' });
        return res.json({ reply: `You have ${pendingParcels.length} parcel(s) waiting for collection! Please pick them up from the reception.`, newState: 'IDLE' });
    }

    // Lost and Found
    if (lowerStr.includes('lost') || lowerStr.includes('found')) {
        const items = await LostAndFoundItem.find({ status: 'open' }).sort({ datePosted: -1 }).limit(3);
        if (items.length === 0) return res.json({ reply: "There are no currently open lost & found items.", newState: 'IDLE' });
        const list = items.map(i => `• [${i.itemType.toUpperCase()}] ${i.description} at ${i.location}`).join('\n');
        return res.json({ reply: `Here are the latest lost & found items:\n${list}`, newState: 'IDLE' });
    }

    // Emergency
    if (lowerStr.includes('emergency')) {
        const alerts = await EmergencyAlert.find({ student: user._id }).sort({ timestamp: -1 }).limit(1);
        if (alerts.length === 0) return res.json({ reply: "You haven't reported any emergencies.", newState: 'IDLE' });
        return res.json({ reply: `Your latest emergency alert (${alerts[0].emergencyType}) is currently marked as: ${alerts[0].status.toUpperCase()}`, newState: 'IDLE' });
    }

    // Health Record
    if (lowerStr.includes('health') || lowerStr.includes('medical') || lowerStr.includes('doctor')) {
        const records = await HealthRecord.find({ student: user._id }).sort({ date: -1 }).limit(1);
        if (records.length === 0) return res.json({ reply: "You don't have any health records on file.", newState: 'IDLE' });
        return res.json({ reply: `Your latest health record from ${new Date(records[0].date).toLocaleDateString()}:\nDiagnosis: ${records[0].diagnosis}\nPrescription: ${records[0].prescription}\nStatus: ${records[0].status}`, newState: 'IDLE' });
    }

    // Announcements / Notifications / Sports
    if (lowerStr.includes('notification') || lowerStr.includes('announcement') || lowerStr.includes('sport')) {
        let query = {};
        if (lowerStr.includes('sport')) query = { title: { $regex: /sport/i } };
        
        const latestNotificaton = await Notification.findOne(query).sort({ createdAt: -1 });
        if (!latestNotificaton) return res.json({ reply: "You don't have any recent notifications matching your request.", newState: 'IDLE' });
        return res.json({ reply: `Latest Notification:\n${latestNotificaton.title}\n${latestNotificaton.message}`, newState: 'IDLE' });
    }

    // Anti Ragging Status
    if (lowerStr.includes('ragging') || lowerStr.includes('anti-ragging')) {
        const report = await AntiRagging.findOne({ student: user._id }).sort({ createdAt: -1 });
        if (!report) return res.json({ reply: "You haven't filed any anti-ragging reports. If you are experiencing distress, please report it immediately through the specialized module.", newState: 'IDLE' });
        return res.json({ reply: `Your latest anti-ragging report is currently handled with the highest priority. Current status: ${report.status?.toUpperCase() || 'UNDER REVIEW'}`, newState: 'IDLE' });
    }

    // Complaint Status
    if ((lowerStr.includes('complain') || lowerStr.includes('issue')) && lowerStr.includes('status')) {
        const latestComplaint = await Complaint.findOne({ student: user._id }).sort({ createdAt: -1 });
        if (!latestComplaint) return res.json({ reply: "You haven't filed any complaints recently.", newState: 'IDLE' });
        return res.json({ reply: `Your latest complaint regarding "${latestComplaint.subject}" is currently: ${latestComplaint.status.toUpperCase()}`, newState: 'IDLE' });
    }

    // Filing Complaints
    if (lowerStr.includes('complain') || lowerStr.includes('issue') || lowerStr.includes('problem') || lowerStr.includes('report')) {
      return res.json({
        reply: "I can help you report this to the management. Please tell me the subject or a short title for your complaint.",
        newState: 'AWAITING_COMPLAINT_SUBJECT'
      });
    }

    // Greetings
    if (lowerStr.includes('hi') || lowerStr.includes('hello') || lowerStr.includes('hey')) {
      return res.json({
        reply: `Hello ${user.name}! I am your AI assistant. I can check your gate pass/leave status, today's lunch menu, fee status, or help you file a complaint. What do you need?`,
        newState: 'IDLE'
      });
    }

    // Profile Details
    if (lowerStr.includes('profile') || lowerStr.includes('my detail') || lowerStr.includes('my info') || lowerStr.includes('who am i')) {
        const roomStatus = user.room ? `Room ${user.room.toString()}` : "Not Assigned";
        return res.json({ reply: `Your Profile Information:\nName: ${user.name}\nRoll Number: ${user.rollNumber}\n${roomStatus}\nEmail: ${user.email}`, newState: 'IDLE' });
    }

    // Rules / FAQ / General Information
    if (lowerStr.includes('rule') || lowerStr.includes('timing') || lowerStr.includes('time') || lowerStr.includes('guideline') || lowerStr.includes('open') || lowerStr.includes('close') || lowerStr.includes('allowed')) {
        return res.json({
            reply: `Here are some general hostel guidelines:\n• Gate Timings: The main gate closes at 10:00 PM strictly.\n• Quiet Hours: No loud music or disturbances after 11:00 PM.\n• Mess Timings: Breakfast (7:30-9:00 AM), Lunch (12:30-2:00 PM), Snacks (4:30-5:30 PM), Dinner (7:30-9:00 PM).\n• Visitors: Allowed only in the visitor lounge between 4:00 PM and 6:30 PM.\n• Cleaning: Housekeeping is available from 9:00 AM to 5:00 PM on weekdays.`,
            newState: 'IDLE'
        });
    }

    // Summary / "Give me an update" / "My status"
    if (lowerStr.includes('summary') || lowerStr.includes('update') || lowerStr.includes('dashboard') || lowerStr.includes('what is happening') || (lowerStr.includes('my') && lowerStr.includes('status'))) {
        const pass = await GatePass.findOne({ student: user._id }).sort({ createdAt: -1 });
        const leave = await LeaveRequest.findOne({ student: user._id }).sort({ createdAt: -1 });
        const comp = await Complaint.findOne({ student: user._id }).sort({ createdAt: -1 });
        const parcelCount = await Parcel.countDocuments({ student: user._id, collected: false });
        
        let summary = `Here is a summary of your recent activity:\n`;
        summary += `• Pending Parcels: ${parcelCount}\n`;
        summary += `• Latest Gate Pass: ${pass ? pass.status.toUpperCase() : 'None'}\n`;
        summary += `• Latest Leave: ${leave ? leave.status.toUpperCase() : 'None'}\n`;
        summary += `• Latest Complaint: ${comp ? comp.status.toUpperCase() : 'None'}\n`;
        summary += `• Fees: ${user.feePaid ? 'Paid' : 'Pending'}\n`;
        return res.json({ reply: summary, newState: 'IDLE' });
    }

    // Default Fallback - Intelligent matching failure
    return res.json({
      reply: "I'm a rule-based AI presently! You can ask me broad questions about your 'summary', 'status updates', 'hostel rules', 'mess menu times', 'health records', 'sports notifications', 'gate passes', or say 'report an issue'. I cover all modules!",
      newState: 'IDLE'
    });

  } catch (err) {
    console.error("Chatbot Error:", err);
    res.status(500).json({ reply: "I'm having technical difficulties connecting to my database right now. Please try again later.", newState: 'IDLE' });
  }
};
