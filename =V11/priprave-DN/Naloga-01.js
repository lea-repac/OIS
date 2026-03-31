/**
 * Spodnjo vsebino skopirajte v začetni repozitorij DN
 * (https://github.com/OIS-2024-2025/DN) na konec datoteke streznik.js.
 *
 * Vprašanja:
 *  - Kakšno vsebino tabele vam vrne klic storitve '/zaporedje' ?
 *  - Kaj se zgodi, če odkomentiramo komentar '// odgovor.send(tabela);',
 *    ponovno zaženemo strežnik in pokličemo storitev '/zaporedje'?
 *      - Ali bo odgovor storitve v tem primeru seznam z dodatnim elementom 'megla'?
 */

streznik.get("/zaporedje", (zahteva, odgovor) => {
    let tabela = [];

    function funkcija1() {
        tabela.push("sonce");
        odgovor.send(tabela);
    }

    function funkcija2() {
        return "dež";
    }

    const https = require('https');

    // Dodana izjema HTTPS, ki nimajo veljavnega certifikata
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    function funkcija3(povratniKlic) {
        // na odgovor storitve čakamo okvirno polovico sekunde
        // ( Dokumentacija knjižnice axios: https://www.npmjs.com/package/axios )
        axios.get('https://fakestoreapi.com/users', {httpsAgent: agent})
            .then(function (response) {
                // uspešni odgovor
                povratniKlic("sneg");
            })
            .catch(function (error) {
                // napaka
                console.log(error);
                povratniKlic("sneg");
            });
    }


    function funkcija4(povratniKlic) {
        tabela.push("oblaki");
        povratniKlic("megla");
    }

    tabela.push(funkcija2());
    funkcija4(function (odgovorFunkcije4) {
        funkcija3(function (odgovorFunkcije3) {
            tabela.push(odgovorFunkcije3);
        });
        funkcija1(odgovor);
        tabela.push(odgovorFunkcije4);
        //odgovor.send(tabela);
    });
});
