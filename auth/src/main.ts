import express from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || 'supersecret';

const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email(),
});

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

const users: Record<string, { password: string; email: string }> = {};

app.post('/register', (req, res) => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const { username, password, email } = validation.data;

  if (users[username]) {
    return res.status(409).json({ error: 'User already exists' });
  }

  users[username] = { password, email };

  return res.status(201).json({ status: true, message: 'User registered' });
});

app.post('/login', (req, res) => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const { username, password } = validation.data;

  if (!users[username] || users[username].password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

  return res.json({ status: true, message: 'User successfully logged in', data: { token } });
});

app.get('/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.json({ message: 'Access granted', user: decoded });
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth service running on http://localhost:${PORT}`);
});
