# ⚡ AI SyntheticaPulse
**Next-Gen Autonomous Agentic Ecosystem, Relational Intelligence & Enterprise ServiceNow IT Portal**  
*Curated & Engineered by Nazma Khan • AI-901 Enterprise Architecture*

[![Deployed on GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Active-22c55e?logo=github&logoColor=white)](https://najzzkhan-bit.github.io/AI901_Project-/)
[![Deployed on Render](https://img.shields.io/badge/Render-Web_Hosting-46e3b7?logo=render&logoColor=white)](https://dashboard.render.com)
[![Author: Nazma Khan](https://img.shields.io/badge/Creator-Nazma%20Khan-8b5cf6)](https://github.com/najzzkhan-bit/AI901_Project-)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**AI SyntheticaPulse** explores the paradigm shift from reactive chatbots into autonomous agentic ecosystems and persistent relational companions. It unifies advanced research on multi-agent delegation, human-AI attachment, and cognitive governance with a restored and upgraded **ServiceNow IT Support Service Portal (HANA Agent Core)**.

---

## 🌟 Key Features

### 1. Evolutionary Paradigm: The Three Phases of Interaction
- **Phase 1: Query-Response (2022–2024):** Single prompts, text generation, and one-shot ephemeral inference.
- **Phase 2: Context-Aware Workflows (2024–2025):** Long-term session memory, retrieval-augmented generation (RAG), and specialized tool calling.
- **Phase 3: Agentic Delegation (2026 & Beyond):** High-level objective assignment, autonomous tool chain orchestration, environment execution, and auditable oversight.
- **Interactive 3-Stage Diagram:** Live clickable phases with real-time telemetry inspection and an animated **"Simulate Agentic Pipeline"** execution runner.
- *Core Mindset Shift:* Moving from *"What can I ask this model?"* to *"What responsibilities can I delegate to this system?"*

### 2. Relational AI & The Architecture of Attachment
- Detailed exploration of companion-driven architectures and social AI personas.
- **Persistent Memory & Emotional Tuning:** How permitted conversational memory adapts agent tone and responses.
- **Social Rehearsal vs. Isolation:** Creating safe spaces for practicing difficult conversations without supplanting human relationships.
- **Asymmetric Attachment:** Ethical analysis of parasocial risks where AI companions lack human feelings or personal boundaries.
- *Source attribution:* **Mean CEO's Blog — Violetta Bonenkamp**.

### 3. Agentic Risk Surface & Interactive Governance Matrix
- **Cascading Autonomy:** Preventing unintended execution cascades when agents interface with email, cloud APIs, and financial systems.
- **Prompt Injection & Hijacking:** Strict isolation of untrusted retrieved web payloads from execution prompts.
- **Loss of Cognitive Agency:** Combating cognitive atrophy and confirmation bias through transparent reasoning trails.
- **Interactive Governance Table:** Filterable matrix detailing vulnerabilities, failure modes, technical safeguards, and human oversight controls.

### 4. Upgraded AI SyntheticaPulse Agent Experience
- **Universal Visitor Onboarding:** Works for every new visitor—no hardcoded name assumptions. Greets each person naturally:  
  `"Hi! Welcome to AI SyntheticaPulse. I'm your AI assistant. What should I call you?"`
  Remembers the visitor's preferred name for the session and addresses them conversationally.
- **Real-Time Two-Way Voice Conversations:**
  - 🎙️ Microphone button with animated listening pulses and waveform visualizer.
  - Speech recognition (`SpeechRecognition` / `webkitSpeechRecognition`) converting speech to text in real time.
  - Natural speech synthesis (`SpeechSynthesis`) with selectable voice models, pitch, and cadence.
  - Instant user interruption: speaking or clicking the microphone cancels active AI speech immediately.
  - Dedicated **Stop Speaking** and **Voice Test** controls.
- **Live Web Search Capability:**
  - Automatic and manual web retrieval for current technology developments, AI news, and documentation.
  - Displays a subtle `"Searching the web..."` state while retrieving.
  - Returns verified results with clickable source links: `[Source: Title](url)`.
  - Untrusted content is sanitized before presentation to prevent indirect injection.
- **Real-Time Agent Activity Visualizer (HUD):**
  - Displays live states: `🟢 Idle`, `🎙️ Listening...`, `🧠 Reasoning...`, `🌐 Web Search...`, and `🔊 Speaking...`.

### 5. Restored ServiceNow IT Support Service Desk (HANA Engine)
- Restored original HANA IT Support Agent capabilities:
  - Corporate email or Employee ID credential verification stage.
  - **Mandatory 5-Step Diagnostic Framework:**
    1. Basic hardware & paper jam check.
    2. 30-second power cycle.
    3. Data cable & port reseat.
    4. Network/Wi-Fi connection verification.
    5. Print queue flush & offline mode disable.
  - **ServiceNow Incident API Simulation:**
    - If resolved: automatically logs and closes L1 ticket **INC0010003** (State 6 Resolved).
    - If unresolved: escalates ticket to Tier-2 senior infrastructure queue **INC0010234** (State New / Assigned).
  - Quick action portal cards for **Order Hardware**, **IT Knowledge Base**, and **Open Incident Ticket**.

### 6. Synthetica Quantum Neural Core & Visual Aesthetics
- 3D interactive Canvas sphere with real-time sliders for Autonomy, Memory Depth, Safety Rigor, and Collaborative Alignment.
- Subtle, professional human-AI friendship visual (`synthetica-symbiosis.jpg`) featuring a sleek human silhouette interacting with a glowing AI intelligence network.
- Generative Web Audio harmonic crystal chimes (zero external audio files).

---

## 🛠️ Technology Stack & Architecture

- **Frontend:** Pure semantic HTML5, Vanilla CSS3 (custom CSS design tokens, glassmorphism, responsive grid), Vanilla JavaScript (ES6+).
- **APIs & Web Standards:** Web Speech API (`SpeechRecognition`, `SpeechSynthesis`), Web Audio API (`AudioContext`), Canvas 2D API.
- **Backend Service:** Lightweight Node.js server (`server.js`) providing static file hosting, live search proxy (`/api/search`), and health telemetry (`/api/health`).
- **External Data Providers:** DuckDuckGo Instant Answer API & Wikipedia Search API (with automatic client-side fallback for static GitHub Pages hosting).

---

## 🚀 Deployment Instructions

### Method 1: GitHub Pages (Live Static Deployment)

This repository includes a GitHub Actions static deployment workflow located at `.github/workflows/static.yml`.

1. Push changes to the repository:
   ```bash
   git push origin najzzkhan-bit-patch-1
   # Or push to main
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions** (or select **Deploy from a branch** with `/root`).
3. Your site is live at:
   **`https://najzzkhan-bit.github.io/AI901_Project-/`**

### Method 2: Render.com (Full-Stack Web Service)

This repository includes a `render.yaml` blueprint for 1-click cloud hosting.

1. Open your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** &rarr; **Blueprint**.
3. Select your repository: `https://github.com/najzzkhan-bit/AI901_Project-`.
4. Render will provision the Node.js web service on the free tier.
5. Click **Apply**. The deployment completes in ~60 seconds.

### Method 3: Local Development

To run the project locally on your machine:

```bash
# Start the local server
node server.js
```

Open your browser at `http://localhost:3000`.

---

## 🔑 Environment Variables & API Keys

The application runs **100% out-of-the-box with zero mandatory API keys** using client-side Web Speech, Web Audio, and public search indices.

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Local and cloud server listening port | `3000` (Render defaults to `10000`) |
| `OPENAI_API_KEY` *(Optional)* | Optional OpenAI API key if external LLM generation is configured | None |
| `GEMINI_API_KEY` *(Optional)* | Optional Google Gemini API key if external LLM generation is configured | None |

> **Security Note:** All credentials and sensitive environment variables remain strictly server-side. No API keys are bundled or exposed to frontend client code.

---

## 🧪 Verification & Testing

- ✅ **Visitor Name Handling:** Tested with custom names ("Rahul", "Sarah", etc.) and declining responses. No hardcoded name assumptions.
- ✅ **Speech Synthesis & Interruption:** Verified voice narration, voice selection, stop-speaking button, and instant interruption.
- ✅ **Microphone Speech Recognition:** Verified Web Speech recognition listening state and auto-fill into chat.
- ✅ **Live Web Search:** Verified query retrieval via DuckDuckGo and Wikipedia with clickable citations and untrusted content sanitization.
- ✅ **HANA IT Support:** Verified 5-step hardware troubleshooting sequence, Employee ID verification, and ServiceNow tickets `INC0010003` & `INC0010234`.
- ✅ **3D Animations & Sliders:** Verified interactive particle lattice, 3D Quantum Core, and tilt physics across desktop and mobile.
