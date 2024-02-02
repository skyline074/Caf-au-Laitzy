
function ajouterProduit() {
    let nom = document.getElementById("nom").value;
    let quantite = document.getElementById("quantite").value;
    let prixAchat = document.getElementById("prixAchat").value;
    let prixVente = document.getElementById("prixVente").value;
    let type = document.getElementById("type").value;
    // let degreAlcool = document.getElementById("degreAlcool").value;

    let marge = prixVente- prixAchat;

    let prixVenteTTC = calculerPrixVenteTTC(prixVente, type);


    if (isNaN(prixVenteTTC)) {
        alert("Veuillez calculer le Prix de vente TTC avant d'ajouter le produit.");
        return;
    }


    let produit = {
        nom: nom,
        quantite: quantite,
        prixAchat: prixAchat,
        prixVente: prixVente,
        prixVenteTTC: prixVenteTTC,
        type: type,
        // degreAlcool: degreAlcool,
        marge: marge,
    };


    let produitJSON = JSON.stringify(produit);
    localStorage.setItem(nom, produitJSON);


    let stockBody = document.getElementById("stockBody");
    let tr = document.createElement("tr");
    let tdNom = document.createElement("td");
    tdNom.textContent = nom;
    let tdQuantite = document.createElement("td");
    tdQuantite.textContent = quantite;
    let tdTypeProduit = document.createElement("td");
    tdTypeProduit.textContent = type;
    let tdPrixAchat = document.createElement("td");
    tdPrixAchat.textContent = `${prixAchat} €`;
    let tdPrixAchatTotal = document.createElement("td");
    tdPrixAchatTotal.textContent = `${prixAchat * quantite} €`;
    let tdPrixVente = document.createElement("td");
    tdPrixVente.textContent = `${prixVente} €`;
    let tdPrixVenteTotal = document.createElement("td");
    tdPrixVenteTotal.textContent = `${prixVente * quantite} €`;
    let tdMarge = document.createElement("td");
    tdMarge.textContent = `${marge} €`;
    let tdPrixVenteTTC = document.createElement("td");
    tdPrixVenteTTC.textContent = `${prixVenteTTC} €`;
    let tdPrixVenteTTCTotal = document.createElement("td");
    tdPrixVenteTTCTotal.textContent = `${prixVenteTTC * quantite} €`
    


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


    stockBody.appendChild(tr);
}


function calculerPrixVenteTTC(prixVente, type) {
    let tauxTVA;

    switch (type) {
        case "Boisson alcoolisée":
            tauxTVA = 0.2; // 20%
            break;
        case "Boisson non alcoolisée":
            tauxTVA = 0.2; // 20%
            break;
        case "Autre":
            tauxTVA = 0.2; // 20%
            break;
        default:
            tauxTVA = 0;
    }


    let prixVenteTTC = parseFloat(prixVente) * (1 + tauxTVA);
    return prixVenteTTC.toFixed(2);
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

