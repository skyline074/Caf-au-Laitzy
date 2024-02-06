// Récupération des données
let ajouterButton = document.getElementById("ajouterButton");
let inputNom = document.getElementById("nom");
let inputQuantite = document.getElementById("quantite");
let inputPrixAchat = document.getElementById("prixAchat");
let inputPrixVente = document.getElementById("prixVente");
let selectType = document.getElementById("type");
// Création variables pour le tableau
let stockBody = document.getElementById("stockBody");
let filterButton = document.querySelector(".filterButton");
let rechercherInput = document.getElementById("rechercher");



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
        case "Soft":
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

        let marge = (informations.informationPrixVente - informations.informationPrixAchat).toFixed(2);
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
        tdPrixAchatTotal.textContent = (informations.informationPrixAchat * informations.informationQuantite).toFixed(2) + ` €`;
        tdPrixVente.textContent = `${informations.informationPrixVente} €`;
        tdPrixVenteTotal.textContent = (informations.informationPrixVente * informations.informationQuantite).toFixed(2) + `€`;
        tdMarge.textContent = `${marge} €`;
        tdPrixVenteTTC.textContent = `${prixVenteTTC} €`;
        tdPrixVenteTTCTotal.textContent = (prixVenteTTC * informations.informationQuantite).toFixed(2) + ` €`;


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

         // Création d'un input pour modifier le prix
         let editPriceInput = document.createElement("input");
         editPriceInput.type = "number";
         editPriceInput.placeholder = "Enter new price";
         editPriceInput.style.display = "none"; // Hide initially
         tdPrixVente.appendChild(editPriceInput);
 
         // Mofifier et sauvegarder le prix
         let editSaveButton = document.createElement("button");
         editSaveButton.innerText = "Modifier le prix de vente";
         tr.appendChild(editSaveButton);
 
         editSaveButton.style.padding = "5px";
         editSaveButton.style.height = "63px";
         editSaveButton.style.marginLeft = "10px";
 
         editSaveButton.addEventListener("click", function () {
             if (editSaveButton.innerText === "Modifier le prix de vente") {
                 // Switch to edit mode
                 editSaveButton.innerText = "Enregistrer";
                 editPriceInput.style.display = "block";
             } else {
                 let newPrice = parseFloat(editPriceInput.value);
 
                 if (!isNaN(newPrice) && newPrice >= 0) {
                     informations.informationPrixVente = newPrice;
                     localStorage.setItem("stockArray", JSON.stringify(stockArray));
                     renderArray(stockArray);
                     editSaveButton.innerText = "Modifier le prix de vente";
                     editPriceInput.style.display = "none";
                 } else {
                     alert("Merci d'entrer un chiffre valide et non-négatif");
                 }
             }
         });
 
          // Boutton supprimer
       let supprimerButton = document.createElement("button");
       supprimerButton.innerText = "Supprimer le produit du stock";
       tr.appendChild(supprimerButton);

       supprimerButton.style.padding = "10px";
       supprimerButton.style.height = "63px"
       supprimerButton.style.background = "grey"
       supprimerButton.style.color = "white"

       supprimerButton.addEventListener("click", function () {
           tr.remove();
           stockArray.splice(index, 1);
           localStorage.setItem("stockArray", JSON.stringify(stockArray));
           renderArray(stockArray)
           alert('Le produit a bien été retiré du stock')
       });

        // Boutons incrémenter et décrémenter
        let incrementButton = document.createElement("button");
        incrementButton.innerText = "+";
        incrementButton.style.padding = "5px"
        incrementButton.style.marginRight = "5px"
        incrementButton.style.marginLeft = "20px"
        tdQuantite.appendChild(incrementButton);

        let decrementButton = document.createElement("button");
        decrementButton.innerText = "-";
        decrementButton.style.padding = "5px"
        tdQuantite.appendChild(decrementButton);

        // Événement pour incrémenter la quantité
        incrementButton.addEventListener("click", function () {
            informations.informationQuantite++;
            localStorage.setItem("stockArray", JSON.stringify(stockArray));
            renderArray(stockArray);
        });
        
        // Événement pour décrémenter la quantité (avec vérification pour éviter les quantités négatives)
        decrementButton.addEventListener("click", function () {
            if (informations.informationQuantite > 0) {
                informations.informationQuantite--;
                localStorage.setItem("stockArray", JSON.stringify(stockArray));
                renderArray(stockArray);
            }
        });
         
        // Condition si la quantité est inférieur à 10
        if (informations.informationQuantite < 10) {
            tdQuantite.style.background = "red";
        } else {
            tdQuantite.style.background = "green"
        }

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

// Quand je clique sur le bouton filter
filterButton.addEventListener("click", function () {
    // Je stock à l'intérieur de la variable contactArrayFilter le resultat retourné de la méthode filter
    let stockArrayFilter = stockArray.filter(function (informations) {
        // Je vais retourner dans contactArrayFilter le les informations du nom ou du type qui correspond à l'inputValue
        return informations.informationNom.toLowerCase().includes(rechercherInput.value.toLowerCase()) ||
        informations.informationType.toLowerCase().includes(rechercherInput.value.toLowerCase())      
    })

    // J'affiche le tableau des contactFiltré avec le paramètre contactArrayFilter
    renderArray(stockArrayFilter);
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

