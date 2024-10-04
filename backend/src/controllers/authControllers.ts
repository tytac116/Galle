import { Request, Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const user = userResult.rows[0];
    const passwordValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
};

export const forgotPassword = (req: Request, res: Response) => {
  const { email } = req.body;

  // You would implement sending an email with a reset token
  res.json({ message: `Password reset link sent to ${email}` });
};

export const resetPassword = (req: Request, res: Response) => {
  const { newPassword, resetToken } = req.body;

  // Here you'd verify the token and update the user's password
  res.json({ message: 'Password has been reset' });
};