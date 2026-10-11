// AI SyntheticaPulse - Next-Gen Autonomous Agentic Ecosystem & IT Support Engine
// Conceived and Engineered by Nazma Khan

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initEvolutionDiagram();
  initGovernanceTable();
  initSyntheticaCore();
  initServiceNowDesk();
  initSyntheticaAgent();
  initSoundAmbience();
  initTiltCards();
});

/* =========================================================
   1. Interactive Constellation Canvas (Human & AI Particles)
   ========================================================= */
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, radius: 160 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((width * height) / 13000), 85);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.isAI = Math.random() > 0.5;
      this.color = this.isAI ? 'rgba(56, 189, 248, ' : 'rgba(168, 85, 247, ';
      this.alpha = Math.random() * 0.5 + 0.25;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.isAI ? '#38bdf8' : '#a855f7';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const opacity = (1 - dist / 130) * 0.22;

          if (particles[i].isAI !== particles[j].isAI) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 1.5})`;
          } else {
            ctx.strokeStyle = particles[i].color + opacity + ')';
          }
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* =========================================================
   2. Interactive 3-Stage Evolutionary Diagram
   ========================================================= */
function initEvolutionDiagram() {
  const stageCards = document.querySelectorAll('.stage-card');
  const panelTag = document.getElementById('panelTag');
  const panelTitle = document.getElementById('panelTitle');
  const panelDesc = document.getElementById('panelDesc');
  const panelBullets = document.getElementById('panelBullets');
  const telemetryDelegation = document.getElementById('telemetryDelegation');
  const telemetryFill = document.getElementById('telemetryFill');
  const telemetryTools = document.getElementById('telemetryTools');
  const telemetryLoop = document.getElementById('telemetryLoop');
  const runSimulationBtn = document.getElementById('runSimulationBtn');
  const simActivityBox = document.getElementById('simActivityBox');
  const simStepsList = document.getElementById('simStepsList');
  const simStatusText = document.getElementById('simStatusText');

  const stageData = {
    1: {
      tag: "Phase 1: Query-Response (2022–2024)",
      title: "Single Prompts: Chat & Question Answering",
      desc: "Users treated AI as a search engine or text generator, prompting it to perform one task at a time. Systems operated with strictly ephemeral context windows, answering immediate prompts without persistent memory or environmental actions.",
      bullets: [
        "Single-turn request and completion",
        "Ephemeral context without cross-session memory",
        "Manual user validation for each step"
      ],
      delegation: "15% (Low)",
      delegationPct: 15,
      tools: "None / Direct Chat",
      loop: "One-Shot Turn",
      simSteps: [
        "1. User initiates prompt: 'Summarize this document.'",
        "2. LLM performs single forward inference pass.",
        "3. Output rendered as static plain text.",
        "4. Session terminates without state persistence or tool call."
      ]
    },
    2: {
      tag: "Phase 2: Context-Aware Workflows (2024–2025)",
      title: "Context & Memory: Assistants, Tools & Personalized Context",
      desc: "Systems began integrating long-term memory, file retrieval (RAG), and specialized tools and plugins. AI assistants could access past interactions and reference uploaded databases to ground answers.",
      bullets: [
        "Retrieval-Augmented Generation (RAG) across files",
        "Function calling for deterministic tools",
        "Permitted conversation memory adapting responses"
      ],
      delegation: "55% (Moderate)",
      delegationPct: 55,
      tools: "File Retrieval & Function Calling",
      loop: "Assisted Workflow",
      simSteps: [
        "1. User submits query with external document context.",
        "2. Vector store search retrieves top-k semantic chunks.",
        "3. Assistant invokes calculator or weather tool via JSON schema.",
        "4. Grounded answer generated with source citations."
      ]
    },
    3: {
      tag: "Phase 3: Agentic Delegation (2026 & Beyond)",
      title: "Autonomous Agents: Delegation, Planning & Action",
      desc: "Rather than simply generating drafts, multi-agent frameworks can be assigned high-level objectives. They can orchestrate tool chains, execute code, manage calendars, and interact with external APIs, subject to permissions and configured oversight.",
      bullets: [
        "High-level objective assignment ('Resolve ticket & deploy fix')",
        "Dynamic planning, reflection, and subagent orchestration",
        "Auditable tool execution with human-in-the-loop gates"
      ],
      delegation: "95% (Autonomous)",
      delegationPct: 95,
      tools: "Orchestrated Multi-API & Code Exec",
      loop: "Continuous Autonomous Loop",
      simSteps: [
        "1. Objective received: 'Diagnose hardware fault and update ServiceNow incident.'",
        "2. Synthetica Planner creates 4-step execution DAG.",
        "3. Diagnostics agent runs hardware checks and verifies network state.",
        "4. ServiceNow REST Table API called with incident INC0010003 (State: Resolved).",
        "5. Final audit trail written to telemetry; human notified of completion."
      ]
    }
  };

  let currentStage = 1;

  function selectStage(stageNum) {
    currentStage = stageNum;
    stageCards.forEach(card => {
      card.classList.toggle('active', parseInt(card.getAttribute('data-stage')) === stageNum);
    });

    const data = stageData[stageNum];
    if (panelTag) panelTag.textContent = data.tag;
    if (panelTitle) panelTitle.textContent = data.title;
    if (panelDesc) panelDesc.textContent = data.desc;
    if (telemetryDelegation) telemetryDelegation.textContent = data.delegation;
    if (telemetryFill) telemetryFill.style.width = data.delegationPct + '%';
    if (telemetryTools) telemetryTools.textContent = data.tools;
    if (telemetryLoop) telemetryLoop.textContent = data.loop;

    if (panelBullets) {
      panelBullets.innerHTML = data.bullets.map(b => `<div class="bullet-item"><span>🔹</span> ${b}</div>`).join('');
    }

    if (simActivityBox) simActivityBox.style.display = 'none';
  }

  stageCards.forEach(card => {
    card.addEventListener('click', () => {
      const stage = parseInt(card.getAttribute('data-stage'));
      selectStage(stage);
      playChime(300 + stage * 100);
    });
  });

  if (runSimulationBtn) {
    runSimulationBtn.addEventListener('click', () => {
      const data = stageData[currentStage];
      if (!simActivityBox || !simStepsList) return;

      simActivityBox.style.display = 'block';
      simStepsList.innerHTML = '';
      if (simStatusText) simStatusText.textContent = `Executing ${data.tag} Simulation...`;

      data.simSteps.forEach((step, index) => {
        setTimeout(() => {
          const stepDiv = document.createElement('div');
          stepDiv.className = 'sim-step-item';
          stepDiv.textContent = step;
          simStepsList.appendChild(stepDiv);
          playChime(400 + index * 80);
        }, index * 600);
      });
    });
  }
}

/* =========================================================
   3. Governance Matrix Interactive Filtering
   ========================================================= */
function initGovernanceTable() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const tableRows = document.querySelectorAll('#governanceTable tbody tr');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      tableRows.forEach(row => {
        const cat = row.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
      playChime(500);
    });
  });
}

/* =========================================================
   4. Synthetica Quantum Neural Core (3D Canvas Sphere)
   ========================================================= */
function initSyntheticaCore() {
  const canvas = document.getElementById('sphereCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = canvas.parentElement.clientWidth;
  let height = canvas.height = canvas.parentElement.clientHeight;

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  });

  const sAutonomy = document.getElementById('sliderAutonomy');
  const sMemory = document.getElementById('sliderMemory');
  const sSafety = document.getElementById('sliderSafety');
  const sAlignment = document.getElementById('sliderAlignment');
  const scoreDisplay = document.getElementById('symbiosisScore');
  const mottoDisplay = document.getElementById('symbiosisMotto');

  let autonomy = parseInt(sAutonomy ? sAutonomy.value : 85);
  let memory = parseInt(sMemory ? sMemory.value : 92);
  let safety = parseInt(sSafety ? sSafety.value : 90);
  let alignment = parseInt(sAlignment ? sAlignment.value : 86);

  function updateMotto(avg) {
    if (!mottoDisplay) return;
    if (avg >= 90) {
      mottoDisplay.innerHTML = `🌟 "Harmonic Equilibrium: Autonomous multi-tool chains guarded by verifiable safety and human oversight."`;
    } else if (avg >= 75) {
      mottoDisplay.innerHTML = `✨ "Agentic Synergy: Continuous memory and adaptive tools elevating human productivity."`;
    } else {
      mottoDisplay.innerHTML = `🛡️ "Safe Confinement: Baseline agentic execution with strict sandbox controls."`;
    }
  }

  function handleSliders() {
    autonomy = parseInt(sAutonomy.value);
    memory = parseInt(sMemory.value);
    safety = parseInt(sSafety.value);
    alignment = parseInt(sAlignment.value);

    document.getElementById('valAutonomy').textContent = autonomy + '%';
    document.getElementById('valMemory').textContent = memory + '%';
    document.getElementById('valSafety').textContent = safety + '%';
    document.getElementById('valAlignment').textContent = alignment + '%';

    const avg = Math.round((autonomy + memory + safety + alignment) / 4);
    if (scoreDisplay) scoreDisplay.textContent = avg + '% Alignment';
    updateMotto(avg);
    playChime(220 + avg * 3);
  }

  [sAutonomy, sMemory, sSafety, sAlignment].forEach(slider => {
    if (slider) slider.addEventListener('input', handleSliders);
  });

  let angle = 0;
  function drawCore() {
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const baseRadius = Math.min(width, height) * 0.28;

    angle += 0.015 * (autonomy / 60);

    // Glowing core gradient
    const coreGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, baseRadius * 1.5);
    coreGrad.addColorStop(0, `rgba(56, 189, 248, ${memory / 140})`);
    coreGrad.addColorStop(0.5, `rgba(168, 85, 247, ${alignment / 180})`);
    coreGrad.addColorStop(1, 'rgba(6, 9, 19, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, baseRadius * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Orbital harmonic wave rings
    const rings = 5;
    for (let r = 1; r <= rings; r++) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * (r % 2 === 0 ? 1 : -1) * (0.5 + r * 0.2));

      ctx.beginPath();
      const rx = baseRadius * (0.6 + r * 0.2);
      const ry = baseRadius * (0.35 + (safety / 200));
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);

      ctx.strokeStyle = r % 2 === 0
        ? `rgba(56, 189, 248, ${0.4 + (memory / 200)})`
        : `rgba(168, 85, 247, ${0.3 + (alignment / 200)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Orbital glowing node
      const pearlAngle = angle * (1.2 + r * 0.3);
      const px = Math.cos(pearlAngle) * rx;
      const py = Math.sin(pearlAngle) * ry;

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();

      ctx.restore();
    }

    // Central pulsing beacon
    const pulseR = baseRadius * 0.45 + Math.sin(angle * 3) * 6;
    ctx.beginPath();
    ctx.arc(cx, cy, pulseR, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + (autonomy / 300)})`;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fill();

    requestAnimationFrame(drawCore);
  }

  drawCore();
}

/* =========================================================
   5. Restored ServiceNow IT Support Desk
   ========================================================= */
function initServiceNowDesk() {
  const snSearchBtn = document.getElementById('snSearchBtn');
  const snSearchInput = document.getElementById('snSearchInput');
  const launchHanaBtn = document.getElementById('launchHanaDiagnosticBtn');

  if (snSearchBtn && snSearchInput) {
    snSearchBtn.addEventListener('click', () => {
      const q = snSearchInput.value.trim();
      if (!q) return;
      triggerHanaFlow(`Search IT Knowledge Base for: "${q}"`);
    });
    snSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') snSearchBtn.click();
    });
  }

  if (launchHanaBtn) {
    launchHanaBtn.addEventListener('click', () => {
      triggerHanaFlow('hardware');
    });
  }
}

function triggerHanaFlow(type) {
  const companionSection = document.getElementById('companion');
  if (companionSection) companionSection.scrollIntoView({ behavior: 'smooth' });

  setTimeout(() => {
    if (window.__syntheticaAgent) {
      if (type === 'hardware') {
        window.__syntheticaAgent.startHanaWorkflow("My printer and workstation hardware are having errors, can you troubleshoot?");
      } else if (type === 'knowledge') {
        window.__syntheticaAgent.processInput("Search documentation for hardware peripherals and corporate network protocols.");
      } else if (type === 'ticket') {
        window.__syntheticaAgent.processInput("Check status of ServiceNow Incident INC0010003.");
      } else if (typeof type === 'string') {
        window.__syntheticaAgent.processInput(type);
      }
    }
  }, 600);
}

/* =========================================================
   6. AI SyntheticaPulse Agent (Voice, Live Web Search, Name Memory, HANA Flow)
   ========================================================= */
function initSyntheticaAgent() {
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const micBtn = document.getElementById('micBtn');
  const voiceToggle = document.getElementById('voiceToggle');
  const stopSpeakingBtn = document.getElementById('stopSpeakingBtn');
  const voiceSelect = document.getElementById('voiceSelect');
  const voiceTestBtn = document.getElementById('voiceTestBtn');
  const hudStatusBadge = document.getElementById('hudStatusBadge');
  const hudActivityText = document.getElementById('hudActivityText');
  const hudWaveBars = document.getElementById('hudWaveBars');
  const sessionNameDisplay = document.getElementById('sessionNameDisplay');
  const resetSessionBtn = document.getElementById('resetSessionBtn');

  if (!chatMessages || !chatInput || !chatSendBtn) return;

  // State Management
  let visitorName = sessionStorage.getItem('synthetica_visitor_name') || null;
  let hasAskedName = visitorName !== null;
  let voiceEnabled = true;
  let isListening = false;
  let recognition = null;
  let currentVoice = null;
  let hanaStep = 0; // 0: inactive, 1: verify_id, 2: diagnostics_sent, 3: completed
  let employeeId = null;

  function updateVisitorDisplay() {
    if (sessionNameDisplay) {
      sessionNameDisplay.textContent = visitorName ? visitorName : "Awaiting Name";
    }
  }
  updateVisitorDisplay();

  if (resetSessionBtn) {
    resetSessionBtn.addEventListener('click', () => {
      sessionStorage.removeItem('synthetica_visitor_name');
      visitorName = null;
      hasAskedName = false;
      hanaStep = 0;
      updateVisitorDisplay();
      chatMessages.innerHTML = '';
      sendAgentGreeting();
      playChime(350);
    });
  }

  // Activity HUD updater
  function setAgentState(state, text) {
    if (hudStatusBadge) {
      if (state === 'idle') {
        hudStatusBadge.innerHTML = '🟢 Idle';
        hudStatusBadge.style.color = '#34d399';
        if (hudWaveBars) hudWaveBars.classList.remove('active');
      } else if (state === 'listening') {
        hudStatusBadge.innerHTML = '🎙️ Listening...';
        hudStatusBadge.style.color = '#f43f5e';
        if (hudWaveBars) hudWaveBars.classList.add('active');
      } else if (state === 'thinking') {
        hudStatusBadge.innerHTML = '🧠 Reasoning...';
        hudStatusBadge.style.color = '#a855f7';
        if (hudWaveBars) hudWaveBars.classList.remove('active');
      } else if (state === 'searching') {
        hudStatusBadge.innerHTML = '🌐 Web Search...';
        hudStatusBadge.style.color = '#38bdf8';
        if (hudWaveBars) hudWaveBars.classList.add('active');
      } else if (state === 'speaking') {
        hudStatusBadge.innerHTML = '🔊 Speaking...';
        hudStatusBadge.style.color = '#38bdf8';
        if (hudWaveBars) hudWaveBars.classList.add('active');
      }
    }
    if (hudActivityText && text) {
      hudActivityText.textContent = text;
    }
  }

  // --- Speech Synthesis (TTS) ---
  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    if (voiceSelect) {
      voiceSelect.innerHTML = '';
      const englishVoices = voices.filter(v => v.lang.startsWith('en')) || voices;
      englishVoices.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.name;
        opt.textContent = `${v.name.replace('Microsoft', 'MS').replace('Google', 'G').substring(0, 20)}`;
        voiceSelect.appendChild(opt);
      });

      // Default preferred voice: Google US English or Microsoft Zira / David
      const preferred = englishVoices.find(v => /google us english/i.test(v.name))
                     || englishVoices.find(v => /david/i.test(v.name))
                     || englishVoices.find(v => /zira/i.test(v.name))
                     || englishVoices[0];
      if (preferred) {
        voiceSelect.value = preferred.name;
        currentVoice = preferred;
      }

      voiceSelect.onchange = () => {
        const found = voices.find(v => v.name === voiceSelect.value);
        if (found) {
          currentVoice = found;
          speakText(`Voice changed to ${found.name.substring(0, 15)}.`);
        }
      };
    }
  }

  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  function speakText(text) {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/https?:\/\/\S+/g, 'link').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (currentVoice) {
      utterance.voice = currentVoice;
    } else {
      const allVoices = window.speechSynthesis.getVoices();
      if (allVoices.length > 0) utterance.voice = allVoices[0];
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setAgentState('speaking', 'SyntheticaPulse is speaking...');
    };

    utterance.onend = () => {
      setAgentState('idle', 'Awaiting visitor interaction');
    };

    utterance.onerror = () => {
      setAgentState('idle', 'Awaiting visitor interaction');
    };

    window.__currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setAgentState('idle', 'Speech stopped');
    playChime(300);
  }

  if (stopSpeakingBtn) {
    stopSpeakingBtn.addEventListener('click', stopSpeaking);
  }

  if (voiceToggle) {
    voiceToggle.addEventListener('click', () => {
      voiceEnabled = !voiceEnabled;
      voiceToggle.classList.toggle('active', voiceEnabled);
      voiceToggle.innerHTML = voiceEnabled ? '🔊 Voice On' : '🔈 Voice Off';
      if (!voiceEnabled) stopSpeaking();
      else speakText("Audio narration enabled.");
    });
  }

  if (voiceTestBtn) {
    voiceTestBtn.addEventListener('click', () => {
      speakText("Hello! AI SyntheticaPulse speech synthesis is verified and operating normally.");
    });
  }

  // --- Speech Recognition (STT) ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      isListening = true;
      if (micBtn) micBtn.classList.add('listening');
      setAgentState('listening', 'Listening to microphone...');
      // Interrupt any running speech synthesis
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (chatInput) chatInput.value = transcript;
      handleUserInput(transcript);
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition status:', event.error);
      isListening = false;
      if (micBtn) micBtn.classList.remove('listening');
      setAgentState('idle', 'Microphone idle');
    };

    recognition.onend = () => {
      isListening = false;
      if (micBtn) micBtn.classList.remove('listening');
      setAgentState('idle', 'Awaiting visitor interaction');
    };

    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (isListening) {
          recognition.stop();
        } else {
          try {
            recognition.start();
          } catch (e) {
            console.error(e);
          }
        }
      });
    }
  } else {
    if (micBtn) {
      micBtn.title = "Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.";
      micBtn.addEventListener('click', () => {
        alert("Web Speech API is not supported in this browser. Please use Google Chrome or Microsoft Edge for microphone input.");
      });
    }
  }

  // --- Chat UI Helpers ---
  function addMessage(sender, htmlContent) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.innerHTML = `
      <div class="chat-bubble">
        ${htmlContent}
        <span class="msg-time">${timeStr}</span>
      </div>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (sender === 'synthetica') {
      speakText(htmlContent);
      playChime(520);
    } else {
      playChime(380);
    }
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.id = 'typingIndicator';
    typing.className = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  // --- Initial Greeting for every visitor ---
  function sendAgentGreeting() {
    if (visitorName) {
      addMessage('synthetica', `Welcome back, <strong>${visitorName}</strong>! I'm your AI SyntheticaPulse assistant. What would you like to explore today—AI agents, automation, emerging technologies, or responsible AI? You can also ask me for IT support.`);
    } else {
      addMessage('synthetica', "Hi! Welcome to AI SyntheticaPulse. I'm your AI assistant. What should I call you?");
    }
  }
  sendAgentGreeting();

  // --- Live Web Search Engine ---
  async function searchWeb(query) {
    setAgentState('searching', `Searching live web for "${query.substring(0, 20)}..."`);
    try {
      // 1. Try local server API route
      const resp = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (resp.ok) {
        const data = await resp.json();
        if (data.results && data.results.length > 0) {
          return data.results;
        }
      }
    } catch (e) {
      // Fallback to client-side direct search for GitHub Pages
    }

    // 2. Client-Side Fallback via Wikipedia Opensearch API (CORS friendly)
    try {
      const wikiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=3&namespace=0&format=json&origin=*`;
      const wikiRes = await fetch(wikiUrl);
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        const titles = wikiData[1] || [];
        const descriptions = wikiData[2] || [];
        const urls = wikiData[3] || [];
        const results = [];
        for (let i = 0; i < titles.length; i++) {
          if (titles[i] && urls[i]) {
            results.push({
              title: titles[i],
              snippet: descriptions[i] || `Reference documentation and insights regarding ${titles[i]} on Wikipedia.`,
              url: urls[i],
              source: 'Wikipedia'
            });
          }
        }
        if (results.length > 0) return results;
      }
    } catch (err) {
      console.warn("Client fallback search:", err);
    }

    return [];
  }

  // --- Core Conversational Logic & State Machine ---
  async function handleUserInput(rawText) {
    const text = rawText.trim();
    if (!text) return;

    addMessage('user', text);
    if (chatInput) chatInput.value = '';
    showTypingIndicator();
    setAgentState('thinking', 'SyntheticaPulse reasoning...');

    // 1. Visitor Name Extraction Stage
    if (!hasAskedName && !visitorName) {
      setTimeout(() => {
        removeTypingIndicator();
        let extracted = null;
        const lower = text.toLowerCase();

        // Check if user declines to share
        if (lower.includes('no') || lower.includes("don't") || lower.includes('skip') || lower.includes('prefer not') || lower === 'just help' || lower === 'none') {
          hasAskedName = true;
          visitorName = null;
          updateVisitorDisplay();
          addMessage('synthetica', "No problem at all! We can dive right in. What would you like to explore today—AI agents, automation, emerging technologies, or responsible AI?");
          setAgentState('idle', 'Awaiting interaction');
          return;
        }

        const nameMatch = text.match(/(?:my name is|call me|i am|i'm|this is)\s+([A-Za-z]+)/i);
        if (nameMatch && nameMatch[1]) {
          extracted = nameMatch[1];
        } else {
          // If 1 or 2 words, take the first word as the name
          const words = text.split(/\s+/);
          if (words.length <= 3 && /^[A-Za-z]+$/.test(words[0])) {
            extracted = words[0];
          }
        }

        if (extracted) {
          visitorName = extracted.charAt(0).toUpperCase() + extracted.slice(1);
          sessionStorage.setItem('synthetica_visitor_name', visitorName);
          hasAskedName = true;
          updateVisitorDisplay();
          addMessage('synthetica', `Nice to meet you, <strong>${visitorName}</strong>! What would you like to explore today—AI agents, automation, emerging technologies, or responsible AI? You can also ask me to search the web for live developments or run IT support diagnostics.`);
        } else {
          hasAskedName = true;
          visitorName = null;
          updateVisitorDisplay();
          addMessage('synthetica', `Welcome to AI SyntheticaPulse! How can I assist you today? You can explore autonomous agent delegation, live web search, or ServiceNow IT support.`);
        }
        setAgentState('idle', 'Awaiting interaction');
      }, 900);
      return;
    }

    const lower = text.toLowerCase();
    const displayName = visitorName ? `${visitorName}, ` : '';

    // 2. ServiceNow HANA IT Support Troubleshooting Flow
    if (hanaStep === 1) {
      // User entered Employee ID / Corporate Email
      setTimeout(() => {
        removeTypingIndicator();
        employeeId = text;
        hanaStep = 2;
        addMessage('synthetica', `Thank you. Credential tracking verified for <strong>${text}</strong>.<br><br>
          Since your local workstation hardware or printer is malfunctioning, let's run through our standard <b>5-step tier-1 diagnostic framework</b>:<br><br>
          <b>1. Connection Check:</b> Secure loose data cables and verify the internal bay is clear of paper jams.<br>
          <b>2. 30s Power Cycle:</b> Power off the hardware, disconnect from the outlet for 30 seconds, reconnect, and power on.<br>
          <b>3. Port Reseat:</b> Disconnect and plug the data line into an alternative workstation port.<br>
          <b>4. Network Verification:</b> For wireless hardware, verify the status light is steady and linked to the corporate network.<br>
          <b>5. Queue Clearance:</b> Open settings, flush stuck print queues, and confirm 'Use Printer Offline' is unchecked.<br><br>
          <b>Did these troubleshooting steps resolve your issue? Please reply with 'Yes' or 'No'.</b>`);
        setAgentState('idle', 'Awaiting troubleshooting confirmation');
      }, 1000);
      return;
    }

    if (hanaStep === 2) {
      // User replied to troubleshooting confirmation
      setTimeout(() => {
        removeTypingIndicator();
        hanaStep = 0; // reset
        if (lower.includes('yes') || lower.includes('work') || lower.includes('fixed') || lower.includes('solved')) {
          addMessage('synthetica', `Excellent news, ${displayName}since the steps resolved the issue, I am programmatically logging and closing this L1 case in ServiceNow to maintain accurate metrics...`);
          setTimeout(() => {
            addMessage('synthetica', `<div style="border-left: 3px solid #10b981; background: rgba(16, 185, 129, 0.1); padding: 12px; border-radius: 8px;">
              ⚡ <b>[REST Table API Outbound &rarr; Successful]</b><br>
              Incident entry generated and closed automatically in ServiceNow database.<br><br>
              <b>Ticket Reference Number:</b> <span class="servicenow-ticket-pill">INC0010003</span><br>
              <b>System Assignment Status:</b> Resolved (State 6)<br>
              <b>Handled By:</b> HANA IT Support Agent Core
            </div><br>Thank you for using the IT Service Desk. Your support session is complete! 😊`);
            setAgentState('idle', 'Awaiting interaction');
          }, 1200);
        } else {
          addMessage('synthetica', `I am sorry to hear those initial diagnostic steps did not clear the fault. I am immediately escalating your ticket to our senior engineering infrastructure queue...`);
          setTimeout(() => {
            addMessage('synthetica', `<div style="border-left: 3px solid #f43f5e; background: rgba(244, 63, 94, 0.1); padding: 12px; border-radius: 8px;">
              🚨 <b>[REST Table API Outbound &rarr; Escalation Ticket Launched]</b><br>
              Unresolved tier-1 case successfully routed to infrastructure routing rules.<br><br>
              <b>Ticket Reference Number:</b> <span class="servicenow-ticket-pill">INC0010234</span><br>
              <b>System Queue Status:</b> New / Assigned (Tier-2 Support)<br>
              <b>Estimated Turnaround:</b> 24 to 48 hours
            </div><br>Your escalation tracker is active. You will receive updates via corporate email.`);
            setAgentState('idle', 'Awaiting interaction');
          }, 1200);
        }
      }, 1000);
      return;
    }

    // Trigger HANA Flow if requested
    if (lower.includes('printer') || lower.includes('hardware error') || lower.includes('toner') || lower.includes('it support') || lower.includes('ticket')) {
      setTimeout(() => {
        removeTypingIndicator();
        hanaStep = 1;
        addMessage('synthetica', `I can certainly help you clear that hardware issue, ${displayName}To maintain strict data security and access compliance, could you please provide your <b>corporate email</b> or <b>Employee ID</b>?`);
        setAgentState('idle', 'Awaiting Employee ID');
      }, 800);
      return;
    }

    // 3. Web Search Requirement Check
    const needsSearch = lower.includes('search web') || lower.includes('latest') || lower.includes('news') ||
                        lower.includes('research') || lower.includes('who is') || lower.includes('what is the latest') ||
                        lower.includes('2026') || lower.includes('2025') || lower.includes('google') ||
                        lower.includes('claude') || lower.includes('gemini') || lower.includes('hermes') ||
                        lower.includes('violetta bonenkamp') || lower.includes('mean ceo');

    if (needsSearch) {
      const searchResults = await searchWeb(text.replace(/search web for|search web|search/gi, '').trim() || text);
      removeTypingIndicator();

      if (searchResults && searchResults.length > 0) {
        let responseHtml = `<div class="web-search-badge">🌐 Live Web Search Results</div><br>`;
        responseHtml += `Here is the current information retrieved regarding your inquiry, ${displayName}<br><br>`;

        searchResults.forEach((res, i) => {
          // Untrusted data sanitization: escape html and present clean citation
          const cleanTitle = escapeHtml(res.title);
          const cleanSnippet = escapeHtml(res.snippet);
          const cleanUrl = encodeURI(res.url);

          responseHtml += `<div class="citation-source-card">
            <strong>${i + 1}. ${cleanTitle}</strong> (${escapeHtml(res.source || 'Web Source')})<br>
            <p style="margin: 0.3rem 0; color: #cbd5e1;">${cleanSnippet}</p>
            <a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="citation-link">🔗 [Source: ${cleanTitle}]</a>
          </div>`;
        });

        responseHtml += `<br>Feel free to ask any follow-up questions regarding these findings!`;
        addMessage('synthetica', responseHtml);
        setAgentState('idle', 'Awaiting follow-up');
        return;
      }
    }

    // 4. Article & AI Knowledge Base Answers
    setTimeout(() => {
      removeTypingIndicator();
      let reply = '';

      if (lower.includes('three phase') || lower.includes('phase') || lower.includes('single prompt') || lower.includes('evolution')) {
        reply = `${displayName}user interaction with AI has evolved across three distinct phases:<br><br>
          <b>1. Query-Response (2022–2024):</b> Users treated AI as a search engine or text generator, prompting it to perform one task at a time.<br>
          <b>2. Context-Aware Workflows (2024–2025):</b> Systems integrated long-term memory, file retrieval (RAG), and specialized tools.<br>
          <b>3. Agentic Delegation (2026 & Beyond):</b> Multi-agent frameworks receive high-level objectives and orchestrate tool chains, code execution, and external APIs subject to permissions.`;
      } else if (lower.includes('cascading autonomy') || lower.includes('risk') || lower.includes('hijack') || lower.includes('injection') || lower.includes('cognitive agency')) {
        reply = `Delegating real-world authority to autonomous systems introduces significant risks:<br><br>
          ⚠️ <b>Cascading Autonomy:</b> Reasoning errors trigger unintended actions across connected systems.<br>
          🛡️ <b>Prompt Injection & Hijacking:</b> Untrusted web pages or emails inject malicious instructions.<br>
          🧠 <b>Loss of Cognitive Agency:</b> Over-reliance weakens independent judgment and reinforces confirmation bias.<br><br>
          Our Governance Matrix mandates strict API permission boundaries, confirmation modals for state mutations, and transparent reasoning audits.`;
      } else if (lower.includes('relational') || lower.includes('attachment') || lower.includes('friend') || lower.includes('companion')) {
        reply = `Companion-driven architectures and social AI personas are reshaping human attachment. While persistent memory and emotional tuning enable supportive conversational rehearsal, we must be vigilant regarding <b>Asymmetric Attachment</b>—AI companions do not have human feelings and should complement, not replace, meaningful human relationships.`;
      } else if (lower.includes('mindset') || lower.includes('adoption')) {
        reply = `The adoption mindset has shifted from <i>"What can I ask this model?"</i> to <b>"What responsibilities can I delegate to this system?"</b>`;
      } else if (lower.includes('who are you') || lower.includes('what are you')) {
        reply = `I am <b>AI SyntheticaPulse</b>, your autonomous agentic ecosystem assistant and ServiceNow IT support portal. I combine real-time voice, live web retrieval, and enterprise hardware diagnostic tools.`;
      } else {
        reply = `I appreciate your perspective, ${displayName}In AI SyntheticaPulse, we balance autonomous agent delegation with strict safety controls, persistent contextual adaptation, and enterprise ServiceNow IT diagnostics. Would you like to explore agentic multi-tool execution, live web search, or hardware troubleshooting?`;
      }

      addMessage('synthetica', reply);
      setAgentState('idle', 'Awaiting interaction');
    }, 1000);
  }

  function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  // Event Listeners
  chatSendBtn.addEventListener('click', () => handleUserInput(chatInput.value));
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserInput(chatInput.value);
  });

  // Suggestion chips
  document.querySelectorAll('.chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) handleUserInput(prompt);
    });
  });

  // Hero Voice trigger button
  const heroVoiceTriggerBtn = document.getElementById('heroVoiceTriggerBtn');
  if (heroVoiceTriggerBtn) {
    heroVoiceTriggerBtn.addEventListener('click', () => {
      const comp = document.getElementById('companion');
      if (comp) comp.scrollIntoView({ behavior: 'smooth' });
      if (micBtn && recognition) {
        setTimeout(() => micBtn.click(), 600);
      }
    });
  }

  // Expose for external trigger
  window.__syntheticaAgent = {
    processInput: handleUserInput,
    startHanaWorkflow: (initialMsg) => {
      handleUserInput(initialMsg);
    }
  };
}

/* =========================================================
   7. Generative Web Audio Crystal Synthesizer
   ========================================================= */
let audioCtx = null;
let isAudioActive = false;

function initSoundAmbience() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isAudioActive = !isAudioActive;
    soundBtn.classList.toggle('active', isAudioActive);
    soundBtn.innerHTML = isAudioActive ? '🔔' : '🔇';

    if (isAudioActive) {
      playChime(440);
      setTimeout(() => playChime(554.37), 200);
      setTimeout(() => playChime(659.25), 400);
    }
  });
}

function playChime(freq = 440) {
  if (!audioCtx || !isAudioActive) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);
  } catch (e) {
    // Audio context safely ignored if blocked
  }
}

/* =========================================================
   8. 3D Tilt Cards Effect
   ========================================================= */
function initTiltCards() {
  const cards = document.querySelectorAll('.art-card, .pillar-card, .risk-card, .sn-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}
