import express from 'express';
import { authRequired, requireRole } from '../middleware/auth.js';
import { 
  submitComplaint, 
  getMyComplaints, 
  getAllComplaints, 
  updateComplaint 
} from '../controllers/antiRaggingController.js';

const router = express.Router();

router.use(authRequired);

router.route('/')
  .post(submitComplaint)
  .get((req, res, next) => {
    if (req.user.role === 'admin') {
      return getAllComplaints(req, res, next);
    } else {
      return getMyComplaints(req, res, next);
    }
  });

router.route('/:id')
  .put(requireRole('admin'), updateComplaint);

export default router;
