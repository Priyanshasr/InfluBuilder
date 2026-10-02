# INFLUBUILDER
### AI-Powered Content Improvement & Creator–Editor Platform
**Built for the Google Gemini API Hackathon (Best Use of Google Gemini API)**

> *"Don't just create content. Understand what makes it better."*

InfluBuilder is an intelligent content diagnosis ecosystem for video creators. Powered by **Google Gemini API**, it evaluates uploaded draft videos across visual quality, spoken audio, pacing, structure, and opening retention. Instead of claiming fake virality or views, InfluBuilder converts Gemini's multimodal perception into structured scores, timestamped feedback, priority improvement plans, a video editor marketplace, and a **Before vs. After Comparison Loop**.

---

## 🌟 Key Features

1. **Google Gemini Multimodal Video Audit**:
   - Analyzes video frames, audio speech clarity, pacing rhythm, and hook strength simultaneously.
   - Outputs strict, schema-validated JSON with overall scores, category breakdowns, strengths, and issues.

2. **Cinematic Analysis Experience**:
   - Progressive step-by-step audit visualization showing Gemini extracting content, inspecting hooks, checking audio acoustics, and generating recommendations.

3. **Priority Fixes & Actionable Workflows**:
   - "Fix These First" prioritized action cards with single-click options for **Do It Yourself (DIY)** or **Hire an Editor**.

4. **Editor Marketplace**:
   - Dedicated marketplace matching creators with specialist editors skilled in short-form reels, educational explainers, motion graphics, and commercial ads.

5. **Signature BEFORE vs AFTER Comparison**:
   - Dual-player visual verification displaying score gains (e.g., 68 → 84) across hook strength, pacing, clarity, and audio.

6. **Full SaaS Dashboard & Project Directory**:
   - Track videos analyzed, average content score, improvements made, and latest AI insights.

7. **Hackathon Zero-Downtime Demo Mode**:
   - Works seamlessly with real `GEMINI_API_KEY` calls or in Demo Mode with rich sample audits.

---

## 🏗️ Architecture & Technology Stack

```
                                  INFLUBUILDER ARCHITECTURE
                                  
+-----------------------------------------------------------------------------------------+
|                                    FRONTEND (CLIENT)                                    |
|   React 18 • TypeScript • Vite • Tailwind CSS • Lucide Icons • Recharts • Framer Motion   |
+-----------------------------------------------------------------------------------------+
                                              |
                                      HTTP / REST API
                                              v
+-----------------------------------------------------------------------------------------+
|                                    BACKEND (SERVER)                                     |
|                      Node.js • Express.js • TypeScript • Multer Uploads                 |
+-----------------------------------------------------------------------------------------+
                                      /               \
                  (GEMINI_API_KEY set)                 (Fallback / Demo Mode)
                           v                                   v
             +--------------------------+             +------------------+
             |   GOOGLE GEMINI 2.5 API  |             | DEMO MOCK ENGINE |
             |   Multimodal Video Audit |             | High Fidelity    |
             |   Structured JSON Output |             | Pre-loaded Audits|
             +--------------------------+             +------------------+
```

### Tech Stack Details:
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Router DOM, Lucide React, Recharts, Framer Motion
- **Backend**: Node.js, Express.js, TypeScript, Multer, `@google/genai` (Official Google Gen AI SDK)
- **AI Engine**: Google Gemini API (`gemini-2.5-flash`)
- **Storage**: Local disk upload handler (`/uploads` static server) with clean abstractions for Firebase Storage / S3.

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Node.js**: v18.x or v20.x or higher
- **npm** or **yarn**

### 2. Environment Setup
Copy `.env.example` to create your `.env` file:
```bash
cp .env.example .env
```
Inside `.env`:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=5000
VITE_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies
Run the root setup command:
```bash
cmd /c "npm install && cd server && npm install && cd ../client && npm install"
```

### 4. Run Locally
Run both client and server concurrently:
```bash
# Terminal 1: Run backend server (Port 5000)
cd server
cmd /c "npm run dev"

# Terminal 2: Run frontend client (Port 3000)
cd client
cmd /c "npm run dev"
```
Or from root:
```bash
cmd /c "npm run dev"
```

Open `http://localhost:3000` in your browser.

---

## 🤖 Google Gemini API Integration

The Gemini integration is located at [`server/src/services/gemini.service.ts`](file:///C:/Users/Lenovo/.gemini/antigravity/scratch/influbuilder/server/src/services/gemini.service.ts).

- Uses the official `@google/genai` SDK.
- Uploads video files via `ai.files.upload`.
- Requests structured JSON enforcing `responseMimeType: 'application/json'`.
- Evaluates: Hook strength, Content clarity, Pacing rhythm, Visual quality, Audio quality, CTA quality, Priority fixes, and Timestamp suggestions.

---

## 🎬 Hackathon Live Demo Flow (2-3 Minutes)

1. **Landing Page**: Open `http://localhost:3000`. Show the product dashboard preview and click **"Analyze My Video"**.
2. **Video Upload**: Select a draft video or click **"Analyze with Google Gemini"**.
3. **Cinematic Loading**: Observe the step-by-step progress as Gemini analyzes video frames, hook, audio, and pacing.
4. **AI Content Audit Report**: View the 78/100 circular score, Recharts radar chart, executive summary, and priority fixes.
5. **Fix It Workflow**: Click **"Fix It"** on the opening hook fix to inspect DIY instructions or open the **Editor Marketplace**.
6. **Editor Marketplace**: View editor profiles (Alex Vance, Marcus Chen) and click **"Hire Editor"**.
7. **Before vs. After Comparison**: Navigate to `/comparison/proj-1` to see the signature split player and +15 score upgrade.

---

## 📦 Deployment Instructions

### Frontend (Vercel)
- Framework Preset: Vite
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

### Backend (Render / Railway)
- Root Directory: `server`
- Build Command: `npm run build`
- Start Command: `npm start`
- Environment Variables: Add `GEMINI_API_KEY`.

---

## 📄 License & Positioning Disclaimer
InfluBuilder provides AI-generated content-quality indicators intended to assist content creators and video editors. InfluBuilder does not guarantee algorithm distribution, view counts, virality, or financial returns.
