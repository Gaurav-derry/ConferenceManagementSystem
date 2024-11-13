const express = require('express');
const { auth, roleAuthorization } = require('../middlewares/auth');
const Conference = require('../models/Conference');

const router = express.Router();

// Add conference - Only Admins and Managers can add conferences
router.post('/', roleAuthorization(['Admin', 'Manager']), async (req, res) => {
  try {
    const conference = new Conference(req.body);
    await conference.save();
    res.status(201).json(conference);
  } catch (error) {
    res.status(500).json({ error: 'Error creating conference' });
  }
});

// Get all conferences - Open to all authenticated users
router.get('/', auth, async (req, res) => {
  const conferences = await Conference.find();
  res.json(conferences);
});

// Delete conference - Only Admins can delete conferences
router.delete('/:id', roleAuthorization(['Admin']), async (req, res) => {
  try {
    const conference = await Conference.findByIdAndDelete(req.params.id);
    if (!conference) return res.status(404).json({ error: 'Conference not found' });
    res.json({ message: 'Conference deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting conference' });
  }
});

module.exports = router;
