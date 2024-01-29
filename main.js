//AFFICHAGE SUR LE SITE


//REQUETES XHR

//Défi 1.3 ->
//Affichage de tous les Lignes

let bouton = document.querySelector(".display")
let retour = document.querySelector(".retour")
let section = document.createElement("section")
let body = document.querySelector("body")

function afficherDonnee(lignes){
    bouton.addEventListener('click', ()=>{
        if (bouton.style.display === "flex"){
            bouton.style.display = "none"
            retour.style.display = "flex"
        
            let listWrapper = document.createElement("ol")
            for (let l = 0; l < lignes.length; l++){
                let liElement = document.createElement("li")
                liElement.className = "list"
                liElement.textContent = lignes[l].id
                listWrapper.appendChild(liElement)
            } 
            section.appendChild(listWrapper)
            body.appendChild("body")
        } else{
            bouton.style.display = "flex"
            retour.style.display = "none"
        }
        
    })

}

// Requete pour avoir tous les Lignes proposés
const xhr = new XMLHttpRequest()
xhr.open("GET", "https://api.tisseo.fr/v2/lines.json?key=a3732a1074e2403ce364ad6e71eb998cb")
xhr.onreadystatechange = function(){
    if (xhr.status === 200 && xhr.readyState === 4){
        let reponse = JSON.parse(xhr.responseText)
        let lignes = reponse.lines.line
        afficherDonnee(lignes)
        console.log(lignes)
    }

}
