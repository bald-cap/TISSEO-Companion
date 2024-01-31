//AFFICHAGE SUR LE SITE


//REQUETES XHR

//Défi 1.3 ->
//Affichage de tous les Lignes


let bouton = document.querySelector(`.display`)
let retour = document.querySelector(`.retour`)
let section = document.createElement(`section`)
let body = document.querySelector(`body`)
let label = document.querySelector(`label`)

function afficherDonnee(lignes){
    let listWrapper = document.createElement(`ol`)
    listWrapper.className = `list-wrapper`;
    listWrapper.style.display = `none`;

        for (const{shortName, id} of lignes){
            let liElement = document.createElement(`li`)
            let newBouton = document.createElement(`button`)
            
            //A modifier pour acceder l'ID pour ensuite l'afficher à l'utilisateur 
            
            newBouton.textContent = `${shortName}`
            newBouton.className = `lines`
            
            newBouton.addEventListener(`click`, ()=>{
                fetchStopsLine(`${id}`)
                // console.log(`${id}`)
            })
            liElement.className = `list`
            liElement.appendChild(newBouton)
            listWrapper.appendChild(liElement)
        } 
    section.appendChild(listWrapper)
    body.appendChild(section)   
    

    bouton.addEventListener('click', ()=>{
        bouton.style.display = `none`
        retour.style.display = `flex`
        label.style.display = `none`;

        listWrapper.style.display = `flex`
    })

    retour.addEventListener('click', ()=>{
        bouton.style.display = `flex`;
        retour.style.display = `none`;
        label.style.display = `flex`;

        listWrapper.style.display = `none`;
    })
}


// Requete pour avoir tous les Lignes proposés

const xhr = new XMLHttpRequest()
xhr.open("GET", "https://api.tisseo.fr/v2/lines.json?key=a3732a1074e2403ce364ad6e71eb998cb")
xhr.onreadystatechange = function(){
    if (xhr.status === 200 && xhr.readyState === 4){
        let reponse = JSON.parse(xhr.responseText)
        let lignes = reponse.lines.line
        // console.log(lignes)
        afficherDonnee(lignes)
    }
}

xhr.send()



// Requete pour recuperer les arrets d'une ligne en question
function fetchStopsLine(lineNb){
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "https://api.tisseo.fr/v2/stop_points.json?key=a3732a1074e2403ce364ad6e71eb998cb&lineId=" + `${lineNb}`)
    xhr.onreadystatechange = () =>{
        if (xhr.status === 200 && xhr.readyState === 4){
            let reponse = JSON.parse(xhr.responseText)
            // console.log(xhr.responseText)
            let arrets = reponse.physicalStops.physicalStop

            console.log(arrets)
             showArrets(arrets)
        }
    }

    xhr.send()
}

//A modifier
function showArrets(arrets){

    let listWrapper = document.querySelector('.stops-wrapper');

    if (!listWrapper) {
        listWrapper = document.createElement('ol');
        listWrapper.className = `stops-wrapper`;
        document.querySelector(`.list-wrapper`).appendChild(listWrapper);
    }

    listWrapper.innerHTML = ``;

    for (const arret of arrets){
        let liElement = document.createElement(`li`)
        
        //A modifier pour acceder l'ID pour ensuite l'afficher à l'utilisateur 
        
        liElement.className = `list`
        liElement.textContent = arret.name
        listWrapper.appendChild(liElement)
    } 

    listWrapper.style.display = 'flex';
        
}
