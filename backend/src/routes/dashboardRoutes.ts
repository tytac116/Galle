import express from 'express';
import { getShiftReports, getLaundryRooms, getVisitorSignIns, getMaintenanceRequests, getActivity } from '../controllers/dashboardController';

const router = express.Router();

router.get('/shift-reports', getShiftReports);
router.get('/laundry-rooms', getLaundryRooms);
router.get('/visitors/sign-in', getVisitorSignIns);
router.get('/maintenance/requests', getMaintenanceRequests);
router.get('/activity', getActivity);

export default router;