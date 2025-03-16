window.addEventListener("load", function () {
    // Stran naložena

    // Posodobi opomnike
    var posodobiOpomnike = function () {
        var opomniki = document.querySelectorAll(".opomnik");

        for (var i = 0; i < opomniki.length; i++) {
            var opomnik = opomniki[i];
            var casovnik = opomnik.querySelector("span");
            var cas = parseInt(casovnik.innerHTML, 10);

            // - če je čas enak 0, izpiši opozorilo
            // - sicer zmanjšaj čas za 1 in nastavi novo vrednost v časovniku
            if (cas == 0) {
                var naziv_opomnika = opomnik.querySelector("ODGOVOR").innerHTML;
                alert("Opomnik!\n\nZadolžitev " + ODGOVOR + " je potekla!");
                document.querySelector("ODGOVOR").removeChild(opomnik);
            } else {
                casovnik.innerHTML = cas - ODGOVOR;
            }
        }
    };

    setInterval(posodobiOpomnike, 1000);

    // Izvedi prijavo
    var izvediPrijavo = function () {
        var uporabnik = document.querySelector("#uporabnisko_ime").value;
        document.querySelector("#uporabnik").innerHTML = uporabnik;
        document.querySelector(".pokrivalo").style.visibility = "hidden";
    };

    document.querySelector("#prijavniGumb").addEventListener('click', izvediPrijavo);

    // Dodaj opomnik
    var dodajOpomnik = function () {
        var naziv_opomnika = document.querySelector("ODGOVOR").value;
        document.querySelector("#naziv_opomnika").value = "";
        var cas_opomnika = document.querySelector("ODGOVOR").value;
        document.querySelector("#cas_opomnika").value = "";
        var opomniki = document.querySelector("ODGOVOR");

        opomniki.innerHTML += " \
            <div class='opomnik ODGOVOR'> \
                <div class='naziv_opomnika'>" + ODGOVOR + "</div> \
                <div class='cas_opomnika'> Opomnik čez <span>" + ODGOVOR +
                    "</span> sekund.</div> \
            </div>";
    };

    document.querySelector("ODGOVOR").addEventListener("click", ODGOVOR);
});
