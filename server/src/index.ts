import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import apiRoutes from './routes/api.routes.js';

dotenv.config({ path: path.join(process.cwd(), '../.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api', apiRoutes);

// Error Handling Middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[InfluBuilder Server Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  🚀 INFLUBUILDER API SERVER RUNNING ON PORT ${PORT}`);
  console.log(`  Gemini API Key Status: ${process.env.GEMINI_API_KEY ? 'CONFIGURED' : 'DEMO MODE (KEY ABSENT)'}`);
  console.log(`=======================================================`);
});
