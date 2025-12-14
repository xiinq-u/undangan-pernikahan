/* =========================================================
   PARALLAX MOUSE EFFECT
========================================================= */
document.addEventListener('mousemove', (e) => {
    const layers = document.querySelectorAll('.layer');

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed') || 1;

        const x = (mouseX * speed) / 100;
        const y = (mouseY * speed) / 100;

        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
});


/* =========================================================
   ANIMASI MASUK NAMA
========================================================= */
window.addEventListener("load", () => {
    const layerNama = document.querySelector(".layer-nama");
    if (layerNama) layerNama.classList.add("muncul");
});


/* =========================================================
   MODAL RSVP
========================================================= */
const modalRSVP = document.getElementById("modalJL");
const btnRSVP   = document.querySelector(".btn-rsvp");
const closeRSVP = document.querySelector(".close");

if (btnRSVP && modalRSVP) {
    btnRSVP.addEventListener("click", (e) => {
        e.preventDefault();
        modalRSVP.classList.add("show");
    });
}

function closeModalRSVP() {
    modalRSVP.classList.remove("show");
}

if (closeRSVP) {
    closeRSVP.addEventListener("click", closeModalRSVP);
}

window.addEventListener("click", (e) => {
    if (e.target === modalRSVP) {
        closeModalRSVP();
    }
});


/* =========================================================
   WELCOME MODAL → PINDAH KE isi.html
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const modal       = document.getElementById('welcomeModal');
    const nextButton  = document.getElementById('nextButton');

    if (!modal) return;

    // Lock scroll saat modal aktif
    if (modal.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
    }

    function closeModalAndNavigate() {
        modal.classList.remove('show');

        setTimeout(() => {
            document.body.style.overflow = '';
            window.location.href = 'isi.html';
        }, 450);
    }

    if (nextButton) {
        nextButton.addEventListener('click', closeModalAndNavigate);
    }
});

/* =====================================
   WIND SWAY TEXT — CLASSIC ELEGANT (FIXED)
   - Nama & judul: per kata
   - Date & footer: per kalimat
   - Button TIDAK TERPENGARUH
===================================== */

const wordBased = [
    { selector: 'header h1', speed: 1.1, rotate: 1.2, move: 3 },
    { selector: '.names h2', speed: 1.0, rotate: 1.5, move: 4 },
    { selector: '.and', speed: 1.2, rotate: 0.8, move: 2 }
];

const sentenceBased = [
    { selector: '.date', speed: 0.9, rotate: 0.6, move: 1.5 },
    { selector: 'footer p', speed: 0.8, rotate: 0.5, move: 1.2 }
];

/* =========================
   SPLIT PER KATA (AMAN)
========================= */
function splitToWords(el) {
    const text = el.textContent;
    const words = text.split(' ');

    el.innerHTML = '';
    el.style.whiteSpace = 'normal'; // JAGA FLOW LAYOUT

    words.forEach(word => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.marginRight = '0.35em';
        span.style.willChange = 'transform';
        el.appendChild(span);
    });

    return el.querySelectorAll('span');
}

/* =========================
   ANIMASI PER KATA
========================= */
function animateWords() {
    wordBased.forEach(cfg => {
        const el = document.querySelector(cfg.selector);
        if (!el) return;

        const words = splitToWords(el);

        words.forEach((word, i) => {
            const phase = Math.random() * Math.PI * 2;
            const delay = i * 0.25;

            function sway(time) {
                const t = time * 0.0015 * cfg.speed + phase + delay;
                const rotate = Math.sin(t) * cfg.rotate;
                const translateY = Math.cos(t * 1.4) * cfg.move;

                word.style.transform =
                    `translate3d(0, ${translateY}px, 0) rotate(${rotate}deg)`;

                requestAnimationFrame(sway);
            }

            requestAnimationFrame(sway);
        });
    });
}

/* =========================
   ANIMASI PER KALIMAT
========================= */
function animateSentences() {
    sentenceBased.forEach(cfg => {
        const el = document.querySelector(cfg.selector);
        if (!el) return;

        // PENTING: tetap block → posisi button aman
        el.style.display = 'block';
        el.style.willChange = 'transform';

        const phase = Math.random() * Math.PI * 2;

        function sway(time) {
            const t = time * 0.0015 * cfg.speed + phase;
            const rotate = Math.sin(t) * cfg.rotate;
            const translateY = Math.cos(t * 1.3) * cfg.move;

            el.style.transform =
                `translate3d(0, ${translateY}px, 0) rotate(${rotate}deg)`;

            requestAnimationFrame(sway);
        }

        requestAnimationFrame(sway);
    });
}

/* =========================
   START
========================= */
window.addEventListener('load', () => {
    animateWords();
    animateSentences();
});
