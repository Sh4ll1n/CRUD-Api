
$(document).ready(function () {
    //Cacher la liste au chargement de la page
    $('.liste').hide();
    
    $('form').submit(function () {
        console.log('form submited !');
        getData();
        //Affichage de la liste apres soumission 
        $('.liste').show();
        
        $('input').val('');

        //AUTRE VERSION
        //$("form").get(0).reset()
    })
})

function getData() {
    var prenom  = document.querySelector('#prenom').value;
    var nom  = document.querySelector('#nom').value;
    var email  = document.querySelector('#email').value;

    if (verifMail(email) == false) {
        $('.erreur').html('Le mail existe deja');
        $('.erreur').removeClass('d-none');
    }else{
        insertStudent(prenom,nom,email)
    }
}

function insertStudent(firstname, lastname,mail) {
    //VERSION CHAIMA
    // var table = document.getElementsByTagName('table')[0];
    // var nouvelleLigne = table.insertRow(table.rows.length);
$('.envoie').text("AJout");
    var table = document.querySelector('.table');
    var nouvelleLigne = table.insertRow();

    console.log(table.rows.length);

    var compteur = table.rows.length-1;

    nouvelleLigne.insertCell(0).innerHTML = compteur;
    nouvelleLigne.insertCell(1).innerHTML = firstname;
    nouvelleLigne.insertCell(2).innerHTML = lastname;
    nouvelleLigne.insertCell(3).innerHTML = mail;
    nouvelleLigne.insertCell(4).innerHTML = "<i class='bi bi-pencil-square' id='"+compteur+"' onclick='modif(this);'></i>";
    nouvelleLigne.insertCell(5).innerHTML = "<i class='bi bi-trash'></i>";
}


//Verification email

function verifMail(email) {
    var table = document.querySelector('.table');

    var nbreLigne = table.rows.length;

    for (let index = 1; index < nbreLigne; index++) {
        var email_liste = table.getElementsByTagName('tr')[index].cells[3].innerHTML;
    
        if (email_liste == email) {
            return false;
        }
    }
}

function modif(params) {
     var table = $('.table tr')[params.id];

     $('#prenom').val(table.cells[1].innerHTML)
     $('#nom').val(table.cells[2].innerHTML)
     $('#email').val(table.cells[3].innerHTML)

     //table.remove();

     //VERSION QUENTIN
    //  $('#prenom').val($(table.cells[1]).text())
    //  $('#nom').val($(table.cells[2]).text())
    //  $('#email').val($(table.cells[3]).text())
}