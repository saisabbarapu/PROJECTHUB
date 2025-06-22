import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export const signup = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Service unavailable: Database not connected' });
    }

    const { firstName, lastName, email, password } = req.body;

    // Validate email
    const emailRegex = /@(?:adityauniversity\.in|aec\.in)$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email must end with @adityauniversity.in or @aec.in' });
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (@$!%*?&)' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (err) {
    console.error('Error in signup:', err.message);
    console.error('Stack trace:', err.stack);
    res.status(500).json({ error: 'Failed to register user', details: err.message });
  }
};

export const login = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Service unavailable: Database not connected' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({ message: 'Login successful', user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
  } catch (err) {
    console.error('Error in login:', err.message);
    console.error('Stack trace:', err.stack);
    res.status(500).json({ error: 'Failed to login', details: err.message });
  }
};