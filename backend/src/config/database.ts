import { Pool } from 
'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required by Render for SSL connections
  }
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database');
});

export default pool;