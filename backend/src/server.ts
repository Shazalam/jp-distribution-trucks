import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Standard Middleware
const allowedOrigins = [
  'https://jp-distribution-trucks.vercel.app',
  'http://localhost:3000',
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health Check / Root Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'JP Distribution Backend API is running',
    version: '1.0.0',
    endpoints: {
      trucks: '/api/cms/trucks',
      quotes: '/api/quotes',
      mediaUpload: '/api/cms/media/upload',
      versions: '/api/cms/versions/:model/:id',
    }
  });
});

// Routes
import quoteRoutes from './routes/quotes';
import cmsRoutes from './routes/cmsRoutes';

app.use('/api/quotes', quoteRoutes);
app.use('/api/cms', cmsRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Server Error' : err.message
  });
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jp_distribution';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
