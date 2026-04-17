const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Model
const User = mongoose.model('User', {
  name: String,
  age: Number
});

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/add', async (req, res) => {
  const user = new User({ name: "Rohan", age: 20 });
  await user.save();
  res.send("User added");
});

// GET all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// DELETE user
app.delete('/delete-user/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("User deleted");
});

// UPDATE user
app.put('/update-user/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.send("User updated");
});

// POST user
app.post('/add-user', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User saved");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Start server (keep this at bottom)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
