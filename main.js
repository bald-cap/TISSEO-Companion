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

            // console.log(arrets)
             showArrets(arrets)
        }
    }

    xhr.send()
}

//Fonction qui affiche les arrets
function showArrets(arrets){

    let stopsWrapper = document.querySelector('.stops-wrapper');
    let stopsWrapperContainer = document.querySelector(`.stops-article-wrapper`)
    let returnImg = document.querySelector(`.stops-article-wrapper .return-img`)
    
    if (!stopsWrapper) {
        stopsWrapper = document.createElement('ol');
        stopsWrapper.className = `stops-wrapper`;
        document.querySelector(`section`).appendChild(stopsWrapper);
        stopsWrapperContainer.appendChild(stopsWrapper)
    }

    stopsWrapper.innerHTML = ``;

    for (const arret of arrets){
        let liElement = document.createElement(`li`)
        let stopBouton = document.createElement(`button`)
                
        liElement.className = `list`
        stopBouton.textContent = arret.name
        liElement.appendChild(stopBouton)
        stopsWrapper.appendChild(liElement)

        stopBouton.addEventListener(`click`, function(){
            fetchHoraire(`${arret.id}`)
        })
    } 

    if (stopsWrapper.style.display === `flex`){
        stopsWrapper.style.display = `none`;
        document.querySelector(`.list-wrapper`).style.display = `flex`
        
    } else{
        stopsWrapper.style.display = `flex`;
        retour.style.display = `none`

        document.querySelector(`.list-wrapper`).style.display = `none`
        returnImg.style.display = `flex`
        returnImg.addEventListener(`click`, () =>{
            retour.style.display = `flex`
            stopsWrapper.style.display = `none`;
            document.querySelector(`.list-wrapper`).style.display = `flex`
            returnImg.style.display = `none`
        })
    }
}

//Fonction qui affiche l'horaire du bus
function fetchHoraire(id){
    let xhr = new XMLHttpRequest()
    xhr.open('GET', "https://api.tisseo.fr/v2/stops_schedules.json?key=a3732a1074e2403ce364ad6e71eb998cb&stopPointId=" + `${id}`)
    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4){
            let response = JSON.parse(xhr.responseText)
            console.log(response.departures.departure)
            showHoraire(response.departures.departure)
        }
    }

    xhr.send()
}

function showHoraire(horaires){
    let horaireArticleWrapper = document.querySelector('.horaire-article-wrapper');
    let horaireWrapper = document.querySelector(`.horaire-wrapper`)
    let returnImg = document.querySelector(`.horaire-article-wrapper .return-img`)
    
    if (!horaireWrapper) {
        horaireWrapper = document.createElement('ol');
        horaireWrapper.className = `horaire-wrapper`;
        horaireArticleWrapper.appendChild(horaireWrapper);
    }

    horaireWrapper.innerHTML = ``;

    for (const horaire of horaires){
        let liElement = document.createElement(`li`)
        // let horaireBouton = document.createElement(`button`)
                
        liElement.className = `list`
        liElement.textContent = horaire.dateTime
        // liElement.appendChild(horaireBouton)
        horaireWrapper.appendChild(liElement)
    } 

    if (horaireArticleWrapper.style.display === `flex`){
        horaireArticleWrapper.style.display = `none`;
        document.querySelector(`.stops-article-wrapper`).style.display = `flex`
        
    } else{
        horaireArticleWrapper.style.display = `flex`;

        document.querySelector(`.stops-article-wrapper`).style.display = `none`
        returnImg.style.display = `flex`
        returnImg.addEventListener(`click`, () =>{
            horaireArticleWrapper.style.display = `none`;
            document.querySelector(`.stops-article-wrapper`).style.display = `flex`
            returnImg.style.display = `none`
        })
    }
}