$(document).ready(() => {
  $("#prijavaOdjavaGumb").click(() => {
    let idIzbraneStrankeAliVecStrank = $("#seznamStrank").val();

    window.location = idIzbraneStrankeAliVecStrank
      ? "/prijavaOdjava/" + idIzbraneStrankeAliVecStrank
      : "/prijavaOdjava/brezStranke";
  });
});
