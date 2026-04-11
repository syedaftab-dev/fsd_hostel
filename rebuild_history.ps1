# Rebuild Git History Script
$ErrorActionPreference = "Stop"

# Step 1: Create orphan branch
git checkout --orphan temp_branch
git rm -rf --cached . 2>$null

# Add .gitignore FIRST so node_modules are excluded
git add .gitignore
git commit -m "initial commit"

git add README.md
git add package.json
git add package-lock.json
git commit -m "add project readme and config"

git add backend/package.json
git add backend/package-lock.json
git commit -m "setup backend project"

git add backend/src/config/db.js
git commit -m "add database configuration"

git add frontend/package.json
git add frontend/package-lock.json
git commit -m "setup frontend project"

git add frontend/src/main.jsx
git add frontend/src/index.css
git commit -m "add frontend entry files"

git add backend/src/models/User.js
git commit -m "create user model"

git add backend/src/middleware/auth.js
git commit -m "add auth middleware"

git add backend/src/controllers/authController.js
git commit -m "add auth controller"

git add backend/src/routes/authRoutes.js
git commit -m "add auth routes"

git add backend/src/index.js
git commit -m "setup express server"

git add frontend/src/services/api.js
git commit -m "add api service"

git add frontend/src/types.js
git commit -m "add type definitions"

git add frontend/src/components/ui/Button.jsx
git add frontend/src/components/ui/Input.jsx
git commit -m "add button and input components"

git add frontend/src/components/ui/Card.jsx
git add frontend/src/components/ui/Modal.jsx
git commit -m "add card and modal components"

git add frontend/src/components/ui/Textarea.jsx
git commit -m "add textarea component"

git add frontend/src/components/auth/LoginForm.jsx
git commit -m "add login form"

git add frontend/src/components/auth/RegisterForm.jsx
git commit -m "add register form"

git add frontend/src/components/Icons.jsx
git commit -m "add icon components"

git add frontend/src/components/common/Sidebar.jsx
git commit -m "add sidebar navigation"

git add backend/src/models/Notification.js
git commit -m "add notification model"

git add backend/src/controllers/notificationController.js
git add backend/src/routes/notificationRoutes.js
git commit -m "add notification controller and routes"

git add frontend/src/components/admin/AdminDashboard.jsx
git commit -m "add admin dashboard page"

git add frontend/src/components/admin/AdminPortal.jsx
git commit -m "add admin portal layout"

git add frontend/src/components/admin/AdminNotifications.jsx
git commit -m "add admin notification panel"

git add frontend/src/components/student/StudentDashboard.jsx
git commit -m "add student dashboard"

git add frontend/src/components/student/StudentPortal.jsx
git commit -m "add student portal layout"

git add backend/src/controllers/adminController.js
git add backend/src/controllers/studentController.js
git add backend/src/routes/adminRoutes.js
git add backend/src/routes/studentRoutes.js
git commit -m "add admin and student controllers"

git add frontend/src/components/student/StudentProfile.jsx
git commit -m "add student profile component"

git add frontend/src/components/common/ProfilePage.jsx
git commit -m "add profile page"

git add backend/src/models/Room.js
git commit -m "add room model"

git add backend/src/controllers/roomController.js
git add backend/src/routes/roomRoutes.js
git commit -m "add room controller and routes"

git add frontend/src/components/admin/RoomAllocation.jsx
git commit -m "add room allocation page"

git add frontend/src/components/auth/ResetPassword.jsx
git commit -m "add password reset page"

git add backend/src/models/HealthRecord.js
git commit -m "add health record model"

git add backend/src/controllers/healthController.js
git commit -m "add health controller"

git add backend/src/routes/healthRoutes.js
git commit -m "add health routes"

git add frontend/src/components/student/HealthRecordView.jsx
git commit -m "add student health record view"

git add frontend/src/components/admin/AdminHealthRecords.jsx
git commit -m "add admin health records page"

git add backend/scripts/seedHealthRecords.js
git commit -m "add health records seed script"

git add backend/scripts/seedAdmin.js
git add backend/scripts/seedStudents.js
git add backend/scripts/seedDemoData.js
git commit -m "add seed data scripts"

git add backend/scripts/check_users.js
git add backend/scripts/updateStudents.js
git add backend/scripts/migrateAndHash.js
git add backend/scripts/fixParcels.js
git commit -m "add utility scripts"

git add backend/src/models/Complaint.js
git add backend/src/models/GatePass.js
git add backend/src/models/LeaveRequest.js
git commit -m "add complaint gatepass and leave models"

git add backend/src/models/EmergencyAlert.js
git add backend/src/models/LostAndFoundItem.js
git add backend/src/models/Parcel.js
git commit -m "add emergency lostfound and parcel models"

git add backend/src/models/MessMenuItem.js
git add backend/src/models/Message.js
git add backend/src/models/AntiRagging.js
git commit -m "add mess message and anti-ragging models"

git add backend/src/controllers/complaintController.js
git add backend/src/controllers/gatePassController.js
git add backend/src/controllers/leaveController.js
git add backend/src/routes/complaintRoutes.js
git add backend/src/routes/gatePassRoutes.js
git add backend/src/routes/leaveRoutes.js
git commit -m "add complaint gatepass and leave controllers"

git add backend/src/controllers/emergencyController.js
git add backend/src/controllers/lostFoundController.js
git add backend/src/controllers/parcelController.js
git add backend/src/routes/emergencyRoutes.js
git add backend/src/routes/lostFoundRoutes.js
git add backend/src/routes/parcelRoutes.js
git commit -m "add emergency lostfound and parcel controllers"

git add backend/src/controllers/messMenuController.js
git add backend/src/controllers/feesController.js
git add backend/src/routes/messMenuRoutes.js
git add backend/src/routes/feesRoutes.js
git commit -m "add mess menu and fees controllers"

git add frontend/src/components/student/ComplaintView.jsx
git add frontend/src/components/student/GatePassView.jsx
git add frontend/src/components/student/LeaveRequestView.jsx
git commit -m "add complaint gatepass and leave views"

git add frontend/src/components/student/EmergencyView.jsx
git add frontend/src/components/student/LostAndFoundView.jsx
git add frontend/src/components/student/ParcelView.jsx
git commit -m "add emergency lostfound and parcel views"

git add frontend/src/components/student/MessMenuView.jsx
git add frontend/src/components/student/FeePaymentView.jsx
git add frontend/src/components/student/PrintableGatePass.jsx
git add frontend/src/components/student/SportsView.jsx
git commit -m "add mess menu fees and sports views"

git add frontend/src/components/admin/ComplaintManagement.jsx
git add frontend/src/components/admin/GatePassManagement.jsx
git add frontend/src/components/admin/LeaveManagement.jsx
git add frontend/src/components/admin/EmergencyManagement.jsx
git commit -m "add admin management pages"

git add frontend/src/components/admin/LostAndFoundManagement.jsx
git add frontend/src/components/admin/ParcelManagement.jsx
git add frontend/src/components/admin/MessMenuEditor.jsx
git add frontend/src/components/admin/FeeStatus.jsx
git commit -m "add parcel mess and fee admin pages"

git add backend/src/controllers/chatController.js
git add backend/src/controllers/antiRaggingController.js
git add backend/src/routes/chatRoutes.js
git add backend/src/routes/antiRaggingRoutes.js
git add frontend/src/components/common/ChatView.jsx
git add frontend/src/components/common/AntiRaggingView.jsx
git commit -m "add chat and anti-ragging features"

git add backend/src/controllers/aiChatbotController.js
git add backend/src/routes/aiChatbotRoutes.js
git add frontend/src/components/common/AIChatbot.jsx
git commit -m "add AI chatbot feature"

git add frontend/src/components/QRCodeScanner.jsx
git commit -m "add QR code scanner"

git add backend/seedMenu.js
git add backend/clearMenu.js
git commit -m "add menu seed scripts"

git add frontend/src/App.jsx
git commit -m "add main app with routing"

git add frontend/dist/
git commit -m "add production build"

# Final catch-all
git add -A
git commit -m "final cleanup" --allow-empty

# Replace main branch
git branch -D main 2>$null
git branch -m main

Write-Host ""
Write-Host "Done! Run 'git log --oneline' to verify." -ForegroundColor Green
Write-Host "Then: git push origin main --force" -ForegroundColor Yellow
