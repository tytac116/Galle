import express from 'express';
import { getShiftReports, getLaundryRooms,  getAllVisitorSignIns, getVisitorSignInCount , getMaintenanceRequests, getActivity } from '../controllers/dashboardController';

const router = express.Router();

router.get('/shift-reports', getShiftReports);
router.get('/laundry-rooms', getLaundryRooms);
router.get('/visitor-sign-ins', getAllVisitorSignIns);
router.get('/visitor-sign-ins/count', getVisitorSignInCount);
router.get('/maintenance/requests', getMaintenanceRequests);
router.get('/activity', getActivity);

export default router;