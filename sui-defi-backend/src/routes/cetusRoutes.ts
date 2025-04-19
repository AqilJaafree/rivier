import express from 'express';
import cetusService from '../services/cetusService';

const router = express.Router();

// Use all routes from the Cetus service
router.use('/', cetusService);

export default router;