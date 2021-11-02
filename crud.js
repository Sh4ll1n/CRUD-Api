
$(document).ready(function () {

    $('form').submit(function () {
        console.log('form submited !');

        getData();
    })
})

function getData() {
    var prenom  = document.querySelector('#prenom').value;
    var nom  = document.querySelector('#nom').value;
    var email  = document.querySelector('#email').value;

    insertStudent(prenom,nom,email)
}

function insertStudent(firstname, lastname,mail) {
    //VERSION CHAIMA
    // var table = document.getElementsByTagName('table')[0];
    // var nouvelleLigne = table.insertRow(table.rows.length);

    var table = document.querySelector('.table');
    var nouvelleLigne = table.insertRow();

    nouvelleLigne.insertCell(0).innerHTML = 1;
    nouvelleLigne.insertCell(1).innerHTML = firstname;
    nouvelleLigne.insertCell(2).innerHTML = lastname;
    nouvelleLigne.insertCell(3).innerHTML = mail;
    nouvelleLigne.insertCell(4).innerHTML = "<i class='bi bi-pencil-square'></i>";
    nouvelleLigne.insertCell(5).innerHTML = "<i class='bi bi-trash'></i>";
}
