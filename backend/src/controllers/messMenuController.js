import { MessMenuItem } from '../models/MessMenuItem.js';

export async function updateMessMenu(req, res) {
  try {
    const { menu } = req.body;
    if (!Array.isArray(menu)) {
      return res.status(400).send('Invalid menu');
    }
    await MessMenuItem.deleteMany({});
    const created = await MessMenuItem.insertMany(menu);
    res.json(created.map(mapMenu));
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update mess menu');
  }
}

function mapMenu(m) {
  return {
    day: m.day,
    breakfast: m.breakfast,
    lunch: m.lunch,
    dinner: m.dinner,
  };
}
