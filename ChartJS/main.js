const ctxTag = document.querySelector(".Graph-1")
const ctx1 = ctxTag.getContext('2d')

const barData = {
    labels :["2018-19", "2019-20", "2020-21", "2021-22"],
    datasets:[{
        label: "Année d'Inscription",
        backgroundColor:["#0d0d0d", "#324f65", "#19a3b3","#65fbd2"],
        borderWidth: 2,
        borderColor: "#ffffff",
        data: [77, 69, 134, 148],
        hoverOffset: 3
    }],
}

let configBar = {
    type :'bar',
    data : barData,
    options: {
        responsive: true,
    }
}

const BarChart = new Chart(ctx1, configBar)

const ctxTag2 = document.querySelector(".Graph-2")
const ctx2 = ctxTag2.getContext('2d')

const lineData = {
    labels : ["2018-19", "2019-20", "2020-21", "2021-22"],
    datasets: [
                {
        label : "Nombre d’inscrits homme",
        data: [37, 37, 85, 90],
        backgroundColor : ["#0d0d0d", "#474554", "#aca9bb", "#34564b"],
        borderWidth : 2,
        hoverOffset: 4,   
        },
                {
        label: "Nombre d’inscrits femme",
        data: [40, 32, 49, 58],
        backgroundColor: ["#007d5c", "#00b38f", "#54ecc4", "#0d0d0d"],
        borderWidth : 2,
        hoverOffset :2
        }
    ]
}

const configLine = {
    type : "line",
    data : lineData,
    options: {}
}

const lineChart = new Chart(ctx2, configLine)

const ctxTag3 = document.querySelector(".Graph-3")
const ctx3 = ctxTag3.getContext('2d')

const barDataLine = {
    labels :["2018-19", "2019-20", "2020-21", "2021-22"],
    datasets:[{
        label: "Année d'Inscription",
        backgroundColor:["#0d0d0d", "#324f65", "#19a3b3","#65fbd2"],
        borderWidth: 2,
        borderColor: "#ffffff",
        data: [77, 69, 134, 148],
        // hoverOffset: 3
    }],
}

let configBarLine = {
    type :'line',
    data : barData,
    options: {
        responsive: true,
    }
}

const BarChartLine = new Chart(ctx3, configBarLine)

const btn1 = document.querySelector('#btn-barGraph')
const btn2 = document.querySelector('#btn-lineGraph')
const btn3 = document.querySelector('#btn-barGraph-mod')

const label1 = document.querySelector(".Graph-1-label")
const label2 = document.querySelector(".Graph-2-label")
const label3 = document.querySelector(".Graph-3-label")

btn1.addEventListener(`click`, function(){
    ctxTag.style.display = "flex"
    ctxTag2.style.display = "none"
    ctxTag3.style.display = "none"

    btn1.style.display = "none"
    btn2.style.display = "flex"
    btn3.style.display = "flex"

    label1.style.display = "flex"
    label2.style.display = "none"
    label3.style.display = "none"
})


btn2.addEventListener(`click`, function(){
    ctxTag2.style.display =  "flex"
    ctxTag.style.display =  "none"
    ctxTag3.style.display =  "none"

    btn2.style.display = "none"
    btn1.style.display = "flex"
    btn3.style.display = "flex"

    label2.style.display = "flex"
    label1.style.display = "none"
    label3.style.display = "none"
})

btn3.addEventListener(`click`, function(){
    ctxTag3.style.display =  "flex"
    ctxTag.style.display =  "none"
    ctxTag2.style.display =  "none"

    btn3.style.display = "none"
    btn1.style.display = "flex"
    btn2.style.display = "flex"

    label3.style.display = "flex"
    label1.style.display = "none"
    label2.style.display = "none"
})

