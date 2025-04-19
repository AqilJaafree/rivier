import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cetusRoutes from './routes/cetusRoutes';
import defiRoutes from './routes/defiRoutes';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cetus', cetusRoutes);
app.use('/api/defi', defiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});