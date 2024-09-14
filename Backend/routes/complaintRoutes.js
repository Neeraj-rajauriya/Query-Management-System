import express from 'express';
import { createComplaint, getComplaints, updateComplaint } from '../controllers/complaintController.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/', authMiddleware, createComplaint);
router.get('/complaints', authMiddleware, getComplaints);

// Admin routes
router.put('/:id', [authMiddleware, isAdmin], updateComplaint);

export default router;
