// :)

const now = new Date()
console.log('now', now)

// fase iniziale: dobbiamo cercare di capire IN CHE MESE SIAMO, per riempire l'h1, e anche quanti giorni ha il mese corrente
// perchè dobbiamo generare un numero di celle corrispondente.
// Ogni volta che apriremo il calendario vogliamo una fedele rappresentazione del mese corrente

const monthNames = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
]

const printCurrentMonthInH1 = function () {
  const title = document.querySelector('h1') // prendo l'<h1> dalla pagina
  const monthIndex = now.getMonth() // 8 perchè siamo in settembre
  const currentMonth = monthNames[monthIndex] // "Settembre"
  console.log('mese corrente', currentMonth)
  title.innerText = currentMonth // riporto la stringa del mese nell'h1
}

// ora che sappiamo in che mese siamo, dobbiamo calcolarne il numero dei giorni...
// per riempire correttamente la sezione delle celle

const daysInThisMonth = function () {
  const getYear = now.getFullYear() // 2023

  const getMonth = now.getMonth() // 8

  // quello di cui ho bisogno è l'ULTIMO giorno valido del mese in corso
  // perchè tale numero corrisponde anche al NUMERO DEI GIORNI del mese corrente!

  // per ottnere l'ultimo giorno valido del mese in corso, creo una data
  // relativa al primo giorno del mese successivo rispetto a quello corrente, e -tolgo- un giorno

  const lastDayInTheMonth = new Date(getYear, getMonth + 1, 0) // -> 0 ottobre 2023 === 30 settembre 2023
  console.log('lastDayInTheMonth', lastDayInTheMonth)
  const numberOfTheDay = lastDayInTheMonth.getDate() // prende il giorno del mese da una specifica data
  console.log('numberOfTheDay', numberOfTheDay)
  // numberOfTheDay è il numero di giorno del mese corrente, ovvero il numero di volte per cui dovrò ripetere
  // la creazione in JS di una cella "giorno"
  return numberOfTheDay
}

const createDays = function (numberOfDays) {
  // numerOfDays adesso è 30 (in settembre)
  const calendarDiv = document.getElementById('calendar')
  for (let i = 0; i < numberOfDays; i++) {
    // per ogni giorno del mese corrente...
    // creo una cella
    const dayCellDiv = document.createElement('div')
    // <div></div>
    dayCellDiv.classList.add('day')
    // <div class="day"></div>
    const cellValue = document.createElement('h3')
    // <h3></h3>
    cellValue.innerText = i + 1

    // appendiamo cellValue dentro dayCellDiv
    dayCellDiv.appendChild(cellValue) // <div class="day"><h3>1</h3></div>, appendo il value alla cella del giorno
    calendarDiv.appendChild(dayCellDiv) // appendo la cella del giorno al calendario
  }
}

printCurrentMonthInH1()
const numberOfDaysInTheCurrentMonth = daysInThisMonth() // 30

createDays(numberOfDaysInTheCurrentMonth)

// 1° settembre
// "14:30 - Q&A"
// "17:00 - DEBRIEF"
// "20:00 - CENA FS0423"

// ogni giorno del mese è un array di stringhe --> ["14:30 - Q&A", "17:00 - DEBRIEF", "20:00 - CENA FS0423"]

// [
//   [], [], [], [], [], [], [], [], [],
//   [], [], [], [], [], [], [], [], [],
//   [], [], [], [], [], [], [], [], []
//   [], [], []
// ]
