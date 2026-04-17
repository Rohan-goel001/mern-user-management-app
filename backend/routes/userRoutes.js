const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add user
router.post('/add-user', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User saved");
});

// Delete user
router.delete('/delete-user/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("User deleted");
});

// Update user
router.put('/update-user/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.send("User updated");
});

module.exports = router;