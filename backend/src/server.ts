import express from 'express';
import dotenv from 'dotenv';
import pool from './config/database';
import authRoutes from './routes/authRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Test route to verify DB connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Connected to the database!', time: result.rows[0] });
  } catch (err) {
    console.error('Error connecting to the database', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});