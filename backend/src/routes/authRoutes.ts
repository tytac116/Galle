import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { login, forgotPassword, resetPassword } from '../controllers/authControllers';

const router = express.Router();

router.post('/login', asyncHandler(login));
router.post('/forgot-password', asyncHandler(forgotPassword));
router.post('/reset-password', asyncHandler(resetPassword));

export default router;