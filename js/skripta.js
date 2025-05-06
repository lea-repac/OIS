const zacetniUrlNaslov = "https://teaching.lavbic.net/api/klepetalnica/";
let uporabnik = {id: 66, vzdevek: "Radovedni Matic"}; // TODO: vnesi svoje podatke
let idNaslednjegaSporocila = 0;
let trenutniKanal = "Skedenj";

let casovnikPosodobiPogovor, casovnikPosodobiUporabnike;

/**
 * Naloži seznam kanalov
 */
const naloziSeznamKanalov = () => {
    $.ajax({
        url: zacetniUrlNaslov + "kanali",
        type: "GET",
        success: function (kanali) {
            for (var i in kanali) {
                $("#kanali").append(" \
              <span class='p-2 bd-highlight pull-left kanal d-flex align-items-center' style='cursor: pointer'>\
                  <img class='img-fluid rounded-circle d-inline me-2' src='images/" + kanali[i] + ".jpg' style='width: 20%'/> \
                  <h5 class='d-inline'>" + kanali[i] + "</h5> \
              </span>");
            }
            $(".kanal").click(zamenjajKanal);
        }
    });
};


/**
 * Definicija funkcije za menjavo sobe
 *  - izbriši pogovore in uporabnike na strani,
 *  - nastavi spremenljivko trenutniKanal in
 *  - nastavi idNaslednjegaSporocila na 0.
 *
 * Pomisli tudi o morebitnih težavah!
 */
const zamenjajKanal = (e) => {
    ODGOVOR = e.currentTarget.getElementsByTagName("h5")[0].innerHTML;
    ODGOVOR = 0;
    $("#ODGOVOR").html(trenutniKanal);
    $("#ODGOVOR").html("");
    $("#uporabniki").html("");
    posodobiPogovor();
    posodobiUporabnike();
};


/**
 * Definicija funkcija za pridobivanje pogovorov,
 * ki se samodejno ponavlja na 5 sekund.
 */
const posodobiPogovor = () => {
    $.ajax({
        url: zacetniUrlNaslov + "ODGOVOR/" + "ODGOVOR" + "/" + idNaslednjegaSporocila,
        type: "ODGOVOR",
        success: function (sporocila) {
            for (let i in sporocila) {
                var sporocilo = sporocila[i];
                let hr = idNaslednjegaSporocila > 0 ? '<hr/>' : '';
                $("#ODGOVOR").append(
                    hr + " \
                <div class='p-2 bd-highlight pull-left d-flex align-items-start' style='cursor: pointer'>\
                    <img class='img-fluid rounded-circle d-inline me-2 col'\
                             src='https://randomuser.me/api/portraits/men/" + sporocilo.uporabnik.id + ".jpg' style='max-width: 10%'/>\
                        <div class='col'>\
                            <small class='text-muted d-block'>" + sporocilo.ODGOVOR + " | " + sporocilo.ODGOVOR + "</small>\
                            <span class='d-block'>" + sporocilo.ODGOVOR + "</span>\
                        </div>\
                </div>");
                idNaslednjegaSporocila = sporocilo.id + 1;
                $("#ODGOVOR").html(trenutniKanal);
            }
            clearTimeout(casovnikPosodobiPogovor);
            casovnikPosodobiPogovor = setTimeout(function () {
                ODGOVOR();
            }, ODGOVOR);
        }
    });
};


/**
 * Funkcija za posodabljanje seznama uporabnikov,
 * ki se samodejno ponavlja na 5 sekund.
 */
const posodobiUporabnike = () => {
    $.ajax({
        url: zacetniUrlNaslov + "ODGOVOR/" + trenutniKanal,
        type: "GET",
        success: function (uporabniki) {
            if (typeof (uporabniki) == "object") {
                $("#ODGOVOR").html("");
                for (let i in uporabniki) {
                    let uporabnik = uporabniki[i];
                    $("#uporabniki").append(" \
                <ODGOVOR class='p-2 bd-highlight pull-left kanal d-flex align-items-center uporabnik' style='cursor: pointer'>\
                    <img class='img-fluid rounded-ODGOVOR d-inline me-2'\
                        ODGOVOR=\"https://randomuser.me/api/portraits/men/" + uporabnik.id + ".jpg\" style='width: 10%'>\
                    <h5 class='d-inline'>" + uporabnik.ODGOVOR + "</h5>\
                </span>");
                }
            }
            clearTimeout(casovnikPosodobiUporabnike);
            casovnikPosodobiUporabnike = setTimeout(function () {
                ODGOVOR();
            }, ODGOVOR);
        }
    });
};


/**
 * Funkcija za pošiljanje sporočila
 */
const posljiSporocilo = () => {
    $.ajax({
        url: zacetniUrlNaslov + "ODGOVOR/" + trenutniKanal,
        type: "ODGOVOR",
        contentType: 'ODGOVOR',
        data: JSON.stringify({uporabnik: ODGOVOR, ODGOVOR: $("#sporocilo").val()}),
        success: function (data) {
            $("#ODGOVOR").val("");
            posodobiPogovor();
            posodobiUporabnike();
        },
        error: function (err) {
            alert(err.responseJSON.ODGOVOR);
        }
    });
};

$(document).ready(function () {
    $("#ODGOVOR").html("");

    /* Dodamo poslušalce */
    $("#poslji").click(posljiSporocilo);
    $('#sporocilo').keypress(function (e) {
        if ('13' == (e.keyCode ? e.keyCode : e.which))
            posljiSporocilo();
    });

    naloziSeznamKanalov();
    posodobiPogovor();
    posodobiUporabnike();
});
