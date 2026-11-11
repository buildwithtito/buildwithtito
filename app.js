document.addEventListener('DOMContentLoaded', () => {
        const bgVideo = document.querySelector('.cinematic-video');
        if (bgVideo) {
            // 0.5 sets the speed to 50% (half speed). 
            // Adjust between 0.1 and 0.9 to fine-tune the pacing.
            bgVideo.playbackRate = 0.5; 
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('voiceAudio');
    const playBtn = document.getElementById('voicePlayBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const waveformBars = document.getElementById('waveformBars');
    const timeDisplay = document.getElementById('timeDisplay');

    // 1. Generate Waveform Bars dynamically
    const BAR_COUNT = 45;
    for (let i = 0; i < BAR_COUNT; i++) {
        const bar = document.createElement('div');
        bar.classList.add('wave-bar');
        
        // Randomize static heights for a natural soundwave look when idle
        const baseHeight = Math.floor(Math.random() * 60) + 15;
        bar.style.height = `${baseHeight}%`;
        
        // Stagger animation delays for natural wave motion when playing
        bar.style.animationDelay = `${(i % 7) * 0.15}s`;
        waveformBars.appendChild(bar);
    }

    // 2. Play/Pause Toggle
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            waveformBars.classList.add('playing');
        } else {
            audio.pause();
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            waveformBars.classList.remove('playing');
        }
    });

    // 3. Update Time & Reset on End
    audio.addEventListener('timeupdate', () => {
        const current = formatTime(audio.currentTime);
        const duration = isNaN(audio.duration) ? "0:24" : formatTime(audio.duration);
        timeDisplay.textContent = `${current} / ${duration}`;
    });

    audio.addEventListener('ended', () => {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        waveformBars.classList.remove('playing');
        audio.currentTime = 0;
    });

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Project Data Set
    const projects = [
        { name: "byBen", tag: "Portfolio website", color: "#FF5722", image: "media/portfolio/byben-ls.png", url: "https://byben.vercel.app/" },
        { name: "Absty", tag: "Personal website", color: "#FFEB3B", image: "media/portfolio/absty-ls.png", url: "https://absty.vercel.app/" },
        { name: "Marv", tag: "Digital Portfolio", color: "#FFEB3B", image: "media/portfolio/marv-ls.png", url: "https://marvellous-cyan.vercel.app/" },
        { name: "Freddy", tag: "Portfolio website", color: "#F44336", image: "media/portfolio/freddy-ls.png", url: "http://favourfredrick.com/" },
        { name: "The Shapes Agency", tag: "Agency Website", color: "#2196F3", image: "media/portfolio/tsa-ls.png", url: "https://theshapesagencyweb.com" },
        { name: "EverGlo", tag: "Laundry Brand Experience", color: "#4CAF50", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80", url: "https://everglo.io" },
        { name: "Ali Alamran", tag: "CInematic Porfolio", color: "#9C27B0", image: "media/portfolio/ali-ls.png", url: "https://ali-alamran.vercel.app/" },
        { name: "DunneCut", tag: "Digital Portfolio", color: "#D4AF37", image: "media/portfolio/dunne-ls.png", url: "https://dunnecut.vercel.app/" },
        { name: "Tag Media", tag: "Interactive timeline website", color: "#00BCD4", image: "media/portfolio/tag-ls.png", url: "https://tag-media-eight.vercel.app/" },
        { name: "Diuparum", tag: "Personal High-converting site", color: "#E91E63", image: "media/portfolio/diuparum-ls.png", url: "https://diuparum.vercel.app/" }
    ];

    const track = document.getElementById('marqueeTrack');
    const viewport = document.getElementById('marqueeViewport');
    const modal = document.getElementById('projectModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalTagline = document.getElementById('modalTagline');
    const modalExternalLink = document.getElementById('modalExternalLink');

    // Populate track twice for seamless infinite looping
    function buildMarquee() {
        const itemsToRender = [...projects, ...projects]; // Duplicated for smooth infinite keyframe
        track.innerHTML = '';
        
        itemsToRender.forEach(p => {
            const badge = document.createElement('div');
            badge.classList.add('project-badge');
            badge.innerHTML = `
                <div class="badge-dot" style="background-color: ${p.color};"></div>
                <span class="badge-name">${p.name}</span>
                <span class="badge-tag">${p.tag}</span>
            `;

            // Open modal on click
            badge.addEventListener('click', () => {
                modalImage.src = p.image;
                modalTitle.textContent = p.name;
                modalTagline.textContent = `${p.tag} — Built for high-conversion impact.`;
                modalExternalLink.href = p.url;
                modal.classList.add('active');
            });

            track.appendChild(badge);
        });
    }

    buildMarquee();

    // Grab-to-Pause interaction
    let isDown = false;
    let startX;

    viewport.addEventListener('mousedown', (e) => {
        isDown = true;
        viewport.classList.add('paused');
        startX = e.pageX;
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        viewport.classList.remove('paused');
    });

    viewport.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        // Manual drag translation adjustment can go here if needed, 
        // pause toggle already gives total control to inspect items.
    });

    // Touch support for mobile
    viewport.addEventListener('touchstart', () => {
        viewport.classList.add('paused');
    });

    viewport.addEventListener('touchend', () => {
        viewport.classList.remove('paused');
    });

    // Close Modal Logic
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modalBackdrop.addEventListener('click', () => modal.classList.remove('active'));
});

document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.getElementById('clientAvatar');
    const cards = document.querySelectorAll('.stair-step-card');

    // X and Y coordinates (in px) for avatar position on each stair step
    const stepPositions = [
        { x: 10,  y: 15 },   // Step 0: Landing / Status Quo
        { x: 45,  y: 135 },  // Step 1: Strategy
        { x: 75,  y: 255 },  // Step 2: Build
        { x: 110, y: 375 }   // Step 3: Handoff
    ];

    // Initialize Avatar Position at Step 0
    function setAvatarPosition(stepIndex) {
        const pos = stepPositions[stepIndex];
        if (pos && avatar) {
            avatar.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        }
    }

    setAvatarPosition(0);

    // Scroll Observer to trigger step change & move avatar
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepIndex = parseInt(entry.target.getAttribute('data-step'), 10);
                
                // Activate current card, deactivate others
                cards.forEach(card => card.classList.remove('active'));
                entry.target.classList.add('active');

                // Move Avatar
                setAvatarPosition(stepIndex);
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
});

document.addEventListener('DOMContentLoaded', () => {
    // Target your actual scrolling right column element
    const scrollContainer = document.querySelector('.hero-right-scroll-wrapper') || null;
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserverOptions = {
        root: scrollContainer, // Sets the container as the scroll boundary
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => revealObserver.observe(el));
});