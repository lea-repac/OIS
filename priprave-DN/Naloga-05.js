/**
 * V navodili DN-ja je bilo potrebno implementirati sledečo funkcionalnost:
 *  Na strani odjemalca na prijavni strani je potrebno ob izbiri uporabnikov sešteti
 *  koliko uporabniklov prihaja iz posamezne države. Ta podatek se prikaže, ko izbirate
 *  uporabnike in sicer v HTML element z enoličnim identifikatorjem podrobnostiIzbranihStrank,
 *  npr. Brazil (2), USA (1), United Kingdom (3).
 *
 * Izpolnite manjkakočo vsebino v nizih 'ODGOVOR', da bo funkcionalnost delovala.
 *
 * Pri reševanju si lahko pomagate tako, da skopirate spodnjo izvorno kodo v začetni repozitorij DN
 * (https://github.com/OIS-2024-2025/DN) v datoteko
 * 'public/skripte/prijava.js' in sicer v funkcijo, ki se proži, ko se spletno mesto naloži ('$(document).ready').
 *
 * Pri reševanju si lahko pomagate s Handlebars predlogo prijava.hbs:
 * https://github.com/OIS-2024-2025/DN/blob/main/views/prijava.hbs
 */

// Poslušalec pri izbiri uporabnika ali več uporabnikov
$("select#seznamStrank").change(function (e) {
    let izbranaStrankaId = $(this).val();

    let rezultat = {};
    // poiščemo seznam ustreznih HTML elementov
    let dict = $(this).find("ODGOVOR");
    for (var kljuc in dict) {
        // preverimo ali je zbirni element izbran
        if (dict[kljuc].ODGOVOR) {
            let najdenaDrzava = dict[kljuc].label.split(" | ")[ODGOVOR];
            if (rezultat[najdenaDrzava])
                rezultat[najdenaDrzava]++;
            else
                rezultat[najdenaDrzava] = ODGOVOR;
        }
    }
    let rezultatStr = "";
    for (var kljuc in rezultat) {
        rezultatStr += (rezultatStr.length > 0 ? ", " : "") + kljuc + " ODGOVOR" + ODGOVOR[kljuc] + ")";
    }
    $("#podrobnostiIzbranihStrank").ODGOVOR(rezultatStr);

    pripraviPrijavnaGumba(izbranaStrankaId.length);
});