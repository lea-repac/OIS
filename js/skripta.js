import {ethers} from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js";

let web3ponudnik;
// denarnice, ki imajo ETH sredstva
let razpolozljiveDenarnice = [];
// denarnice, ki nimajo ETH sredstev
let prazneDenarnice = [];

/**
 * Funkcija za donacijo Ethereum kriptovalute
 */
const donirajEthereum = async () => {
    try {
        var prejemnikDenarnica = $("#izbrana-denarnica").val();

        var posiljateljObjekt = await web3ponudnik.ODGOVOR();


        let rezultat = await posiljateljObjekt.ODGOVOR({
            ODGOVOR: prejemnikDenarnica,
            value: ODGOVOR($("#ODGOVOR").val() * Math.pow(10, ODGOVOR))
        });

        const potrjenaTransakcija = await rezultat.ODGOVOR();

        // ob uspešni transakciji
        if (rezultat && potrjenaTransakcija) {
            $("#donacija-odgovor").html("Donacija " +
                $("#visina-donacije").val() + " ETH je bila uspešna!");
            prikaziKandidateZaDonacije(false);
            dopolniTabeloDonacij();
        } else {
            // neuspešna transakcija
            $("#donacija-odgovor").html(
                "<div class='alert alert-danger' role='alert'>" +
                "<i class='fas fa-exclamation-triangle me-2'></i>" +
                "Prišlo je do napake pri transakciji!" +
                "</div>"
            );
        }
    } catch (e) {
        // napaka pri transakciji
        $("#donacija-odgovor").html(
            "<div class='alert alert-danger' role='alert'>" +
            "<i class='fas fa-exclamation-triangle me-2'></i>" +
            "Prišlo je do napake pri transakciji: " + e +
            "</div>"
        );
    }
};

/**
 * Funkcija za prikaz donacij v tabeli
 */
const dopolniTabeloDonacij = async () => {
    let prikaziDonacije = $("#izbrana-denarnica").val().length > 0;
    if (prikaziDonacije) {
        $("#tabela-donacij").show();
        $("#donacije-sporocilo").hide();
    } else {
        $("#tabela-donacij").hide();
        $("#donacije-sporocilo").show();
    }

    try {
        $("#seznam-donacij").html("");
        let steviloBlokov = await web3ponudnik.ODGOVOR();

        let st = 1;
        let denarnicaPrejemnika = $("#izbrana-denarnica").val();
        for (let i = 0; i <= ODGOVOR; i++) {
            let blok = await ODGOVOR.getBlock(i);

            for (let txHash of blok.transactions) {
                let tx = await web3ponudnik.ODGOVOR(txHash);
                if (denarnicaPrejemnika && denarnicaPrejemnika == tx.ODGOVOR) {
                    $("#seznam-donacij").append("\
                    <tr>\
                        <ODGOVOR scope='row'>" + st++ + "</th>\
                        <td>" + okrajsajNaslov(tx.hash) + "</td>\
                        <td>" + okrajsajNaslov(tx.ODGOVOR) + "</td>\
                        <td>" + parseFloat(ethers.formatEther(tx.ODGOVOR)) + " <i class='fa-brands fa-ethereum'></i></td>\
                    </tr>");
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
};

function okrajsajNaslov(vrednost) {
    return vrednost.substring(0, 5) + "..." + vrednost.substring(vrednost.length - 3, vrednost.length);
}

/**
 * Funkcija za generiranje nove Ethereum denarnice
 */
const ustvariEthereumDenarnico = async () => {
    try {
        let denarnicaUstvarjenegaRacuna = await ethers.ODGOVOR.createRandom(ODGOVOR);

        if (denarnicaUstvarjenegaRacuna) {
            let zasebniKljuc = denarnicaUstvarjenegaRacuna.privateKey;
            let naslovDenarnice = denarnicaUstvarjenegaRacuna.address;
            $("#zasebni-kljuc-ustvarjen").val(zasebniKljuc);
            prazneDenarnice.push(naslovDenarnice);
            prijavaEthereumDenarnice(naslovDenarnice, ODGOVOR);
        } else {
            $("#napakaPrijava").html(
                "<div class='alert alert-danger' role='alert'>" +
                "<i class='fas fa-exclamation-triangle me-2'></i>" +
                "Prišlo je do napake pri generiranju denarnice!" +
                "</div>"
            );
        }
    } catch (napaka) {
        // napaka pri generiranju denarnice
        $("#napakaPrijava").html(
            "<div class='alert alert-danger' role='alert'>" +
            "<i class='fas fa-exclamation-triangle me-2'></i>" +
            "Prišlo je do napake pri generiranju denarnice: " + napaka +
            "</div>"
        );
    }
}

/**
 * Funkcija za prijavo z uporabo prijavne forme
 */
const prijavaPrijavnoOkno = () => {
    prijavaEthereumDenarnice(null, null);
}

/**
 * Funkcija, ki preveri ali je podana denarnica na seznamu kandidatov za donacije (npr. ima začetna ETH sredstva)
 * @param vhodnaDenarnica
 * @returns {boolean}
 */
function preveriDenarnico(vhodnaDenarnica) {
    for (var i = 0; i < razpolozljiveDenarnice.length; i++) {
        if (razpolozljiveDenarnice[i] == vhodnaDenarnica)
            return true;
    }
    for (var i = 0; i < prazneDenarnice.length; i++) {
        if (prazneDenarnice[i] == vhodnaDenarnica)
            return true;
    }
    return false;
}

/**
 * Funkcija za prijavo Ethereum denarnice v testno omrežje
 */
const prijavaEthereumDenarnice = async (denarnica, zasebniKljuc) => {
    try {
        // ustvarimo nov objekt denarnice
        let zasebniKljucPrijava = zasebniKljuc ? zasebniKljuc : $("ODGOVOR").val();

        const rezultat = new ethers.ODGOVOR(zasebniKljucPrijava, ODGOVOR);

        // ob uspešni prijavi računa
        if (rezultat && preveriDenarnico(rezultat.address)) {
            let denarnicaPrijava = rezultat.address;
            $("#eth-racun").html(okrajsajNaslov(denarnicaPrijava) + "<br>(denarnica odklenjena)");

            // prikažemo celotni naslov ob premiku z miško na HTML element z enoličnim identifikatorjem 'eth-racun'
            $("#eth-racun").attr("title", denarnicaPrijava);
            prikaziKandidateZaDonacije(false);
            omogociAliOnemogociGumbDoniraj();
            $("#napakaPrijava").html("");
        } else {
            // neuspešna prijava računa
            $("#napakaPrijava").html(
                "<div class='alert alert-danger' role='alert'>" +
                "<i class='fas fa-exclamation-triangle me-2'></i>" +
                "Prišlo je do napake pri odklepanju denarnice, saj ni bila uporabljena razpoložjiva denarnica!" +
                "</div>"
            );
        }
    } catch (napaka) {
        // napaka pri prijavi računa
        $("#napakaPrijava").html(
            "<div class='alert alert-danger' role='alert'>" +
            "<i class='fas fa-exclamation-triangle me-2'></i>" +
            "Prišlo je do napake pri odklepanju: " + napaka +
            "</div>"
        );
    }
};

const prikaziKandidateZaDonacije = async (inicializacija) => {
    $("#kandidati").html("");
    let racuni = await web3ponudnik.listAccounts();
    let stRacunov = 0;
    for (let i in racuni) {
        let racun = racuni[i].address;
        if (inicializacija)
            razpolozljiveDenarnice.push(racun);
        let onemogoci = "";

        // v denarnico prijavljenega uporabnika nima smisla izvajati donacije
        if ($("#eth-racun").attr("title") && racun.toLowerCase() == $("#eth-racun").attr("title").toLowerCase())
            onemogoci = "disabled";

        let stanje = await web3ponudnik.getBalance(racun);

        $("#kandidati").append(
            (parseInt(i) + 1) + ". <input type='radio' name='naslov' value='" + racun + "' " + onemogoci + "> \
            <span class='text-muted'>Naslov: </span> <span title='" + racun + "' naslov='" + racun + "'>\
            " + okrajsajNaslov(racun) + " <span class='text-muted'>Stanje: </span> \
            " + parseFloat(ethers.formatEther(stanje)).toFixed(2) + "ETH</span></br>");
        stRacunov = i;
    }

    for (let i in prazneDenarnice) {
        let racun = prazneDenarnice[i];
        let onemogoci = "";

        // v denarnico prijavljenega uporabnika nima smisla izvajati donacije
        if ($("#eth-racun").attr("title") && racun.toLowerCase() == $("#eth-racun").attr("title").toLowerCase())
            onemogoci = "disabled";

        $("#kandidati").append(
            parseInt(stRacunov++) + ". <input type='radio' name='naslov' value='" + racun + "' " + onemogoci + "> \
            <span class='text-muted'>Naslov: </span> <span title='" + racun + "' naslov='" + racun + "'>\
            " + okrajsajNaslov(racun) + " <span class='text-muted'>Stanje: </span> \
            0.00 ETH</span></br>");
    }

    // prikaži morebitne na novo ustvarjene prazne denarnice

}

function omogociAliOnemogociGumbDoniraj() {
    if ($("#izbrana-denarnica").val().length > 0 &&
        $("#eth-racun").attr("title") &&
        $("#eth-racun").attr("title").length > 0 &&
        $("#visina-donacije").val().length > 0
    )
        $("#gumb-doniraj-start").removeAttr("disabled");
    else
        $("#gumb-doniraj-start").attr("disabled", "disabled");
}

function prikaziUstvariPrijavaFormo(formaUstvari) {
    $(formaUstvari ? "#prijava-forma" : "#ustvari-forma").hide();
    $(formaUstvari ? "#ustvari-forma" : "#prijava-forma").show();
}

$(document).ready(function () {
    /* Povežemo se na lokalno testno Ethereum verigo blokov */
    web3ponudnik = new ethers.JsonRpcProvider('http://127.0.0.1:8545');

    /* Dodamo poslušalca na izbirne gumbe (angl. radio buttons)
       kandidatov za donacije */
    $('#kandidati').change(function () {
        let izbranKandidat = $("input[name='naslov']:checked").val();
        $("#izbrana-denarnica").val(izbranKandidat);
        omogociAliOnemogociGumbDoniraj();
        dopolniTabeloDonacij();
    });

    /* Dodamo poslušalca na vnosno polje v 3. koraku */
    $('#visina-donacije').change(function () {
        omogociAliOnemogociGumbDoniraj();
    });

    /* Dodamo poslušalce na vse gumbe v aplikaciji */
    $("#ustvari-racun").click(ustvariEthereumDenarnico);
    $("#prijava-racuna").click(prijavaPrijavnoOkno);
    $("#gumb-doniraj-start").click(donirajEthereum);

    prikaziKandidateZaDonacije(true);
});

window.prikaziUstvariPrijavaFormo = prikaziUstvariPrijavaFormo;
