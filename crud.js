
$(document).ready(function () {
    //Cacher la liste au chargement de la page
    $('.liste').hide();
    
    $('form').submit(function () {
        console.log('form submited !');
        getData();
        //Affichage de la liste apres soumission 
        $('.liste').show();
        
        $('input').val('');
        chercher();
        
    })
});

function getData() {
    var food  = document.querySelector('#food').value;
    var grammes  = document.querySelector('#gr').value;
    

    if (verifFood(food) == false) {
        $('.erreur').html('Tu as deja entrer cet aliment');
        $('.erreur').removeClass('d-none');
    }else{
        insertFood(food,grammes)
    }
};

function insertFood(food,grammes) {
    
    $('.envoie').text("Ajout");
    var table = document.querySelector('.table');
    var nouvelleLigne = table.insertRow();

    console.log(table.rows.length);

    var compteur = table.rows.length-1;

    nouvelleLigne.insertCell(0).innerHTML = compteur;
    nouvelleLigne.insertCell(1).innerHTML = food;
    nouvelleLigne.insertCell(2).innerHTML = grammes;
    //nouvelleLigne.insertCell(3).innerHTML = Proteines;
    //nouvelleLigne.insertCell(4).innerHTML = Glucides;
    //nouvelleLigne.insertCell(5).innerHTML = Lipides;
    nouvelleLigne.insertCell(3).innerHTML = "<i class='bi bi-pencil-square' id='"+compteur+"' onclick='modif(this);'></i>";
    nouvelleLigne.insertCell(4).innerHTML = "<i class='bi bi-trash' id='"+compteur+"' onclick='suppr(this);'></i>";
};


//Verification email

function verifFood(food) {
    var table = document.querySelector('.table');

    var nbreLigne = table.rows.length;

    for (let index = 1; index < nbreLigne; index++) {
        var aliment_liste = table.getElementsByTagName('tr')[index].cells[1].innerHTML;
    
        if (aliment_liste == food) {
            return false;
        }
    }
};

function modif(params) {
     var table = $('.table tr')[params.id];

     $('#food').val(table.cells[1].innerHTML)
     table.remove();

     
};


function chercher(){
    var food = $('#food').val();
    console.log(food);
    $.ajax({
        //url:"https://www.data.gouv.fr/fr/datasets/r/f376ba2b-77da-4309-8fc2-413faaa8a122",
        url:"https://world.openfoodfacts.org/api/v0/product/737628064502.json",
        dataType:'json',
        success:function (data){
            console.log(data);   
        },
        error:function(xhr){
            console.log(xhr.status);
        }
    })
};