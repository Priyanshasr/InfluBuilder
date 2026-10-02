import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { analyzeVideoWithGemini } from '../services/gemini.service';
import { sampleProjects, mockEditors, generateMockAnalysisForFilename } from '../services/mock.service';
import { Project } from '../types/index';

// In-memory store initialized with sample projects
export let projectsStore: Project[] = [...sampleProjects];

export async function analyzeVideoHandler(req: Request, res: Response) {
  try {
    const file = req.file;
    const forceDemo = req.body.forceDemo === 'true' || req.body.forceDemo === true;
    const category = req.body.category || 'General Content';

    let analysisResult;
    let videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
    let filename = 'Uploaded_Video.mp4';

    if (file) {
      filename = file.originalname;
      videoUrl = `/uploads/${file.filename}`;

      if (forceDemo) {
        analysisResult = generateMockAnalysisForFilename(filename);
      } else {
        analysisResult = await analyzeVideoWithGemini(file.path, file.originalname, file.mimetype);
      }
    } else {
      // Demo upload fallback if no physical file provided
      analysisResult = generateMockAnalysisForFilename(filename);
    }

    const newProject: Project = {
      id: `proj-${uuidv4().substring(0, 8)}`,
      title: req.body.title || filename.replace(/\.[^/.]+$/, ""),
      category: category,
      originalVideoUrl: videoUrl,
      thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400',
      score: analysisResult.overallScore,
      status: 'analyzed',
      createdAt: new Date().toISOString(),
      analysis: analysisResult,
    };

    projectsStore.unshift(newProject);

    return res.status(200).json({
      success: true,
      message: 'Video analysis completed successfully',
      project: newProject,
    });
  } catch (error: any) {
    console.error('[InfluBuilder Server] Error in analyzeVideoHandler:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to complete video analysis',
    });
  }
}

export async function getProjectsHandler(_req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    projects: projectsStore,
  });
}

export async function getProjectByIdHandler(req: Request, res: Response) {
  const { id } = req.params;
  const project = projectsStore.find((p) => p.id === id);

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found',
    });
  }

  return res.status(200).json({
    success: true,
    project,
  });
}

export async function uploadImprovedVideoHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const projectIndex = projectsStore.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const project = projectsStore[projectIndex];
    const file = req.file;
    const forceDemo = req.body.forceDemo === 'true' || req.body.forceDemo === true;

    let improvedVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';
    let filename = 'Improved_Version.mp4';
    let improvedAnalysis;

    if (file) {
      filename = file.originalname;
      improvedVideoUrl = `/uploads/${file.filename}`;

      if (forceDemo) {
        improvedAnalysis = generateMockAnalysisForFilename(`Improved_${filename}`);
        improvedAnalysis.overallScore = Math.min(98, project.score + 15);
        improvedAnalysis.hookScore = Math.min(98, project.analysis.hookScore + 18);
        improvedAnalysis.pacingScore = Math.min(98, project.analysis.pacingScore + 14);
        improvedAnalysis.contentClarityScore = Math.min(98, project.analysis.contentClarityScore + 12);
        improvedAnalysis.audioScore = Math.min(98, project.analysis.audioScore + 8);
        improvedAnalysis.summary = `Great improvement! Gemini re-analysis confirms that the edited clip resolves opening hook delays and improves overall content rhythm.`;
      } else {
        improvedAnalysis = await analyzeVideoWithGemini(file.path, file.originalname, file.mimetype);
      }
    } else {
      // Mock improved analysis boost for demo flow
      improvedAnalysis = generateMockAnalysisForFilename(`Improved_${project.title}`);
      improvedAnalysis.overallScore = Math.min(98, project.score + 15);
      improvedAnalysis.hookScore = Math.min(98, project.analysis.hookScore + 18);
      improvedAnalysis.pacingScore = Math.min(98, project.analysis.pacingScore + 14);
      improvedAnalysis.contentClarityScore = Math.min(98, project.analysis.contentClarityScore + 12);
      improvedAnalysis.audioScore = Math.min(98, project.analysis.audioScore + 8);
      improvedAnalysis.summary = `Great improvement! Gemini re-analysis confirms that the edited clip resolves opening hook delays and improves overall content rhythm.`;
    }

    const updatedProject: Project = {
      ...project,
      improvedVideoUrl,
      status: 'improved',
      improvedAnalysis,
    };

    projectsStore[projectIndex] = updatedProject;

    return res.status(200).json({
      success: true,
      message: 'Improved video analyzed and updated',
      project: updatedProject,
    });
  } catch (error: any) {
    console.error('[InfluBuilder Server] Error in uploadImprovedVideoHandler:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to re-analyze improved video',
    });
  }
}

export async function getEditorsHandler(_req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    editors: mockEditors,
  });
}

export async function getEditorByIdHandler(req: Request, res: Response) {
  const { id } = req.params;
  const editor = mockEditors.find((e) => e.id === id);

  if (!editor) {
    return res.status(404).json({ success: false, error: 'Editor not found' });
  }

  return res.status(200).json({
    success: true,
    editor,
  });
}

export async function hireEditorHandler(req: Request, res: Response) {
  const { projectId, editorId, notes } = req.body;

  const projectIndex = projectsStore.findIndex((p) => p.id === projectId);
  if (projectIndex === -1) {
    return res.status(404).json({ success: false, error: 'Project not found' });
  }

  const editor = mockEditors.find((e) => e.id === editorId);

  projectsStore[projectIndex] = {
    ...projectsStore[projectIndex],
    editorId,
    editorStatus: 'pending',
    editorNotes: notes,
    status: 'in_progress',
  };

  return res.status(200).json({
    success: true,
    message: `Edit request sent to ${editor ? editor.name : 'Editor'}`,
    project: projectsStore[projectIndex],
  });
}

export async function deleteProjectHandler(req: Request, res: Response) {
  const { id } = req.params;
  projectsStore = projectsStore.filter((p) => p.id !== id);
  return res.status(200).json({ success: true, message: 'Project deleted' });
}
