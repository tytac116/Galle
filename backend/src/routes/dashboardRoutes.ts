import express from 'express';
import { getShiftReports, getLaundryRooms,  getAllVisitorSignIns, getVisitorSignInCount , getActivity, getMaintenanceRequestCount, getAllMaintenanceRequests } from '../controllers/dashboardController';

const router = express.Router();

router.get('/shift-reports', getShiftReports);
router.get('/laundry-rooms', getLaundryRooms);
router.get('/visitor-sign-ins', getAllVisitorSignIns);
router.get('/visitor-sign-ins/count', getVisitorSignInCount);
// Route to get the total number of outstanding maintenance requests
router.get('/maintenance-requests/count', getMaintenanceRequestCount);

// Route to get all outstanding maintenance requests
router.get('/maintenance-requests', getAllMaintenanceRequests);
router.get('/activity', getActivity);

export default router;