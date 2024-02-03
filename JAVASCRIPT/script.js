// Récupération des données
let ajouterButton = document.getElementById("ajouterButton");
let inputNom = document.getElementById("nom");
let inputQuantite = document.getElementById("quantite");
let inputPrixAchat = document.getElementById("prixAchat");
let inputPrixVente = document.getElementById("prixVente");
let selectType = document.getElementById("type");
// Création variables pour le tableau
let stockBody = document.getElementById("stockBody");


// 
let stockArray;
let id = 0;

// Fonction calculer prix Vente
function calculerPrixVenteTTC(inputPrixVente, selectType) {
    let tauxTVA;

    let prixVente = parseFloat(inputPrixVente)

    if (isNaN(prixVente)) {
        return "Invalid Prix de Vente";
    }

    switch (selectType) {
        case "Boisson alcoolisée":
        case "Boisson non alcoolisée":
        case "Autre":
            tauxTVA = 0.2; // 20%
            break;
        default:
            tauxTVA = 0;
    }

    let prixVenteTTC = prixVente * (1 + tauxTVA);
    return prixVenteTTC.toFixed(2);
}

// Fonction 
function renderArray(array) {

    stockBody.innerHTML =""; 

    array.forEach(function (informations, index) {

        let marge = informations.informationPrixVente - informations.informationPrixAchat;
        let prixVenteTTC = calculerPrixVenteTTC(informations.informationPrixVente, informations.informationType);

        let tr = document.createElement("tr");
        let tdNom = document.createElement("td");
        let tdQuantite = document.createElement("td");
        let tdTypeProduit = document.createElement("td");
        let tdPrixAchat = document.createElement("td");
        let tdPrixAchatTotal = document.createElement("td");
        let tdPrixVente = document.createElement("td");
        let tdPrixVenteTotal = document.createElement("td");
        let tdMarge = document.createElement("td");
        let tdPrixVenteTTC = document.createElement("td");
        let tdPrixVenteTTCTotal = document.createElement("td");

        tdNom.textContent = informations.informationNom;
        tdQuantite.textContent = informations.informationQuantite;
        tdTypeProduit.textContent = informations.informationType;
        tdPrixAchat.textContent = `${informations.informationPrixAchat} €`;
        tdPrixAchatTotal.textContent = `${informations.informationPrixAchat * informations.informationQuantite} €`;
        tdPrixVente.textContent = `${informations.informationPrixVente} €`;
        tdPrixVenteTotal.textContent = `${informations.informationPrixVente * informations.informationQuantite} €`;
        tdMarge.textContent = `${marge} €`;
        tdPrixVenteTTC.textContent = `${prixVenteTTC} €`;
        tdPrixVenteTTCTotal.textContent = `${prixVenteTTC * informations.informationQuantite} €`


        tr.appendChild(tdNom);
        tr.appendChild(tdQuantite);
        tr.appendChild(tdTypeProduit);
        tr.appendChild(tdPrixAchat);
        tr.appendChild(tdPrixAchatTotal);
        tr.appendChild(tdPrixVente);
        tr.appendChild(tdPrixVenteTotal);
        tr.appendChild(tdMarge);
        tr.appendChild(tdPrixVenteTTC);
        tr.appendChild(tdPrixVenteTTCTotal);


          // Boutton supprimer
       let supprimerButton = document.createElement("button");
       supprimerButton.innerText = "Supprimer";
       tr.appendChild(supprimerButton);

       supprimerButton.style.padding = "10px";
       supprimerButton.style.height = "70px"

       supprimerButton.addEventListener("click", function () {
           tr.remove();
           stockArray.splice(index, 1);
           localStorage.setItem("stockArray", JSON.stringify(stockArray));
           renderArray(stockArray)
           alert('Le produit a bien été retiré du stock')
       });

       stockBody.appendChild(tr);

    });

}




// Sauvegarde 
let stockSaved = JSON.parse(localStorage.getItem("stockArray"));
if (stockSaved) {
    stockArray = stockSaved;
} else {
    stockArray = [];
}
renderArray(stockArray)

// Evenement au click 
ajouterButton.addEventListener("click", function (event) {

    // Empêcher le message d'erreur
    event.preventDefault();

    if (inputNom.value !== "" && inputQuantite !== "" && inputPrixAchat.value !== "" && inputPrixVente !== "" && selectType.value !== "") {

        let informationsValue = new Informations(id++, inputNom.value, inputQuantite.value, inputPrixAchat.value, inputPrixVente.value, selectType.value)

        // Ajouter les valeurs saisies par les utilisateurs au tableau
        stockArray.push(informationsValue)

        // Récupération sauvegarde
        localStorage.setItem("stockArray", JSON.stringify(stockArray));

        // Vue sur l'évolution du tableau
        console.log(stockArray);

        // Exécuter la fonction
        renderArray(stockArray)

        // Remettre les cases vides une fois cliqué sur enregistrer
        inputNom.value = "";
        inputQuantite.value = "";
        inputPrixAchat.value = "";
        inputPrixVente.value = "";
        selectType.value = "";
    } else {
        alert("Merci de bien remplir tous les champs avant de cliquer sur sur 'Ajouter un produit'")
    }
})

// FONCTION CONSTRUCTEUR

function Informations(id, informationNom, informationQuantite, informationPrixAchat, informationPrixVente, informationType) {
    this.id = id;
    this.informationNom = informationNom;
    this.informationQuantite = informationQuantite;
    this.informationPrixAchat = informationPrixAchat;
    this.informationPrixVente = informationPrixVente;
    this.informationType = informationType;
}


function ajusterChamps() {
    let type = document.getElementById("type").value;
    let degreAlcoolLabel = document.getElementById("labelDegreAlcool");
    let degreAlcoolInput = document.getElementById("degreAlcool");


    if (type === "Boisson alcoolisée") {
        degreAlcoolLabel.style.display = "block";
        degreAlcoolInput.style.display = "block";
    } else {
        degreAlcoolLabel.style.display = "none";
        degreAlcoolInput.style.display = "none";
    }
}


function toggleTable() {
    var stockTable = document.getElementById("stockTable");
    var display = stockTable.style.display;
    stockTable.style.display = (display === "none") ? "table" : "none";
}

