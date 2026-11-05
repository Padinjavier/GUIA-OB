let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const tipText = document.getElementById('tip-text');
const arrowTerms = document.getElementById('arrowTerms');

const tips = [
    "Inica dando clic en <strong>REGISTRATE</strong>",
    "Tu usuario se ubica en el sticker del equipo o en tu gafete, se le suele llamar P0, usuario o registro. Recuarda en un <strong>CERO</strong>",
    "Revisa el correo que inicie con (ej. si sale 'ja', busca en tu correo que empiece con 'ja'). Si no aparece tu correo ja****, es porque ingresaste mal tu P0.",
    "Prohivido omitir este paso. Haz clic en el texto azul 'Términos y condiciones' para desbloquear el check.",
    "Sigue la regla: 2 letras, 2 números, 2 letras, 2 números. ¡No la olvides!",
    "No intentes registrar huella en este paso, podrías bloquear tu cuenta temporalmente.",
    "Asegúrate de que Zscaler muestre 'ON' en verde antes de abrir la intranet.",
    "Revisa las 3 páginas del acta. Usa el archivo 'info laptop' del escritorio para llenar la serie."
];

slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    tipText.innerHTML = `<strong>Consejo:</strong> ${tips[currentSlide]}`;

    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === slides.length - 1;

    if (index === 4) {
        animatePassword();
    }
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function enableCheck() {
    const chk = document.getElementById('chkTerms');
    const btn = document.getElementById('btnRegisterPhone');
    chk.disabled = false;

    if (arrowTerms) {
        arrowTerms.style.display = 'none';
    }

    chk.addEventListener('change', function () {
        btn.disabled = !this.checked;
    });
}

function animatePassword() {
    const demo = document.getElementById('passDemo');
    const input = document.getElementById('newPassInput');
    const targetText = "ro20sa08";
    let i = 0;

    demo.innerHTML = "_ _ _ _ _ _ _ _";
    input.value = "";

    const interval = setInterval(() => {
        if (i < targetText.length) {
            let currentDisplay = demo.innerHTML.split(' ');
            currentDisplay[i] = targetText[i];
            demo.innerHTML = currentDisplay.join(' ');
            input.value += targetText[i];
            i++;
        } else {
            clearInterval(interval);
        }
    }, 400);
}

function togglePass() {
    const input = document.getElementById('passInput');
    const icon = document.querySelector('.toggle-password');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function showActaPage(pageNumber) {
    // Ocultar todas las páginas
    document.getElementById('actaPage1').classList.remove('active');
    document.getElementById('actaPage2').classList.remove('active');
    document.getElementById('actaPage3').classList.remove('active');

    // Quitar clase active de todas las pestañas
    document.querySelectorAll('.acta-tab').forEach(tab => tab.classList.remove('active'));

    // Mostrar la página seleccionada y activar su pestaña
    document.getElementById('actaPage' + pageNumber).classList.add('active');
    document.querySelectorAll('.acta-tab')[pageNumber - 1].classList.add('active');
}

prevBtn.disabled = true;