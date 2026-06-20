import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import videoRoutes from './routes/videoRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://socially-approved-carousel-seven.vercel.app",
    "https://socially-approved-carousel-ngbskidyv-badal-paswans-projects.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

app.get('/', (_req, res) => res.json({ message: 'Socially Approved Carousel API is running' }));
app.use('/api', videoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
