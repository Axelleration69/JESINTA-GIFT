
/* =====================================
   JESINTA GIFT WEBSITE
   INTERACTIVE JAVASCRIPT
===================================== */


/* =====================================
   1. PENGATURAN TANGGAL ULANG TAHUN
===================================== */

// Tanggal ulang tahun Jesinta
const birthdayDate = new Date(Date.now() + 3000);

let experienceStarted = false;


/* =====================================
   2. PEMBUKA WEBSITE
===================================== */

function startExperience() {

    // Jika belum waktunya, tampilkan popup
    if (new Date() < birthdayDate) {
        showBirthdayMessage();
        return;
    }

    // Cegah website dibuka berulang kali
    if (experienceStarted) return;

    experienceStarted = true;

    const hero = document.querySelector(".hero");
    const content = document.getElementById("site-content");

    if (!hero || !content) return;

    // Efek pembukaan
    burstHearts();
    launchConfetti();
    startBackgroundMusic();

    hero.classList.add("hero-leaving");

    setTimeout(() => {

        hero.style.display = "none";
        content.classList.add("is-visible");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 850);
}


/* =====================================
   3. KEMBALI KE HALAMAN PEMBUKA
===================================== */

function goHome() {

    const hero = document.querySelector(".hero");
    const content = document.getElementById("site-content");

    closeGift();

    const letterContent = document.getElementById("letter-content");
    const envelope = document.getElementById("envelope");
    const finalMessage = document.getElementById("final-message");

    if (letterContent) letterContent.style.display = "none";
    if (envelope) envelope.style.display = "block";
    if (finalMessage) finalMessage.style.display = "none";

    if (content) content.classList.remove("is-visible");

    if (hero) {
        hero.style.display = "flex";
        hero.classList.remove("hero-leaving");
    }

    experienceStarted = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================
   4. SURAT CINTA
===================================== */

function openLetter() {

    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("letter-content");

    if (envelope) envelope.style.display = "none";
    if (letter) letter.style.display = "block";

    burstHearts();
}


function closeLetter() {

    const letter = document.getElementById("letter-content");
    const envelope = document.getElementById("envelope");

    if (letter) letter.style.display = "none";
    if (envelope) envelope.style.display = "block";
}


/* =====================================
   5. VIRTUAL GIFT CARDS
===================================== */

const gifts = [

    {
        title: "For Your Happiness 🌸",

        message:
            "Aku berharap kamu selalu punya alasan untuk tersenyum. Bahkan ketika hari-harimu tidak berjalan sesuai harapan, semoga kamu tetap menemukan kebahagiaan dalam hal-hal kecil. Jangan lupa, kamu pantas mendapatkan banyak hal baik."
    },

    {
        title: "For Your Dreams 🧸",

        message:
            "Untuk semua mimpi yang sedang kamu perjuangkan, jangan pernah menyerah, ya. Aku berharap setiap langkah kecilmu membawamu semakin dekat dengan apa yang kamu inginkan. Aku akan selalu mendoakan keberhasilanmu."
    },

    {
        title: "For Our Journey 🎀",

        message:
            "Aku berharap perjalanan kita masih punya banyak cerita indah. Semoga kita bisa terus belajar memahami satu sama lain, saling mendukung, saling menjaga, dan menciptakan kenangan yang akan selalu kita ingat."
    }

];


function openGift(index) {

    const gift = gifts[index];

    if (!gift) return;

    const title = document.getElementById("gift-title");
    const message = document.getElementById("gift-message");
    const modal = document.getElementById("gift-modal");

    if (!title || !message || !modal) return;

    title.textContent = gift.title;
    message.textContent = gift.message;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";

    burstHearts();
}


function closeGift() {

    const modal = document.getElementById("gift-modal");

    if (modal) {
        modal.classList.remove("show");
    }

    document.body.style.overflow = "";
}


// Tutup popup dengan klik bagian luar
const giftModal = document.getElementById("gift-modal");

if (giftModal) {

    giftModal.addEventListener("click", function(event) {

        if (event.target === this) {
            closeGift();
        }

    });

}


// Tutup popup dengan tombol Escape
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeGift();
    }

});


/* =====================================
   6. MUSIK BACKGROUND
===================================== */

const music = document.getElementById("background-music");

let musicFadeFrame = null;
let musicStarted = false;
let isFadingOut = false;


function fadeMusic(targetVolume, duration) {

    if (!music) return;

    cancelAnimationFrame(musicFadeFrame);

    const startVolume = music.volume;
    const startTime = performance.now();

    function animate(now) {

        const progress = Math.min(
            (now - startTime) / duration,
            1
        );

        music.volume =
            startVolume + (targetVolume - startVolume) * progress;

        if (progress < 1) {
            musicFadeFrame = requestAnimationFrame(animate);
        }

    }

    musicFadeFrame = requestAnimationFrame(animate);
}


async function startBackgroundMusic() {

    if (!music || musicStarted) return;

    try {

        music.volume = 0;

        await music.play();

        musicStarted = true;
        isFadingOut = false;
updateMusicButton();

        fadeMusic(0.65, 1200);

    } catch (error) {

        console.log("Autoplay diblokir browser. Menunggu interaksi pengguna.");

    }

}

/* =====================================
   MUSIC PLAY / PAUSE CONTROL
===================================== */

function updateMusicButton() {
    const button = document.getElementById("music-toggle");

    if (!button || !music) return;

    button.textContent = music.paused
        ? "♫ Play Music"
        : "Ⅱ Pause Music";
}


async function toggleBackgroundMusic() {

    if (!music) return;

    if (music.paused) {

        try {

            music.volume = 0;

            await music.play();

            musicStarted = true;
            isFadingOut = false;

            fadeMusic(0.65, 1000);

            updateMusicButton();

        } catch (error) {

            console.log("Musik gagal diputar:", error);

            updateMusicButton();

        }

    } else {

        cancelAnimationFrame(musicFadeFrame);

        music.pause();

        isFadingOut = false;

        updateMusicButton();

    }

}

// Jika autoplay ditolak Chrome,
// coba putar musik saat Jesinta berinteraksi dengan halaman.
// Tidak membuat tombol tambahan.




// Fade out menjelang musik selesai
if (music) {

    music.addEventListener("timeupdate", () => {

        if (!music.duration || !Number.isFinite(music.duration)) return;

        const remaining = music.duration - music.currentTime;

        if (remaining <= 0.5 && !isFadingOut && !music.paused) {

            isFadingOut = true;

            fadeMusic(0, 450);

        }

    });


    // Putar ulang setelah musik selesai
    music.addEventListener("ended", async () => {

        isFadingOut = false;
        music.currentTime = 0;

        try {

            await music.play();

            musicStarted = true;

            fadeMusic(0.65, 1200);

        } catch (error) {

            musicStarted = false;

            console.log("Musik gagal diputar ulang:", error);

        }

    });

}


/* =====================================
   7. KEJUTAN TERAKHIR
===================================== */

function revealSurprise() {

    const message = document.getElementById("final-message");

    if (!message) return;

    message.style.display = "block";

    message.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    burstHearts();

}


/* =====================================
   8. ANIMASI HATI DAN BUNGA
===================================== */

const floatingContainer = document.getElementById("floating-container");

const symbols = [
    "♡",
    "♥",
    "🌸",
    "🌷",
    "✿",
    "✨"
];


function createFloatingItem() {

    if (!floatingContainer) return;

    const item = document.createElement("span");

    item.classList.add("floating-item");

    item.textContent = symbols[
        Math.floor(Math.random() * symbols.length)
    ];

    item.style.left = Math.random() * 100 + "vw";

    item.style.fontSize =
        (12 + Math.random() * 16) + "px";

    item.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    floatingContainer.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, 11000);

}


// Hati dan bunga jatuh berkala
setInterval(() => {
    createFloatingItem();
}, 1000);


/* =====================================
   9. BURST HEARTS
===================================== */

function burstHearts() {

    for (let i = 0; i < 20; i++) {

        setTimeout(() => {
            createFloatingItem();
        }, i * 70);

    }

}


/* =====================================
   10. CONFETTI BURST
===================================== */


function launchConfetti() {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.style.cssText = `
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 99997;
    `;

    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
        "#f7a8c4",
        "#ffd166",
        "#cdb4db",
        "#a2d2ff",
        "#ff8fab",
        "#ffffff"
    ];

    const particles = [];

    // Dua sumber ledakan dari sudut bawah
    [0, 1].forEach(side => {

        for (let i = 0; i < 90; i++) {

            const spread = Math.random() * 0.65 - 0.325;

            const angle = side === 0
                ? -Math.PI / 2 + spread
                : -Math.PI / 2 - spread;

            const speed = Math.random() * 5 + 5;

            particles.push({
                x: side === 0 ? 20 : canvas.width - 20,
                y: canvas.height - 20,

                vx: Math.cos(angle) * speed * (side === 0 ? 1 : -1),
                vy: Math.sin(angle) * speed,

                gravity: 0.075,

                size: Math.random() * 7 + 4,

                color: colors[Math.floor(Math.random() * colors.length)],

                rotation: Math.random() * 360,

                rotationSpeed: Math.random() * 5 - 2.5,

                opacity: 1
            });

        }

    });

    const startTime = performance.now();
    const duration = 9000;

    function animate(now) {

        const elapsed = now - startTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {

            p.vy += p.gravity;

            p.x += p.vx;
            p.y += p.vy;

            p.rotation += p.rotationSpeed;

            if (elapsed > 6500) {
                p.opacity = Math.max(0, 1 - (elapsed - 6500) / 2500);
            }

            ctx.save();

            ctx.globalAlpha = p.opacity;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);

            ctx.fillStyle = p.color;

            ctx.fillRect(
                -p.size / 2,
                -p.size / 2,
                p.size,
                p.size * 0.65
            );

            ctx.restore();

        });

        if (elapsed < duration) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }

    }

    requestAnimationFrame(animate);
}



/* =====================================
   11. GIFT SELECTION & WHATSAPP
===================================== */

const whatsappNumber = "6285311408327";

const promiseGifts = [
    {
        name: "A Bouquet of Love",
        whatsapp: "Aku memilih hadiah A Bouquet of Love ♡",
        title: "A Bouquet of Love 🌸",
        image: "hadiah1.jpg",
        note: "If I could give you a flower for every time you make me smile, I would give you an endless garden. Until then, let this bouquet remind you how special you are to me."
    },
    {
        name: "A Little Hug",
        whatsapp: "Aku memilih hadiah A Little Hug ♡",
        title: "A Little Hug 🧸",
        image: "hadiah2.jpg",
        note: "Whenever you need a hug and I'm not around, I hope this little friend can remind you that someone is always thinking of you."
    },
    {
        name: "A Promise to Keep",
        whatsapp: "Aku memilih hadiah A Promise to Keep ♡",
        title: "A Promise to Keep ♡",
        image: "hadiah3.jpg",
        note: "Not a promise of perfection, but a promise to keep choosing you, to grow with you, and to make more beautiful memories together."
    }
];

// MENAMPILKAN PESAN DI BAWAH TIKET
function showSelectedGift(index) {
    const gift = promiseGifts[index];
    if (!gift) return;

    const note = document.getElementById("selected-gift-note");
    const image = document.getElementById("selected-note-image");
    const title = document.getElementById("selected-note-title");
    const message = document.getElementById("selected-note-message");

    if (!note || !image || !title || !message) {
        console.error("Elemen pesan hadiah tidak ditemukan!");
        return;
    }

    image.src = gift.image;
    image.alt = gift.title;

    title.textContent = gift.title;
    message.textContent = gift.note;

    note.style.display = "block";
    note.classList.add("show");
}

// MEMILIH HADIAH
function selectPromise(index) {

    const savedChoice = localStorage.getItem("jesintaGiftChoice");

    if (savedChoice !== null) return;

    const gift = promiseGifts[index];

    if (!gift) return;

    localStorage.setItem("jesintaGiftChoice", index);

    const result = document.getElementById("gift-selection-result");
    const message = document.getElementById("selected-gift-message");

    if (message) {
        message.textContent =
            `Kamu memilih "${gift.name}". Hadiah ini akan menjadi janji kecil yang menunggu hari kita bertemu. ♡`;
    }

    if (result) {
        result.classList.add("show");
    }

    // Tampilkan pesan sesuai hadiah di bawah tiket
    showSelectedGift(index);

    // Kunci semua pilihan
    lockGiftChoices(index);

    // WhatsApp tetap seperti fungsi sebelumnya
    const whatsappMessage =
        `Hai, aku sudah memilih hadiah ulang tahunku! ♡\n\n${gift.whatsapp}\n\nAku akan menunggu hadiah ini sampai hari kita bertemu.`;

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, "_blank");

    if (result) {
        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

}


// MENGUNCI PILIHAN HADIAH
function lockGiftChoices(selectedIndex) {

    const cards = document.querySelectorAll(".promise-card");
    const buttons = document.querySelectorAll(".promise-button");

    cards.forEach((card, index) => {

        if (index === selectedIndex) {
            card.classList.add("selected");
        } else {
            card.classList.add("locked");
        }

    });

    buttons.forEach((button, index) => {

    if (!button.dataset.originalText) {
        button.dataset.originalText = button.textContent;
    }

    button.disabled = true;

        if (index === selectedIndex) {
            button.textContent = "Your Choice ♡";
        } else {
            button.textContent = "Already Chosen";
        }

    });

}


// MEMULIHKAN PILIHAN SETELAH REFRESH
function restoreGiftChoice() {

    const savedChoice = localStorage.getItem("jesintaGiftChoice");

    if (savedChoice === null) return;

    const index = Number(savedChoice);
    const gift = promiseGifts[index];

    if (!gift) return;

    const result = document.getElementById("gift-selection-result");
    const message = document.getElementById("selected-gift-message");

    if (message) {
        message.textContent =
            `Kamu memilih "${gift.name}". Hadiah ini akan menjadi janji kecil yang menunggu hari kita bertemu. ♡`;
    }

    if (result) {
        result.classList.add("show");
    }

    // Pulihkan pesan khusus di bawah tiket
    showSelectedGift(index);

    // Pulihkan kunci pilihan
    lockGiftChoices(index);

}


document.addEventListener("DOMContentLoaded", restoreGiftChoice);
/* =====================================
   RESET GIFT CHOICE
===================================== */

function resetGiftChoice() {

    localStorage.removeItem("jesintaGiftChoice");

    const result = document.getElementById("gift-selection-result");
    const message = document.getElementById("selected-gift-message");
    const note = document.getElementById("selected-gift-note");

    if (result) result.classList.remove("show");
    if (message) message.textContent = "";

    if (note) {
        note.style.display = "none";
        note.classList.remove("show");
    }

    const cards = document.querySelectorAll(".promise-card");
    const buttons = document.querySelectorAll(".promise-button");

    cards.forEach(card => {
        card.classList.remove("selected", "locked");
    });

    buttons.forEach(button => {
        button.disabled = false;
        button.textContent = button.dataset.originalText || "Choose This Gift";
    });

    document.getElementById("choose-gift")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
/* =====================================
   13. BIRTHDAY COUNTDOWN
===================================== */

function updateBirthdayCountdown() {

    const countdown = document.getElementById("birthday-countdown");

    if (!countdown) return;


    const now = new Date().getTime();

    const target = birthdayDate.getTime();

    const distance = target - now;


    // Jika ulang tahun sudah tiba
    if (distance <= 0) {

        countdown.style.display = "none";

        if (!experienceStarted) {
            startExperience();
        }

        return;

    }


    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );


    const daysElement = document.getElementById("countdown-days");
    const hoursElement = document.getElementById("countdown-hours");
    const minutesElement = document.getElementById("countdown-minutes");
    const secondsElement = document.getElementById("countdown-seconds");


    if (daysElement) {
        daysElement.textContent = String(days).padStart(2, "0");
    }

    if (hoursElement) {
        hoursElement.textContent = String(hours).padStart(2, "0");
    }

    if (minutesElement) {
        minutesElement.textContent = String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }

}


// Jalankan countdown
updateBirthdayCountdown();

setInterval(updateBirthdayCountdown, 1000);


/* =====================================
   14. POPUP SEBELUM ULANG TAHUN
===================================== */

function showBirthdayMessage() {

    // Cegah popup bertumpuk
    if (document.getElementById("birthday-popup")) return;


    const overlay = document.createElement("div");

    overlay.id = "birthday-popup";


    overlay.innerHTML = `

        <div class="birthday-popup-card">

            <div class="popup-decoration">🎀</div>

            <div class="popup-icon">💗</div>

            <span class="popup-label">OOPSIE... ♡</span>

            <h2>Hehehe, Not Yet!</h2>

            <p>
                Eitsss, sayang! Jangan buru-buru donggg. 😄
                Hadiah spesialmu masih menunggu hari ulang tahunmu.
            </p>

            <div class="popup-note">
                Be patient, pretty girl! 🌷
            </div>

            <button id="close-birthday-popup">
                Okay, I'll Wait ♡
            </button>

            <div class="popup-hearts">♡　♡　♡</div>

        </div>

    `;


    Object.assign(overlay.style, {

        position: "fixed",

        inset: "0",

        background: "rgba(55, 30, 45, 0.48)",

        backdropFilter: "blur(6px)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: "20px",

        zIndex: "99999",

        animation: "popupFade 0.3s ease"

    });


    document.body.appendChild(overlay);


    document.getElementById("close-birthday-popup").onclick = () => {

        overlay.remove();

    };


    overlay.addEventListener("click", (event) => {

        if (event.target === overlay) {
            overlay.remove();
        }

    });

}


/* =====================================
   15. WEBSITE READY
===================================== */

console.log("Jesinta Gift Website berhasil dimuat ♡");

