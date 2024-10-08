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

// Route to get all visitor sign-ins

export const getAllVisitorSignIns = async (req: Request, res: Response) => {
  try {
      const result = await pool.query(
          `SELECT first_name, last_name, student_number, external_visitor, phone_number, email, sign_in_time, sign_in_date, visited_person, subwarden
          FROM visitor_sign_ins WHERE residence_name = 'Leo Marquard Hall' ORDER BY sign_in_time ASC;`
      );
      res.status(200).json(result.rows);
  } catch (error) {
      res.status(500).json({ error: "Failed to retrieve visitor sign-ins" });
  }
};

// Route to get the total number of visitor sign-ins
export const getVisitorSignInCount = async (req: Request, res: Response) => {
  try {
      const result = await pool.query(
          `SELECT COUNT(*) as total_visitor_sign_ins FROM visitor_sign_ins WHERE residence_name = 'Leo Marquard Hall';`
      );
      res.status(200).json(result.rows[0]);
  } catch (error) {
      res.status(500).json({ error: "Failed to retrieve visitor sign-in count" });
  }
};


// Route to get the total number of outstanding maintenance requests
export const getMaintenanceRequestCount = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as total_requests FROM maintenance_requests;'
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve maintenance request count' });
  }
};

// Route to get all outstanding maintenance requests
export const getAllMaintenanceRequests = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        maintenance_request_id,
        first_name,
        last_name,
        student_number,
        subwarden,
        issue,
        description,
        status,
        logged_time,
        residence
      FROM maintenance_requests
      ORDER BY logged_time ASC;
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve maintenance requests' });
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