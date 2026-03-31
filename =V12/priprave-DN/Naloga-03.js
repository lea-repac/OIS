/**
 * Na spletnem mestu skupinskega obiska informativnega dne na FRI (spletno mesto /informativni)
 * se skupinsko prijavijo potencialni bodoči študenti na FRI. Ker postaja študij FRI-ja vsako leto
 * bolj atraktiven se je vodstvo odločilo, da organizira informativni dan FRI z “mistery”
 * tematikami, kjer potencialni študenti ne vedo kakšne promocije bodo obiskali. Za celovit prikaz
 * prijavljenih strank je potrebno izvesti naslednja koraka:
 *
 * 1. Najprej je potrebno na strani strežnika v datoteki streznik.js pridobiti vse nazive
 * (imena in priimke) prijavljenih uporabnikov pri čemer si pomagajte s funkcijo vrniNaziveStrank.
 *
 * 4. Na strani strežnika v datoteki streznik.js je potrebno z uporabo spletne storitve Flagpedia
 * API, ki vsako kratico države po standardu ISO 3166-1 alpha-2 (cca2) preslika v pripadajočo državo
 * v obliki HTML elementa img standardne velikosti 16px širine in 12px višine, kjer se ob pravilni
 * implementaciji odjemalcu prikaže slika zastavice v HTML seznamu <ul> za nazivom uporabnika.
 * Po potrebi v datoteki views/informativni.hbs na strani odjemalca nadgradite možnost interpretacije
 * HTML-ja v Handlebars parametrih.
 *
 * Namig: Pri reševanju lahko predhodno pridobite kratico države po standardu ISO 3166-1 alpha-2 (cca2)
 * s pomočjo spletne storitve oz. zunanjega vira GitHub repozitorij
 * (https://raw.githubusercontent.com/stereobooster/react-simple-country-select/refs/heads/master/src/countries.json),
 * kjer dobite na voljo seznam vseh preslikav imena držav v standard ISO 3166-1 alpha-2 (cca2).
 *
 * Izpolnite manjkakočo vsebino v nizih 'ODGOVOR', da bo funkcionalnost delovala.
 *
 * Pri reševanju si lahko pomagate tako, da skopirate spodnjo izvorno kodo v začetni repozitorij DN
 * (https://github.com/OIS-2023-2024/DN) v datoteko 'streznik.js', v storitev z HTTP metodo GET '/informativni'.
 */

let zunanjaStoritevDrzave = "https://raw.githubusercontent.com/stereobooster/react-simple-country-select/refs/heads/master/src/countries.json";

/*
primer elementov zunanje storitve 'zunanjaStoritevDrzave':
[ ...
  {"name": "Antigua and Barbuda", "cca2": "AG", "flag": "🇦🇬", "code": "1268"},
  {"name": "Australia", "cca2": "AU", "flag": "🇦🇺", "code": "61"},
  {"name": "Austria", "cca2": "AT", "flag": "🇦🇹", "code": "43"},
  {"name": "Azerbaijan", "cca2": "AZ", "flag": "🇦🇿", "code": "994"},
  ... ]
 */

// Prikaz strani z lokalnim zemljevidom
streznik.get("/informativni", (zahteva, odgovor) => {
    // v primeru, da uporabniki niso prijavljeni
    if (!zahteva.session.trenutneStranke) {
        odgovor.redirect("/prijava");
    } else {
        vrniNaziveStrank(zahteva.session.trenutneStranke, (stranke) => {
            axios.ODGOVOR(zunanjaStoritevDrzave)
                .then(function (response) {
                    let seznamDrzav = response.data;
                    stranke.forEach(function (stranka) {
                        seznamDrzav.forEach(function (element) {
                            if (stranka.drzava && stranka.drzava == element.ODGOVOR) {
                                stranka.zastavica = "<ODGOVOR style='display: inline; width: ODGOVORpx !important; height: 12px !important;' " +
                                    "  src='https://flagcdn.com/16x12/" + element.ODGOVOR.toLowerCase() + ".png' alt='" + stranka.drzava + "'>";
                            }
                        });
                    });

                    odgovor.render("informativni", {
                        podnaslov: "Skupinski obisk informativnega dneva FRI",
                        prijavniGumb: "Odjava",
                        seznamStrank: ODGOVOR,
                    });
                }).catch(function (error) {
                odgovor.send("napaka: " + error);
            });
        });
    }
});