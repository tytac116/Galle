import { Request, Response } from 'express';
import pool from '../config/database';

export const getShiftReports = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM shifts WHERE user_id = $1', [req.query.user_id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching shift reports' });
  }
};

export const getLaundryRooms = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM laundry_rooms');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching laundry room status' });
  }
};

export const getVisitorSignIns = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT COUNT(*) AS visitor_count FROM visitor_sign_in');
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching visitor sign-in data' });
  }
};

export const getMaintenanceRequests = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM maintenance_requests WHERE status = $1', ['pending']);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching maintenance requests' });
  }
};

export const getActivity = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM activities WHERE user_id = $1', [req.query.user_id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching activities' });
  }
};