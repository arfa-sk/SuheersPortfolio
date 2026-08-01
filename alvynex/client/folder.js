function initFolderScroll() {
    const track = document.getElementById('folder-scroll-track');
    const folderFlap = document.querySelector('.react-folder-flap');
    const folderBase = document.querySelector('.react-folder');
    const cards = [
        document.querySelector('.react-card-1'),
        document.querySelector('.react-card-2'),
        document.querySelector('.react-card-3')
    ];

    if (!track || !folderFlap || !folderBase) return;

    window.addEventListener('scroll', () => {
        const rect = track.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        let progress = (windowHeight / 2 - rect.top) / (rect.height - windowHeight / 2);
        progress = Math.max(0, Math.min(1, progress));
        const easeProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        // Drop the folder slightly down (only happens in the second half of the scroll)
        // This ensures cards pop out first, THEN folder drops just enough to sit below them
        const dropProgress = Math.max(0, (easeProgress - 0.5) * 2.0); // 0.0 to 1.0 during the second half
        const dropAmount = dropProgress * 120; // Drop distance (120 local px = 240 visual px)

        // We only translate the folder down. We DO NOT fade its opacity, 
        // because the cards are inside it and would disappear too!
        folderBase.style.transform = `translateY(${dropAmount}px)`;

        // translate MUST come before rotate so it moves straight down in global space
        folderFlap.style.transform = `translateY(${dropAmount}px) rotateX(${easeProgress * -40}deg)`;

        // Cards fan out locally. Keep Y values closer to 0 so they stay perfectly centered.
        const targetTransforms = [
            { x: -140, y: 30, rot: -15, scale: 1.0 },
            { x: 0, y: 20, rot: 2, scale: 1.1 },
            { x: 140, y: 40, rot: 18, scale: 1.0 }
        ];

        const initialTransforms = [
            { x: -38, y: 2, rot: -3, scale: 1 },
            { x: 0, y: 0, rot: 0, scale: 1 },
            { x: 42, y: 1, rot: 3.5, scale: 1 }
        ];

        cards.forEach((card, i) => {
            if (!card) return;
            const target = targetTransforms[i];
            const initial = initialTransforms[i];

            const currentX = initial.x + (target.x - initial.x) * easeProgress;
            let currentY = initial.y + (target.y - initial.y) * easeProgress;

            // Counteract folder drop so cards stay firmly planted in the center of the viewport
            currentY -= dropAmount;

            const currentRot = initial.rot + (target.rot - initial.rot) * easeProgress;
            const currentScale = initial.scale + (target.scale - initial.scale) * easeProgress;

            card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRot}deg) scale(${currentScale})`;
        });
    });
}

// ---------------- Boot ----------------
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Add Intersection Observer for testimonials
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
