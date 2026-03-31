// SVG objekt risanja
var risanje;

// Velikost načrta
const SIRINA = 800;
const VISINA = 500;

// Funkcija, ki prikaže izbrane učilnice prebrane iz HTML elementa z
// enoličnim identifikatorjem 'izbrane-ucilnice'
function prikaziIzbraneUcilnice() {
    let seznamIzbranihUcilnic = $("span#izbrane-ucilnice").html().replaceAll(/\s/g, '').split(",");
    seznamIzbranihUcilnic.forEach(function (element, i) {
        if (element) $("table#tabela-obiskanih-dogodkov").find("." + element).css("visibility", "visible");
    });
}

$(document).ready(() => {
    // Omogočimo gumb za odjavo
    $("input#prijavaOdjavaGumb").prop('disabled', false);

    // Preberemo načrt 1. nadstropja FRI in ga izrišemo
    preberiJSON(
        "https://teaching.lavbic.net/cdn/OIS/DN1/prvo_nadstropje.json",
        (rezultat) => risanjeNacrta(rezultat)
    );

    // Dodan poslušalec na gumb za začetek animacije ogleda dogodka (6. točka DN-ja)
    $("button#ogled-dogodkov-gumb").click(() => {
        let circle = risanje.circle(15).fill("darkred").center(470, 271);

        // Po zaključku animacije se prikažejo izbrane učilnice
        prikaziIzbraneUcilnice();
    });

});

// Ob izbiri ali preklicu izbire računalniške učilnice s
// klikom na zemljevid, se le ta ustrezno obarva
function oznaciIzbranoUcilnico() {
    var click = function (event, ev2) {
        console.log(event.offsetX + " | " + event.offsetY);

        const clickedElement = SVG(event.target);
        clickedElement.fill(clickedElement.attr('fill') === "#f0f0f5" ? "green" : "#f0f0f5");
    }

    // Poslušalec dogodka klika miške na lokalni zemljevid
    risanje.on('click', click);
}

/**
 * Funkcija, ki s pomočjo knjižnice SVG.js izriše vektorsko sliko
 * načrta 1. nadstropja na FRI.
 *
 * @param rezultat seznam elementov načrta
 */
function risanjeNacrta(rezultat) {
    risanje = SVG().addTo("div#nacrt").size(SIRINA, VISINA);

    rezultat.elements.forEach(function (element, i) {
        if (element.polyline) {
            var polyline = risanje
                .polyline(element.polyline)
                .fill("none")
                .stroke({width: 0.3});
            let barva = element.style.split(";")[1].split(":")[1];
            // Na podlagi barve SVG elementa določimo,
            // da gre za računalniško učilnico FRI
            if (barva == "RGB(19,155,72)") {
                polyline.addClass("racunalniski-prostor");
                polyline.addClass(element.room);
                polyline.fill("#f0f0f5");
            }
            polyline.stroke({color: barva, linecap: "round"});
        }
    });

    oznaciIzbranoUcilnico();
}

/**
 * Branje JSON datotek iz podanega naslova.
 *
 * @param datoteka naslov datoteke
 * @param povratniKlic povratni klic z vsebino datoteke
 */
function preberiJSON(datoteka, povratniKlic) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", datoteka, true);
    xobj.onreadystatechange = function () {
        // Rezultat ob uspešno prebrani datoteki
        if (xobj.readyState == 4 && xobj.status == "200") {
            var json = JSON.parse(xobj.responseText);
            // Vrnemo rezultat
            povratniKlic(json);
        }
    };
    xobj.send(null);
}