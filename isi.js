document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. ANIMASI SECTION EVENT (Door Open)
    ===================================================== */
    const eventSection = document.querySelector(".event-section");

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                eventSection.style.animation = "doorOpen 1.2s ease forwards";
            }
        });
    }, { threshold: 0.2 });

    sectionObserver.observe(eventSection);



    /* =====================================================
       2. ANIMASI CARD MUNCUL (Intersection Observer)
    ===================================================== */
    const cards = document.querySelectorAll('.event-card');

    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.2 });

    cards.forEach(card => cardObserver.observe(card));



    /* =====================================================
       3. EFEK DAUN JATUH
    ===================================================== */
    const leavesContainer = document.createElement('div');
    leavesContainer.className = 'falling-leaves';
    document.body.appendChild(leavesContainer);

    const leafImg = "https://static.vecteezy.com/system/resources/thumbnails/009/657/341/small_2x/watercolor-flower-petals-free-png.png";

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.style.backgroundImage = `url(${leafImg})`;
        leaf.style.left = Math.random() * window.innerWidth + "px";
        leaf.style.animationDuration = (Math.random() * 6 + 5) + "s";
        leavesContainer.appendChild(leaf);

        setTimeout(() => leaf.remove(), 12000);
    }

    setInterval(createLeaf, 900);



    /* =====================================================
       4. SCROLL FADE-IN
    ===================================================== */
    const fadeElements = document.querySelectorAll(".fade-scroll");

    function checkFade() {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                el.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkFade);
    checkFade();



   /* =====================================================
   5. COUNTDOWN (SAVE THE DATE) - DENGAN ANIMASI FADE & ZOOM
===================================================== */
let countdownInterval;
const units = ['days', 'hours', 'minutes', 'seconds'];
const lastValues = {}; 
// Durasi animasi (ms). Sangat cepat dan halus.
const ANIMATION_DURATION = 300; 

/**
 * Memicu animasi Fade & Zoom pada unit waktu tertentu jika nilainya berubah.
 * @param {string} unit - 'days', 'hours', 'minutes', atau 'seconds'.
 * @param {string} newValue - Nilai waktu yang baru (sudah di-padding).
 */
function updateFadeZoomTimer(unit, newValue) {
    const unitElement = document.getElementById(unit);
    const currentValue = lastValues[unit];

    // Cek: Elemen ada, dan nilainya benar-benar berubah
    if (unitElement && currentValue !== newValue) {
        
        const currentCard = unitElement.querySelector('.current-card');
        const nextCard = unitElement.querySelector('.next-card');

        // 1. Set nilai BARU ke kartu 'next'
        nextCard.querySelector('.top-half').textContent = newValue;
        nextCard.querySelector('.bottom-half').textContent = newValue;
        
        // 2. Tambahkan kelas 'do-fade' untuk memulai animasi CSS
        unitElement.classList.add('do-fade');

        // 3. Setelah animasi selesai (300ms), update nilai dan reset
        setTimeout(() => {
            
            // Pindahkan nilai baru ke kartu 'current'
            currentCard.querySelector('.top-half').textContent = newValue;
            currentCard.querySelector('.bottom-half').textContent = newValue;

            // Hapus kelas animasi
            unitElement.classList.remove('do-fade');

        }, ANIMATION_DURATION); 

        // 4. Simpan nilai baru
        lastValues[unit] = newValue;
    }
}


function updateCountdown() {
    const targetDate = new Date("Jan 10, 2026 00:00:00").getTime();
    const now = Date.now();
    let distance = targetDate - now;

    if (distance < 0) {
        distance = 0;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const s = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    
    
    // Inisialisasi lastValues dan tampilan pertama kali
    if (Object.keys(lastValues).length === 0) {
        
        const setInitialValue = (unitId, value) => {
            const container = document.getElementById(unitId);
            if (container) {
                container.querySelector('.current-card .top-half').textContent = value;
                container.querySelector('.current-card .bottom-half').textContent = value;
                // Atur kartu next tersembunyi
                container.querySelector('.next-card').style.opacity = 0;
                container.querySelector('.next-card').style.transform = 'scale(1.1)'; // Siap untuk zoom in
            }
        };

        setInitialValue('days', d);
        setInitialValue('hours', h);
        setInitialValue('minutes', m);
        setInitialValue('seconds', s);

        lastValues.days = d;
        lastValues.hours = h;
        lastValues.minutes = m;
        lastValues.seconds = s;
    }

    // Panggil fungsi updateFadeZoomTimer untuk setiap unit
    updateFadeZoomTimer('days', d);
    updateFadeZoomTimer('hours', h);
    updateFadeZoomTimer('minutes', m);
    updateFadeZoomTimer('seconds', s);


    if (distance === 0) {
        clearInterval(countdownInterval);
        const container = document.querySelector('.countdown-container');
        if(container) {
             container.innerHTML = `<span class="timer-complete" style="font-size: 2em; color: var(--color-primary);">IT'S THE DAY!</span>`;
        }
    }
}

updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);

    /* =====================================================
       6. FORM RSVP (KIRIM KE GOOGLE FORM)
    ===================================================== */
    const form = document.getElementById('rsvpForm');
    const responseMessage = document.getElementById('responseMessage');

    const GOOGLE_FORM_ACTION_URL =
        "https://docs.google.com/forms/d/e/1FAIpQLSctBnIx0PZ2Fj3UNu1x8k7fevvfaP5hpHuc1Xr467r9Tw1zGA/formResponse";

    const FIELD_ID_NAMA = "Nama_Lengkap";
    const FIELD_ID_JUMLAH = "Jumlah_Tamu";
    const FIELD_ID_HADIR = "Konfirmasi_Hadir";

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('guestName').value.trim();
            const count = document.getElementById('jumlah-tamu').value;
            const attendance = document.querySelector('input[name="attendance"]:checked')?.value || "";

            const data = new FormData();
            data.append(FIELD_ID_NAMA, name);
            data.append(FIELD_ID_JUMLAH, count);
            data.append(FIELD_ID_HADIR, attendance);

            responseMessage.textContent = "Mengirimkan konfirmasi...";

            try {
                await fetch(GOOGLE_FORM_ACTION_URL, {
                    method: "POST",
                    mode: "no-cors",
                    body: data
                });

                responseMessage.textContent = "✅ Konfirmasi Kehadiran berhasil dikirim! Terima kasih.";
                form.reset();

            } catch (error) {
                responseMessage.textContent = "❌ Terjadi kesalahan. Silakan coba lagi.";
            }
        });
    }



   const envelope = document.getElementById('envelope');
        const waxSeal = document.getElementById('waxSeal');
        const copyButtons = document.querySelectorAll('.btn-copy');

        // 1. Fungsi Toggle Amplop (DROP DOWN)
        if (waxSeal && envelope) {
            waxSeal.addEventListener('click', function() {
                
                // Toggle kelas 'open' pada elemen .envelope
                const isOpen = envelope.classList.toggle('open'); 
                
                // Mengubah isi segel lilin
                if (isOpen) {
                    waxSeal.innerHTML = '<span>Tutup</span>';
                } else {
                    waxSeal.innerHTML = '<span>Buka</span>';
                }

                // Gulir ke amplop saat dibuka (memberikan waktu transisi)
                setTimeout(() => {
                     // Gulir ke bagian atas amplop untuk melihat seluruh konten
                     envelope.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
                }, 500);
            });
        }
        
        // 2. Fungsi Copy (Tetap Sama)
        if (copyButtons.length > 0) {
    copyButtons.forEach(button => {

        // fallback aman kalau data-text lupa ditulis
        const originalText = button.dataset.text || 'Salin';

        button.addEventListener('click', function () {
            const span = this.parentElement.querySelector('span');
            if (!span) return;

            const accountNumber = span.textContent.trim();

            navigator.clipboard.writeText(accountNumber).then(() => {
                this.textContent = 'Tersalin!';
                this.classList.add('copied');

                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 1500);
            });
        });
    });
}
});

/* =====================================================
   7. PEMUTAR MUSIK VINYL DENGAN AUTOPLAY & MANUAL PLAY/PAUSE
===================================================== */
document.addEventListener("DOMContentLoaded", () => {   
   const player = document.getElementById("vinylPlayer");
    const disc = document.getElementById("vinylDisc");
    const audio = document.getElementById("backgroundMusic");
    const button = document.getElementById("customPlayButton");

    let isPlaying = false;

    /* ===============================
       AUTOPLAY SAAT PAGE LOAD
    =============================== */
    function autoPlayMusic() {
        audio.play().then(() => {
            isPlaying = true;
            disc.classList.add("is-playing");
            button.innerHTML = '<i class="fa fa-pause"></i>';
        }).catch(() => {
            // Autoplay diblokir → tunggu interaksi user
            isPlaying = false;
            disc.classList.remove("is-playing");
            button.innerHTML = '<i class="fa fa-play"></i>';
        });
    }

    /* Jalankan autoplay */
    autoPlayMusic();

    /* ===============================
       MANUAL PLAY / PAUSE
    =============================== */
    player.addEventListener("click", () => {

        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                disc.classList.add("is-playing");
                button.innerHTML = '<i class="fa fa-pause"></i>';
            }).catch(() => {});
        } else {
            audio.pause();
            isPlaying = false;
            disc.classList.remove("is-playing");
            button.innerHTML = '<i class="fa fa-play"></i>';
        }

    });
});
/* ==========================================================
   POLAROID FLOATING – VARIASI GERAK TIAP FOTO
   iOS SAFE
========================================================== */

const polaroids = document.querySelectorAll(".polaroid-item");
let animationStarted = false;

function startPolaroidAnimation() {
    if (animationStarted || !polaroids.length) return;
    animationStarted = true;

    polaroids.forEach((item, index) => {

        /* ===== VARIASI PER ITEM ===== */
        const baseRotate = Math.random() * 6 - 3;       // rotasi dasar beda
        const rotateAmp = Math.random() * 0.8 + 0.8;    // amplitudo rotasi
        const floatAmp  = Math.random() * 2 + 3;        // tinggi naik turun
        const speedRot  = Math.random() * 0.5 + 0.9;    // kecepatan rotasi
        const speedY    = Math.random() * 0.5 + 1.1;    // kecepatan naik turun
        const phase     = Math.random() * Math.PI * 2; // offset fase

        const startTime = performance.now() + index * 220;

        function sway(time) {
            const t = (time - startTime) / 1000;

            const rotate = Math.sin(t * speedRot + phase) * rotateAmp;
            const translateY = Math.sin(t * speedY + phase) * floatAmp;

            item.style.transform =
                `translate3d(0, ${translateY}px, 0) rotate(${baseRotate + rotate}deg)`;

            requestAnimationFrame(sway);
        }

        requestAnimationFrame(sway);
    });
}

/* ==========================================================
   KICKSTART – WAJIB UNTUK SAFARI iOS
========================================================== */

document.addEventListener("touchstart", startPolaroidAnimation, { once: true });
window.addEventListener("scroll", startPolaroidAnimation, { once: true });
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) startPolaroidAnimation();
});
window.addEventListener("load", startPolaroidAnimation);


const reels = document.querySelectorAll('.reel');
let rotation = 0;

function spinReels() {
    rotation += 0.6;
    reels.forEach(reel => {
        reel.style.transform =
            `translateY(-50%) rotate(${rotation}deg)`;
    });
    requestAnimationFrame(spinReels);
}

spinReels();

const form = document.getElementById('wishForm');
const list = document.getElementById('wishList');

function loadWishes() {
    const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    list.innerHTML = '';
    wishes.forEach(wish => {
        const div = document.createElement('div');
        div.className = 'wish-item';
        div.innerHTML = `
            <h4>${wish.name}</h4>
            <span>${wish.email}</span>
            <p>${wish.message}</p>
        `;
        list.prepend(div);
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes.push({
        name: name.value,
        email: email.value,
        message: message.value
    });

    localStorage.setItem('wishes', JSON.stringify(wishes));
    form.reset();
    loadWishes();
});

loadWishes();