const preMenu = document.querySelector(".pre-menu");
const menu = document.querySelector(".menu");
const hratTlacitko = document.querySelector(".hrat-tlacitko");
const zacitTlacitko = document.querySelector(".zacit-tlacitko");
const modryUtvar = document.querySelector(".modry-utvar");

const vepreduOtazka = document.querySelector(".otazka");
const vepreduOdpovedi = document.querySelectorAll(".odpoved");
const odpovedA = document.getElementById("odpoved-A");
const odpovedB = document.getElementById("odpoved-B");
const odpovedC = document.getElementById("odpoved-C");
const odpovedD = document.getElementById("odpoved-D");
const vepreduOdpovediWrapper = document.querySelector(".odpovedi-wrapper");
const audioZnelka = new Audio("songy/znělka.ogg");
const audioZacatekOtazky = new Audio("songy/začátek otázky.ogg");
const audioPrvniOtazky = new Audio("songy/první otázky.ogg");
const audioOznaceniKratke = new Audio("songy/označení krátké.ogg");
const audioOznaceni = new Audio("songy/označení.ogg");
const audioSpravnaOdpoved = new Audio("songy/správná odpověď.ogg");
const audioProhra = new Audio("songy/prohra.ogg");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let otazky = ["Ve kterém městě byste hledali Pražský hrad?", "Jan Hus byl upálen v Kostnici v roce 1415. Jak se jmenoval?"]
let odpovedi = [["V Praze", "V Brně", "V Olomouci", "Dycky Most!"], ["Adam", "Jan Hus", "Konstantin a Metoděj", "Emanuel Macron"]]
let spravneOdpovedi = ["A", "B"]
const POCET_ODPOVEDI = 4

let id = null;
let pos = 40;

function reset() {
    pos = 40;
    modryUtvar.style.marginTop = pos + "%";
    vepreduOdpovediWrapper.style.display = "none";
    for (let i = 0; i < vepreduOdpovedi.length; i++) {
        vepreduOdpovedi[i].style.background = "blue";
        vepreduOdpovedi[i].style.pointerEvents = "auto";
    }
    zakliknutaOdpoved = null;
    audioPrvniOtazky.volume = 1.0;
}

function frame() {
    if (pos <= 27) {
        clearInterval(id);
    } else {
        pos -= 0.5;
        modryUtvar.style.marginTop = pos + "%";
    }
}

async function oznacit(odpoved) {
    odpoved.style.background = "#EC8D40";
    for (let i = 0; i < vepreduOdpovedi.length; i++)
        vepreduOdpovedi[i].style.pointerEvents = "none";
    audioPrvniOtazky.volume = 0.2;
    audioOznaceniKratke.play();
}

let zakliknutaOdpoved = null;
let zakliknutaVepreduOdpoved = null;
odpovedA.addEventListener('click', () => {
    zakliknutaOdpoved = 'A';
    zakliknutaVepreduOdpoved = odpovedA;
    oznacit(odpovedA);
});
odpovedB.addEventListener('click', () => {
    zakliknutaOdpoved = 'B';
    zakliknutaVepreduOdpoved = odpovedB;
    oznacit(odpovedB);
});
odpovedC.addEventListener('click', () => {
    zakliknutaOdpoved = 'C';
    zakliknutaVepreduOdpoved = odpovedC;
    oznacit(odpovedC);
});
odpovedD.addEventListener('click', () => {
    zakliknutaOdpoved = 'D';
    zakliknutaVepreduOdpoved = odpovedD;
    oznacit(odpovedD);
});

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

        if (zakliknutaOdpoved !== null) {
            await sleep(4000);
            if (zakliknutaOdpoved === spravneOdpovedi[ntaOtazka-1]) {
                zakliknutaVepreduOdpoved.style.background = "green";
                audioSpravnaOdpoved.play();
                await sleep(2000);
                ntaOtazka++;
                reset();
            } else {
                zakliknutaVepreduOdpoved.style.background = "#BB2C2C";
                switch (spravneOdpovedi[ntaOtazka-1]) {
                    case 'A':
                        vepreduOdpovedi[0].style.background = "green";
                        break;
                    case 'B':
                        vepreduOdpovedi[1].style.background = "green";
                        break;
                    case 'C':
                        vepreduOdpovedi[2].style.background = "green";
                        break;
                    case 'D':
                        vepreduOdpovedi[3].style.background = "green";
                        break;
                }
                audioPrvniOtazky.pause();
                audioProhra.play();
                return;
            }
        }
    }
}

hratTlacitko.addEventListener('click', () => {
    preMenu.style.display = "none";
    menu.style.display = "block";
    audioZnelka.play();
});

zacitTlacitko.addEventListener('click', () => {
    menu.style.display = "none";
    modryUtvar.style.display = "flex";
    audioZnelka.pause();
    audioZacatekOtazky.play();
    audioPrvniOtazky.play();
    hra();
});
