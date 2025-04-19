import express from 'express';
import defiProtocolsService from '../services/defiProtocolsService';

const router = express.Router();

// Use all routes from the DeFi protocols service
router.use('/', defiProtocolsService);

export default router;