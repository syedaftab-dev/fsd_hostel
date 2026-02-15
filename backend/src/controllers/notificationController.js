import { Notification } from '../models/Notification.js';

export async function createNotification(req, res) {
  try {
    const { title, message, category, link } = req.body;
    if (!title || !message) {
      return res.status(400).send('Title and message are required');
    }
    const notification = await Notification.create({ title, message, category, link });
    res.status(201).json(mapNotification(notification));
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create notification');
  }
}

export async function getNotifications(req, res) {
  try {
    const notifications = await Notification.find({}).sort({ createdAt: -1 });
    res.json(notifications.map(mapNotification));
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load notifications');
  }
}

export async function markNotificationsRead(req, res) {
  // Logic could be added here if notifications had an 'isRead' property per user
  // For now, we'll just return success to satisfy the frontend call
  res.status(200).send();
}

function mapNotification(n) {
  return {
    id: n._id.toString(),
    title: n.title,
    message: n.message,
    category: n.category,
    link: n.link,
    createdAt: n.createdAt,
  };
}
