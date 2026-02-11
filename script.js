const TYPING_TEXT = "Certified Bluescreener...";

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loader-bar');
    const loaderPercent = document.getElementById('loader-percent');
    const content = document.getElementById('content');
    const logo = document.getElementById('logo');
    const typingTextEl = document.getElementById('typing-text');
    const dashboard = document.getElementById('dashboard');
    const footer = document.getElementById('footer');
    const tiles = document.querySelectorAll('.tile-glow');

    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                loader.classList.add('dismissed');
                startSequence();
            }, 400);
        }
        loaderBar.style.width = `${progress}%`;
        loaderPercent.textContent = `${Math.floor(progress)}% COMPLETE`;
    }, 120);

    function startSequence() {
        content.classList.remove('opacity-0');

        setTimeout(() => {
            logo.classList.add('logo-reveal-anim');
            logo.style.opacity = '1';
        }, 300);

        setTimeout(() => {
            type(0);
        }, 1100);
    }

    function type(i) {
        if (i < TYPING_TEXT.length) {
            typingTextEl.textContent = TYPING_TEXT.slice(0, i + 1);
            setTimeout(() => type(i + 1), 40);
        } else {
            showDashboard();
        }
    }

    function showDashboard() {
        dashboard.classList.remove('hidden');

        tiles.forEach((tile, idx) => {
            setTimeout(() => {
                tile.classList.add('tile-reveal-anim');
                tile.style.opacity = '1';
            }, idx * 120);
        });

        setTimeout(() => {
            footer.classList.add('footer-reveal-anim');
            footer.style.opacity = '1';
        }, (tiles.length * 120) + 200);
    }

    document.addEventListener('mousemove', (e) => {
        tiles.forEach(tile => {
            const rect = tile.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            tile.style.setProperty('--mouse-x', `${x}px`);
            tile.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

