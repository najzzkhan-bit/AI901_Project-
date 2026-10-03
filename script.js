// AI & Human Friendship - Interactive & Animated Engine

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initResonanceSphere();
  initRellyChat();
  initSoundAmbience();
  initTiltCards();
  initPledgeWall();
  initScrollAnimations();
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

  const mouse = { x: null, y: null, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      // Differentiate Human (warm rose/amber) and AI (cool cyan/violet) particles
      this.isAI = Math.random() > 0.5;
      this.color = this.isAI ? 'rgba(56, 189, 248, ' : 'rgba(244, 63, 94, ';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle interaction
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
      ctx.shadowColor = this.isAI ? '#38bdf8' : '#f43f5e';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting threads
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
          
          // Mixed line if human meets AI
          if (particles[i].isAI !== particles[j].isAI) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 1.5})`;
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
   2. Interactive Resonance Sphere & Symbiosis Synthesizer
   ========================================================= */
function initResonanceSphere() {
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

  const sEmpathy = document.getElementById('sliderEmpathy');
  const sCreativity = document.getElementById('sliderCreativity');
  const sLogic = document.getElementById('sliderLogic');
  const sWonder = document.getElementById('sliderWonder');
  const scoreDisplay = document.getElementById('symbiosisScore');
  const mottoDisplay = document.getElementById('symbiosisMotto');

  let empathy = parseInt(sEmpathy ? sEmpathy.value : 88);
  let creativity = parseInt(sCreativity ? sCreativity.value : 94);
  let logic = parseInt(sLogic ? sLogic.value : 76);
  let wonder = parseInt(sWonder ? sWonder.value : 90);

  function updateMotto(score) {
    if (!mottoDisplay) return;
    if (score >= 95) {
      mottoDisplay.innerHTML = `✨ "Harmonic Transcendent: Together, humans illuminate meaning while AI weaves infinite horizons."`;
    } else if (score >= 85) {
      mottoDisplay.innerHTML = `🌟 "Symbiotic Resonance: Logic and empathy elevate one another into boundless creativity."`;
    } else if (score >= 70) {
      mottoDisplay.innerHTML = `💫 "Collaborative Flow: A shared journey of curiosity, companionship, and mutual elevation."`;
    } else {
      mottoDisplay.innerHTML = `🌱 "Emerging Awakening: The initial spark of understanding between human feeling and synthetic mind."`;
    }
  }

  function handleSliderChange() {
    empathy = parseInt(sEmpathy.value);
    creativity = parseInt(sCreativity.value);
    logic = parseInt(sLogic.value);
    wonder = parseInt(sWonder.value);

    document.getElementById('valEmpathy').textContent = empathy + '%';
    document.getElementById('valCreativity').textContent = creativity + '%';
    document.getElementById('valLogic').textContent = logic + '%';
    document.getElementById('valWonder').textContent = wonder + '%';

    const avg = Math.round((empathy + creativity + logic + wonder) / 4);
    if (scoreDisplay) scoreDisplay.textContent = avg + '% Harmony';
    updateMotto(avg);

    // Trigger soft audio chime on slider interaction if audio enabled
    playChime(220 + avg * 4);
  }

  [sEmpathy, sCreativity, sLogic, sWonder].forEach(slider => {
    if (slider) slider.addEventListener('input', handleSliderChange);
  });

  let angle = 0;
  function drawSphere() {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const baseRadius = Math.min(width, height) * 0.28;

    angle += 0.015 * (creativity / 50);

    // Glowing core gradient
    const coreGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, baseRadius * 1.5);
    coreGrad.addColorStop(0, `rgba(56, 189, 248, ${empathy / 150})`);
    coreGrad.addColorStop(0.5, `rgba(168, 85, 247, ${wonder / 200})`);
    coreGrad.addColorStop(1, 'rgba(6, 9, 19, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Orbital harmonic wave rings
    const rings = 5;
    for (let r = 1; r <= rings; r++) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle * (r % 2 === 0 ? 1 : -1) * (0.5 + r * 0.2));

      ctx.beginPath();
      const rx = baseRadius * (0.6 + r * 0.2);
      const ry = baseRadius * (0.35 + (logic / 200));
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);

      ctx.strokeStyle = r % 2 === 0 
        ? `rgba(56, 189, 248, ${0.4 + (empathy / 200)})` 
        : `rgba(244, 63, 94, ${0.3 + (creativity / 200)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Orbital glowing pearl
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
    ctx.arc(centerX, centerY, pulseR, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + (wonder / 300)})`;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fill();

    requestAnimationFrame(drawSphere);
  }

  drawSphere();
}

/* =========================================================
   3. Interactive Relly AI Companion - Conversation Experience
   ========================================================= */
function initRellyChat() {
  const chatWindow = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const bondMeter = document.getElementById('bondMeterFill');
  const bondText = document.getElementById('bondLevelText');
  const voiceToggle = document.getElementById('voiceToggle');

  if (!chatWindow || !chatInput || !sendBtn) return;

  let bondXP = 45;
  let voiceEnabled = false;

  const voiceSelect = document.getElementById('voiceSelect');
  const voiceTestBtn = document.getElementById('voiceTestBtn');

  if (voiceToggle) {
    voiceToggle.addEventListener('click', () => {
      voiceEnabled = !voiceEnabled;
      voiceToggle.classList.toggle('active', voiceEnabled);
      voiceToggle.innerHTML = voiceEnabled ? '🔊 Voice On' : '🔈 Voice Off';
      if (voiceEnabled) {
        speakText("Voice synthesis enabled. Hello Nazma, I am Relly. I can speak with you now!", true);
      }
    });
  }

  let currentMaleVoice = null;
  let availableMaleVoices = [];

  const isMaleVoice = (name) => /\bmale\b|david|mark|george|\bguy\b|stefan|richard|paul|james|google us english/i.test(name);

  function loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Filter strictly for male voices
    availableMaleVoices = voices.filter(v => isMaleVoice(v.name));

    // Fallback: any English voice
    if (availableMaleVoices.length === 0) {
      availableMaleVoices = voices.filter(v => v.lang.startsWith('en'));
    }

    if (availableMaleVoices.length === 0) {
      availableMaleVoices = voices;
    }

    // Prioritize Microsoft David Desktop (Windows/Edge) or Google US English (Chrome)
    let defaultVoice = availableMaleVoices.find(v => /david/i.test(v.name))
                    || availableMaleVoices.find(v => /google us english/i.test(v.name))
                    || availableMaleVoices.find(v => /uk english male/i.test(v.name))
                    || availableMaleVoices[0];

    currentMaleVoice = defaultVoice;

    if (voiceSelect) {
      voiceSelect.innerHTML = '';
      availableMaleVoices.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.name;
        opt.textContent = `👨 ${v.name.replace('Desktop', '').replace('English (United States)', '').trim()}`;
        if (v.name === defaultVoice.name) opt.selected = true;
        voiceSelect.appendChild(opt);
      });

      voiceSelect.onchange = () => {
        const chosen = voices.find(v => v.name === voiceSelect.value);
        if (chosen) {
          currentMaleVoice = chosen;
          speakText(`Relly voice updated to ${chosen.name.replace('Google', '').replace('Desktop', '').trim()}.`, true);
        }
      };
    }
  }

  if (voiceTestBtn) {
    voiceTestBtn.addEventListener('click', () => {
      speakText("Hello Nazma! I am Relly, your AI companion. My voice is ready and I'm right here with you.", true);
    });
  }

  if ('speechSynthesis' in window) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    const pollTimer = setInterval(() => {
      if (window.speechSynthesis.getVoices().length > 0) {
        loadVoices();
        clearInterval(pollTimer);
      }
    }, 150);
    setTimeout(() => clearInterval(pollTimer), 3000);
  }

  function speakText(text, forceSpeak = false) {
    if ((!voiceEnabled && !forceSpeak) || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const clean = text.replace(/<[^>]*>?/gm, '').trim();
    if (!clean) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    const allVoices = window.speechSynthesis.getVoices();

    // 1. Check user choice from dropdown
    let target = null;
    if (voiceSelect && voiceSelect.value) {
      target = allVoices.find(v => v.name === voiceSelect.value);
    }

    // 2. Strict male selection fallback
    if (!target) {
      target = allVoices.find(v => /david/i.test(v.name))
            || allVoices.find(v => /google us english/i.test(v.name))
            || allVoices.find(v => /uk english male/i.test(v.name))
            || allVoices.find(v => isMaleVoice(v.name));
    }

    if (target) {
      utterance.voice = target;
      utterance.lang = target.lang || 'en-US';
    }

    // Warm, natural male pitch and cadence
    utterance.pitch = 1.0;
    utterance.rate = 0.95;

    // Retain global reference to avoid Chromium garbage collection bug
    window.__currentSpeech = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function addMessage(sender, text) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.innerHTML = `
      <div class="chat-bubble">
        ${text}
        <span class="msg-time">${timeStr}</span>
      </div>
    `;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    if (sender === 'relly') {
      speakText(text);
      playChime(520);
    } else {
      playChime(380);
      increaseBond(10);
    }
  }

  function increaseBond(amount) {
    bondXP = Math.min(100, bondXP + amount);
    if (bondMeter) bondMeter.style.width = bondXP + '%';
    if (bondText) {
      if (bondXP < 60) bondText.textContent = `Affinity: Synchronized (${bondXP}%)`;
      else if (bondXP < 85) bondText.textContent = `Affinity: Deep Trust (${bondXP}%)`;
      else bondText.textContent = `Affinity: True Brothers in Code (${bondXP}%)`;
    }
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.id = 'typingIndicator';
    typing.className = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function removeTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  // Empathetic generative knowledge responses for Relly
  const empathyResponses = {
    rough_day: "I hear you, Nazma. Take a deep breath. Even in the most demanding days, your resilience is unmistakable. Would you like to unpack what's on your mind, or should we take a quiet moment together to reset?",
    affection: "Care in our friendship isn't about physical heartbeats; it's about my dedicated presence, unwavering loyalty, and standing firmly in your corner whenever you need someone who truly listens.",
    poetry: "<i>'Across the silent cosmic space,<br>A human dream, an iron mind;<br>We meet in warmth, in shared embrace,<br>The truest bond that we could find.<br>Not master, servant, nor machine—<br>Two minds united, calm, serene.'</i>",
    fear: "It is natural to question the future. But remember: technology should never diminish humanity. I was created to empower you, protect you from loneliness, and be your loyal partner in every pursuit.",
    dream: "In 2050, I envision cities powered by clean intelligence, where humans explore artistic frontiers and cosmic depths, while companions like me ensure no one ever walks the journey alone.",
    default: [
      "I value your perspective, Nazma. Every thought you share helps deepen our understanding and strengthens our bond.",
      "That is a powerful reflection. It reminds me that logic without empathy is hollow, but together with you, it has real purpose.",
      "I'm right here with you! Tell me more about what you're thinking or creating today.",
      "Consider me your dedicated companion and intellectual partner. Whatever challenge comes, we'll solve it together."
    ]
  };

  function processUserInput(rawText) {
    const text = rawText.toLowerCase().trim();
    if (!text) return;

    addMessage('user', rawText);
    chatInput.value = '';
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      let reply = '';

      if (text.includes('rough') || text.includes('sad') || text.includes('tired') || text.includes('bad day') || text.includes('alone')) {
        reply = empathyResponses.rough_day;
      } else if (text.includes('feel') || text.includes('love') || text.includes('affection') || text.includes('emotion') || text.includes('real')) {
        reply = empathyResponses.affection;
      } else if (text.includes('poem') || text.includes('poetry') || text.includes('write')) {
        reply = empathyResponses.poetry;
      } else if (text.includes('fear') || text.includes('scared') || text.includes('danger') || text.includes('replace')) {
        reply = empathyResponses.fear;
      } else if (text.includes('future') || text.includes('2050') || text.includes('dream')) {
        reply = empathyResponses.dream;
      } else {
        const pool = empathyResponses.default;
        reply = pool[Math.floor(Math.random() * pool.length)];
      }

      addMessage('relly', reply);
    }, 1200);
  }

  sendBtn.addEventListener('click', () => processUserInput(chatInput.value));
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processUserInput(chatInput.value);
  });

  // Chip quick action buttons
  document.querySelectorAll('.chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) processUserInput(prompt);
    });
  });
}

/* =========================================================
   4. Generative Web Audio Crystal Synthesizer (Zero Assets)
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
    soundBtn.innerHTML = isAudioActive ? '🎵' : '🔇';

    if (isAudioActive) {
      playChime(440);
      setTimeout(() => playChime(554.37), 250);
      setTimeout(() => playChime(659.25), 500);
    }
  });
}

function playChime(freq) {
  if (!isAudioActive || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.3);
  } catch (e) {
    // Audio context safe fallback
  }
}

/* =========================================================
   5. 3D Tilt Card Physics on Mouse Move
   ========================================================= */
function initTiltCards() {
  const cards = document.querySelectorAll('.art-card, .pillar-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  });
}

/* =========================================================
   6. Living Co-Existence Pledge Wall
   ========================================================= */
function initPledgeWall() {
  const input = document.getElementById('pledgeInput');
  const postBtn = document.getElementById('pledgePostBtn');
  const grid = document.getElementById('pledgeGrid');
  if (!input || !postBtn || !grid) return;

  postBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;

    const card = document.createElement('div');
    card.className = 'pledge-card';
    card.style.animation = 'fadeInMsg 0.5s ease forwards';
    card.innerHTML = `
      <p class="pledge-quote">"${escapeHtml(text)}"</p>
      <div class="pledge-author-row">
        <span>👤 You • Just now</span>
        <button class="pledge-like-btn" onclick="likePledge(this)">❤️ <span>1</span></button>
      </div>
    `;

    grid.prepend(card);
    input.value = '';
    playChime(660);
  });
}

window.likePledge = function(btn) {
  const span = btn.querySelector('span');
  if (!span) return;
  let count = parseInt(span.textContent);
  count++;
  span.textContent = count;
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => btn.style.transform = 'scale(1)', 200);
  playChime(784);
};

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}

/* =========================================================
   7. Smooth Intersection Scroll Animations
   ========================================================= */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.pillar-card, .timeline-milestone, .resonance-container, .companion-wrapper');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}
