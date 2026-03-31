/**
 * Spodnjo vsebino skopirajte v začetni repozitorij DN
 * (https://github.com/OIS-2024-2025/DN) na konec datoteke streznik.js.
 *
 * Vprašanja:
 *  - Kakšna bo vrednost ključa 'rezultat' pri klicu storitve '/izracun'?
 */

streznik.get("/izracun", (zahteva, odgovor) => {
    let rezultat = 0;

    function funkcija1() {
        rezultat -= 5;
    }

    function funkcija2() {
        return 3;
    }

    const https = require('https');

    // Dodana izjema HTTPS, ki nimajo veljavnega certifikata
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    function funkcija3(povratniKlic) {
        // na odgovor storitve čakamo okvirno polovico sekunde
        axios.get('https://fakestoreapi.com/users', {httpsAgent: agent})
            .then(function (response) {
                // uspešni odgovor
                povratniKlic(-7);
            })
            .catch(function (error) {
                // napaka
                console.log(error);
                povratniKlic(-7);
            });

    }


    function funkcija4(povratniKlic) {
        povratniKlic(1);
    }

    rezultat += funkcija2();
    funkcija4(function (odgovorFunkcije4) {
        funkcija3(function (odgovorFunkcije3) {
            rezultat += odgovorFunkcije3;
        });
        rezultat += odgovorFunkcije4;
        funkcija1();
        odgovor.send({"rezultat": (-1 * rezultat)});
        funkcija1();
    });
});