//initialisation des regex pour les contrôles des noms, prénoms, mails et telephones
var regexName = /^([a-zA-Z\u00C0-\u017F\s\-])+$/;
var regexMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;
var regexTel = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

//initialisation des variables pour la récupération des données
var firstname = $("#firstName");
var lastname = $("#lastName");
var email = $("#email");
var tel = $("#telephone");

//vérification de saisie
firstname.keyup(function () {
    if(!regexName.test($(this).val())){
        $(this).focus();
        $("#erreurPrenom").css("display", "block");
        return false;
    }else {
        $("#erreurPrenom").css("display", "none");
    }
})
lastname.keyup(function () {
    if(!regexName.test($(this).val())){
        $(this).focus();
        $("#erreurNom").css("display", "block");
        return false;
    }else {
        $("#erreurNom").css("display", "none");
    }
})
email.keyup(function () {
    if (!regexMail.test($(this).val()) ){
        $(this).focus();
        $("#erreurMail").css("display", "block");
        return false;
    }else {
        $("#erreurMail").css("display", "none");
    }
})
tel.keyup(function() {
    if (!regexTel.test($(this).val())) {
        $(this).focus();
        $("#erreurTel").css("display", "block");
        return false;
    }else {
        $("#erreurTel").css("display", "none");
    }
})

//initialization du compteur de lignes de la liste d'étudiants et d'id
var nbrLigne = 0;
var index = null;
$("#formulaire").submit(function (e) {
    //on empêche laa page de se rafraichir automatiquement
    e.preventDefault();
    
    //si le bouton d'envoie du formulaire est à "modifier", grâce à la variable index, on récupère les données de la ligne à modifier et on les remplace par la nouvelle. L'id de la ligne est bien conservé.
    if ($("#btnajoutmodif").html() == "Modifier") {
        $('#'+index+" .tdlastname").text(lastname.val());
        $('#'+index+" .tdfirstname").text(firstname.val());
        $('#'+index+" .tdemail").text(email.val());
        $('#'+index+" .tdtel").text(tel.val());

        $("#btnajoutmodif").html("Ajouter");
        clearForm();
    }else{
        //incrémentation du compteur
        nbrLigne++;
    
        //à chaque click, on ajoute une ligne du tableau ainsi que les données rentrées dans le formulaire et on lui attribue un id.
        $("#listeEtudiants").append(
            '<tr id="'+(nbrLigne-1)+'">'+
                '<td>'+nbrLigne+'</td>'+
                '<td class="tdlastname">'+lastname.val()+'</td>'+
                '<td class="tdfirstname">'+firstname.val()+'</td>'+
                '<td class="tdemail">'+email.val()+'</td>'+
                '<td class="tdtel">'+tel.val()+'</td>'+
                '<td>'+
                    '<button type="button" class="btn btn-secondary btnedition" onclick="editStudents(this);">'+
                        '<i class="bi bi-pencil-square">'+
                        '</i>'+
                    '</button>'+
                '</td>'+
                '<td>'+
                    '<button type="button" class="btn btn-secondary btnsuppression" onclick="appearsModal(this);">'+
                        '<i class="bi bi-trash">'+
                        '</i>'+
                    '</button>'+
                '</td>'+
            '</tr>'
        );
        clearForm();
    }
})

//fonction qui permet de vider les lignes après envoie
function clearForm() {
    lastname.val("");
    firstname.val("");
    email.val("");
    tel.val("");
}

//variable pour stocker la ligne à modifier
var storageLine = null;

//Fonction d'édition de ligne: on récupère la ligne ciblée par la modification avec storagaligne et on récupère et stocke l'index de la ligne avec la variable index. On récupère avec colonne chaque td de la ligne pour les remettre dans les bonnes cases du formulaire.
function editStudents(ctl) {
    $("#btnajoutmodif").html("Modifier");
    storageLine = $(ctl).closest("tr");
    index = $(ctl).closest("tr").attr("id");
    var colonne = storageLine.children("td");
    lastname.val($(colonne[1]).text());
    firstname.val($(colonne[2]).text());
    email.val($(colonne[3]).text());
    tel.val($(colonne[4]).text());
}

//fonction de contrôle du modal de suppression: on fait apparaitre le modal, si click croix ou non, le modal disparait. Si click yes, la ligne est supprimée. La numérotation ne se réinitialise pas mais c'est normal, l'identifiant de l'étudiant doit rester unique. ;)
function appearsModal(ctl) {
    $("#staticBackdropLive").css("display", "block");
    $(".fermetureModal").click(function () {
        $("#staticBackdropLive").css("display", "none");
    })
    $("#suppressionLigne").click(function (){
        $(ctl).closest("tr").remove();
        $("#staticBackdropLive").css("display", "none");
    })    
}