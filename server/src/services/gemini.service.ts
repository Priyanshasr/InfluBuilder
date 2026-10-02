/**
 * gena.service.ts
 * GENA AI (powered by Google Gemini) — Core intelligence layer for InfluBuilder.
 * GENA = General ENgagement Analyst. Internally uses the Gemini API.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GeminiAnalysis } from '../types/index';
import { generateMockAnalysisForFilename } from './mock.service';

export async function analyzeVideoWithGena(
  filePath: string,
  filename: string,
  mimeType: string
): Promise<GeminiAnalysis> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_key_here' || apiKey.trim() === '') {
    console.log('[GENA AI] API key not configured. Using GENA Demo Analysis engine.');
    return generateMockAnalysisForFilename(filename);
  }

  try {
    console.log(`[GENA AI] Initializing analysis for: ${filename}`);
    const fileManager = new GoogleAIFileManager(apiKey);
    const genAI = new GoogleGenerativeAI(apiKey);

    // Upload video file using Gemini File API (GENA backend)
    console.log(`[GENA AI] Uploading video to GENA processing pipeline...`);
    const uploadResult = await fileManager.uploadFile(filePath, {
      mimeType: mimeType || 'video/mp4',
      displayName: filename,
    });

    console.log(`[GENA AI] File received: ${uploadResult.file.name}. Waiting for processing...`);

    // Poll file status until ACTIVE
    let fileState = await fileManager.getFile(uploadResult.file.name);
    let attempts = 0;
    while (fileState.state === 'PROCESSING' && attempts < 15) {
      console.log(`[GENA AI] Video processing... (attempt ${attempts + 1})`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      fileState = await fileManager.getFile(uploadResult.file.name);
      attempts++;
    }

    if (fileState.state === 'FAILED') {
      throw new Error('[GENA AI] Video processing failed. Falling back to Demo engine.');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const promptText = `
You are GENA (General ENgagement Analyst), the AI content auditor for InfluBuilder — an AI-powered content improvement platform.
Analyze this uploaded video as a comprehensive content-quality audit.

Evaluate:
1. Hook strength (0-100) - Opening retention, curiosity, immediate value
2. Content clarity (0-100) - Message structure, key takeaway delivery, noise ratio
3. Pacing (0-100) - Clip duration, rhythm, silence/pause management
4. Visual quality (0-100) - Lighting, framing, stability, visual appeal
5. Audio quality (0-100) - Speech clarity, background noise, volume balance
6. CTA quality (0-100) - Clear ending guidance, viewer prompt strength
7. Overall content score (0-100)

IMPORTANT:
- Do NOT predict views, followers, virality, or revenue guarantees.
- Focus strictly on content quality indicators and actionable structural improvements.
- Identify concrete weaknesses that the creator or an editor can fix.

You MUST respond ONLY with a valid JSON object following this EXACT structure:
{
  "overallScore": 78,
  "hookScore": 72,
  "contentClarityScore": 84,
  "pacingScore": 68,
  "visualScore": 82,
  "audioScore": 76,
  "ctaScore": 71,
  "summary": "Brief 2-3 sentence overview of content strengths and primary improvement area.",
  "strengths": [
    "Strength 1 description",
    "Strength 2 description",
    "Strength 3 description"
  ],
  "issues": [
    {
      "title": "Short title of issue",
      "severity": "high",
      "explanation": "Detailed explanation of why this hurts viewer engagement or clarity",
      "recommendation": "Specific actionable fix for the creator or video editor"
    }
  ],
  "recommendations": [
    "General recommendation 1",
    "General recommendation 2"
  ],
  "timestamps": [
    {
      "start": "00:04",
      "end": "00:09",
      "issue": "Specific issue in this time slice",
      "recommendation": "Specific fix for this segment"
    }
  ],
  "priorityFixes": [
    {
      "id": "pf-1",
      "title": "Fix action title",
      "severity": "high",
      "category": "Hook Strength",
      "issue": "Core problem statement",
      "recommendation": "Exact step-by-step recommendation"
    }
  ]
}

If timestamps cannot be reliably inferred, return an empty array for timestamps rather than inventing fake times. Severity must be 'high', 'medium', or 'low'.
Return ONLY the raw JSON string without markdown code block formatting.
`;

    console.log(`[GENA AI] Running multimodal analysis via Gemini backend...`);
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResult.file.mimeType,
          fileUri: uploadResult.file.uri,
        },
      },
      { text: promptText },
    ]);

    const responseText = result.response.text();
    console.log(`[GENA AI] Analysis complete. Parsing structured report...`);

    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData: GeminiAnalysis = JSON.parse(cleanedText);

    // Cleanup file from API storage
    try {
      await fileManager.deleteFile(uploadResult.file.name);
    } catch (e) {
      console.warn('[GENA AI] Non-critical: Cleanup of processed file failed:', e);
    }

    return {
      ...parsedData,
      isDemo: false,
    };
  } catch (error) {
    console.error('[GENA AI] Analysis pipeline failed:', error);
    console.log('[GENA AI] Falling back to GENA Demo Analysis engine to maintain demo availability.');
    return generateMockAnalysisForFilename(filename);
  }
}

// Keep backward-compatible alias
export const analyzeVideoWithGemini = analyzeVideoWithGena;
