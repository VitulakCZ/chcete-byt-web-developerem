const preMenu = document.querySelector(".pre-menu");
const menu = document.querySelector(".menu");
const hratTlacitko = document.querySelector(".hrat-tlacitko");
const zacitTlacitko = document.querySelector(".zacit-tlacitko");
const modryUtvar = document.querySelector(".modry-utvar");

const vepreduOtazka = document.querySelector(".otazka");
const vepreduOdpovedi = document.querySelectorAll(".odpoved");
const vepreduOdpovediWrapper = document.querySelector(".odpovedi-wrapper");
const znelka = new Audio("songy/znělka.ogg");
const prvniOtazky = new Audio("songy/první otázky.ogg");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let otazky = ["Ve kterém městě byste hledali Pražský hrad?"]
let odpovedi = [["V Praze", "V Brně", "V Olomouci", "Dycky Most!"]]
let spravneOdpovedi = ["A"]
const POCET_ODPOVEDI = 4

let id = null;
let pos = 40;

function frame() {
    if (pos <= 27) {
        clearInterval(id);
    } else {
        pos -= 0.5;
        modryUtvar.style.marginTop = pos + "%";
    }
}

async function hra() {
    let ntaOtazka = 1;
    while (ntaOtazka < 5) {
        vepreduOtazka.innerText = otazky[ntaOtazka-1];
        await sleep(2000);
        clearInterval(id);
        id = setInterval(frame, 5);
        vepreduOdpovediWrapper.style.display = "flex";
        for (let i = 0; i < POCET_ODPOVEDI; i++) {
            let pismeno = 'A';
            if (i == 1) pismeno = 'B';
            if (i == 2) pismeno = 'C';
            if (i == 3) pismeno = 'D';
            vepreduOdpovedi[i].innerHTML = '<font color="yellow">' + pismeno + ': </font><span class="mezera"></span>' + odpovedi[ntaOtazka-1][i];
        }
    }
}

hratTlacitko.addEventListener('click', () => {
    preMenu.style.display = "none";
    menu.style.display = "block";
    znelka.play();
});

zacitTlacitko.addEventListener('click', () => {
    menu.style.display = "none";
    modryUtvar.style.display = "flex";
    znelka.pause();
    prvniOtazky.play();
    hra();
});
