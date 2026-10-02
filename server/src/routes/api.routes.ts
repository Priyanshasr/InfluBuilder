import { Router } from 'express';
import { uploadMiddleware } from '../services/storage.service.js';
import {
  analyzeVideoHandler,
  getProjectsHandler,
  getProjectByIdHandler,
  uploadImprovedVideoHandler,
  getEditorsHandler,
  getEditorByIdHandler,
  hireEditorHandler,
  deleteProjectHandler,
} from '../controllers/analysis.controller.js';

const router = Router();

// Health check and Gemini status
router.get('/status', (_req, res) => {
  const hasKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_key_here';
  res.json({
    status: 'online',
    geminiConfigured: hasKey,
    mode: hasKey ? 'Real Gemini API' : 'Demo Mode (Mock Analysis)',
  });
});

// Video Analysis Endpoints
router.post('/analyze', uploadMiddleware.single('video'), analyzeVideoHandler);
router.post('/projects/:id/improve', uploadMiddleware.single('video'), uploadImprovedVideoHandler);

// Projects Endpoints
router.get('/projects', getProjectsHandler);
router.get('/projects/:id', getProjectByIdHandler);
router.delete('/projects/:id', deleteProjectHandler);

// Editors Endpoints
router.get('/editors', getEditorsHandler);
router.get('/editors/:id', getEditorByIdHandler);
router.post('/hire-editor', hireEditorHandler);

export default router;
