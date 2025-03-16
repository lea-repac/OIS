$(document).ready(() => {

    // Posodobi prijavni gumb glede na stanje izbranih uporabnikov
    function pripraviPrijavnaGumba(stIzbranihStrank) {
        $("input#prijavaOdjavaGumb").prop('disabled', stIzbranihStrank == 0);
        $("input#prijavaOdjavaGumb").val(stIzbranihStrank > 1 ? "Prijava uporabnikov" : "Prijava uporabnika");
    }

    // Poslušalec pri izbiri obstoječega računa
    $("select#seznamRacunov").change(function (e) {
        let izbranRacunId = $(this).val();
        $("input#podrobnostiIzleta").attr("racun", izbranRacunId);
        console.log(izbranRacunId);
    });

    // Poslušalec pri izbiri uporabnika ali več uporabnikov
    $("select#seznamStrank").change(function (e) {
        let izbranaStrankaId = $(this).val();
        pripraviPrijavnaGumba(izbranaStrankaId.length);
    });
});
