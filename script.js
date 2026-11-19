// ===================================================
// LOVELY ROMANTIC WEB APP - INTERACTIVE SCRIPT
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Elements ---
  const lockScreen = document.getElementById('lockScreen');
  const letterScreen = document.getElementById('letterScreen');
  const portalScreen = document.getElementById('portalScreen');
  const mainScreen = document.getElementById('mainScreen');

  const lockForm = document.getElementById('lockForm');
  const passwordInput = document.getElementById('passwordInput');
  const errorMsg = document.getElementById('errorMsg');

  const typedTextEl = document.getElementById('typedText');
  const nextBtnContainer = document.getElementById('nextBtnContainer');
  const nextBtn = document.getElementById('nextBtn');
  const enterPortalBtn = document.getElementById('enterPortalBtn');
  const celebrateBtn = document.getElementById('celebrateBtn');

  // Music Player Elements
  const audio = document.getElementById('romanticAudio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const svgPlay = document.getElementById('svgPlay');
  const svgPause = document.getElementById('svgPause');
  const equalizer = document.getElementById('equalizer');
  const albumArtWrap = document.getElementById('albumArtWrap');
  const progressFill = document.getElementById('progressFill');
  const progressTrack = document.getElementById('progressTrack');
  const timeDisplay = document.getElementById('timeDisplay');
  const nextTrackBtn = document.getElementById('nextTrackBtn');

  // Counter Elements
  const daysEl = document.getElementById('counterDays');
  const hoursEl = document.getElementById('counterHours');
  const minutesEl = document.getElementById('counterMinutes');
  const secondsEl = document.getElementById('counterSeconds');

  // Hearts Container
  const heartsContainer = document.getElementById('heartsContainer');

  // Song starting offset in the video (seconds)
  const SONG_START_OFFSET = 14.0;
  let isAudioPlaying = false;

  // ================= 1. FLOATING HEARTS GENERATOR =================
  const heartSymbols = ['💖', '💕', '💗', '💓', '✨', '🌸', '❤️'];

  function createFloatingHeart() {
    if (!heartsContainer) return;
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    const size = Math.floor(Math.random() * 16) + 14; // 14px to 30px
    const left = Math.random() * 100; // 0% to 100%
    const duration = (Math.random() * 4 + 4).toFixed(2); // 4s to 8s
    const delay = (Math.random() * 2).toFixed(2); // 0s to 2s

    heart.style.left = `${left}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, (parseFloat(duration) + parseFloat(delay)) * 1000);
  }

  // Create initial pool of hearts & interval
  for (let i = 0; i < 8; i++) {
    createFloatingHeart();
  }
  setInterval(createFloatingHeart, 600);


  // ================= 2. PASSWORD UNLOCK LOGIC =================
  const CORRECT_PASSWORD = 'love';

  function handleUnlock() {
    const enteredValue = passwordInput.value.trim().toLowerCase();
    
    if (enteredValue === CORRECT_PASSWORD) {
      errorMsg.style.display = 'none';

      // Confetti burst
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff758c', '#ff7eb3', '#ffccd8', '#ffffff']
        });
      }

      // Start Audio
      startMusic();

      // Transition to Letter Screen
      lockScreen.classList.remove('active');
      setTimeout(() => {
        letterScreen.classList.add('active');
        startTypewriter();
      }, 350);

    } else {
      errorMsg.style.display = 'block';
      passwordInput.classList.add('shake');
      setTimeout(() => {
        passwordInput.classList.remove('shake');
      }, 400);
    }
  }

  lockForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUnlock();
  });


  // ================= 3. TYPEWRITER EFFECT =================
  const messageLines = [
    "انا عملت الهديه دي علشان عايز اقولك اني بحبك",
    "انا بحب كلامنا سوا هزرنا وكل حاجه بينا بحب",
    "كلامك ليا بحب كل حاجه فيكي مهما ما اوصفلك",
    "انا بحبك قد ايه مش هخلص بس الي اعرفه انك",
    "غاليه عندي وانتي بحبك وعايزين نملوه صورنا بقا",
    "ده لينا احنا وبس بحبككك وربنا يخليكي ليا ❤️",
    "",
    "من ساعة ما سافرتي وانتي وحشاني مووووووووووووووووت",
    "وكان نفسي اني اشوفك بس انتي دماغك ناشفه بقا هنعمل ايه 😂",
    "مين حبيب حمودي ؟ 🥰",
    "بحبك موت يا يويو وبعشق امككككككك ❤️"
  ];

  const fullText = messageLines.join('\n');
  let charIndex = 0;
  let typeSpeed = 36; // milliseconds per character

  function startTypewriter() {
    typedTextEl.textContent = '';
    charIndex = 0;

    function typeChar() {
      if (charIndex < fullText.length) {
        typedTextEl.textContent += fullText.charAt(charIndex);
        charIndex++;
        
        // Auto-scroll gently if text becomes tall
        const typeCursor = document.getElementById('typeCursor');
        if (typeCursor && charIndex % 15 === 0) {
          typeCursor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        setTimeout(typeChar, typeSpeed);
      } else {
        // Typing finished -> show Next button
        if (nextBtnContainer) {
          nextBtnContainer.classList.add('show');
          nextBtnContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    setTimeout(typeChar, 300);
  }


  // ================= 4. NAVIGATION TRANSITIONS =================
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      letterScreen.classList.remove('active');
      setTimeout(() => {
        portalScreen.classList.add('active');
      }, 300);
    });
  }

  if (enterPortalBtn) {
    enterPortalBtn.addEventListener('click', () => {
      portalScreen.classList.remove('active');
      setTimeout(() => {
        mainScreen.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Little celebratory burst
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 60,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#ff758c', '#ff7eb3', '#ffe4eb']
          });
        }
      }, 300);
    });
  }

  // Celebrate Button (Memories 🩵)
  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      if (typeof confetti === 'function') {
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }
          confetti({
            particleCount: 30,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff758c', '#70d6ff', '#ff9770', '#ffd670']
          });
          confetti({
            particleCount: 30,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff758c', '#70d6ff', '#ff9770', '#ffd670']
          });
        }, 250);
      }
    });
  }


  // ================= 5. LIVE RELATIONSHIP COUNTER =================
  // Date: 21-07-2025 00:00:00
  const startDate = new Date(2025, 6, 21, 0, 0, 0); // Note: Month 6 is July (0-indexed)

  function updateCounter() {
    const now = new Date();
    // Total elapsed time in milliseconds
    let diff = now - startDate;

    if (diff < 0) {
      // In case user system clock is before start date
      diff = Math.abs(diff);
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCounter();
  setInterval(updateCounter, 1000);


  // ================= 6. AUDIO PLAYER LOGIC =================
  function setPlayerPlayingState(playing) {
    isAudioPlaying = playing;
    if (playing) {
      if (svgPlay) svgPlay.style.display = 'none';
      if (svgPause) svgPause.style.display = 'block';
      equalizer.classList.add('playing');
      albumArtWrap.classList.add('spinning');
    } else {
      if (svgPlay) svgPlay.style.display = 'block';
      if (svgPause) svgPause.style.display = 'none';
      equalizer.classList.remove('playing');
      albumArtWrap.classList.remove('spinning');
    }
  }

  function startMusic() {
    if (!audio) return;
    
    // Jump to the music part
    if (audio.currentTime < SONG_START_OFFSET) {
      audio.currentTime = SONG_START_OFFSET;
    }

    audio.play().then(() => {
      setPlayerPlayingState(true);
    }).catch(err => {
      console.warn("Autoplay notice: User interaction is required by browser policy.", err);
      setPlayerPlayingState(false);
    });
  }

  // Play / Pause toggle
  if (playPauseBtn && audio) {
    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        if (audio.currentTime < SONG_START_OFFSET) {
          audio.currentTime = SONG_START_OFFSET;
        }
        audio.play().then(() => {
          setPlayerPlayingState(true);
        });
      } else {
        audio.pause();
        setPlayerPlayingState(false);
      }
    });
  }

  // Next track button restarts track from the song beginning
  if (nextTrackBtn && audio) {
    nextTrackBtn.addEventListener('click', () => {
      audio.currentTime = SONG_START_OFFSET;
      audio.play().then(() => {
        setPlayerPlayingState(true);
      });
    });
  }

  // Time & Progress update
  if (audio) {
    audio.addEventListener('timeupdate', () => {
      const current = Math.max(0, audio.currentTime - SONG_START_OFFSET);
      const total = Math.max(1, (audio.duration || 62) - SONG_START_OFFSET);

      const percent = Math.min(100, Math.max(0, (current / total) * 100));
      if (progressFill) {
        progressFill.style.width = `${percent}%`;
      }

      // Format time M:SS
      const mins = Math.floor(current / 60);
      const secs = Math.floor(current % 60);
      if (timeDisplay) {
        timeDisplay.textContent = `${mins}:${String(secs).padStart(2, '0')}`;
      }
    });

    // Loop handler
    audio.addEventListener('ended', () => {
      audio.currentTime = SONG_START_OFFSET;
      audio.play();
    });
  }

  // Progress bar click to seek
  if (progressTrack && audio) {
    progressTrack.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const ratio = Math.max(0, Math.min(1, clickX / width));
      
      const total = Math.max(1, (audio.duration || 62) - SONG_START_OFFSET);
      audio.currentTime = SONG_START_OFFSET + (ratio * total);
    });
  }

});
