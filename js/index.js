// :)

const now = new Date()
console.log('now', now)

// fase iniziale: dobbiamo cercare di capire IN CHE MESE SIAMO, per riempire l'h1, e anche quanti giorni ha il mese corrente
// perchè dobbiamo generare un numero di celle corrispondente.
// Ogni volta che apriremo il calendario vogliamo una fedele rappresentazione del mese corrente

// dove salvo gli appuntamenti? allora, ogni appuntamento è una stringa, ogni giorno può contenere infiniti appuntamenti,
// e ogni mese ha un numero variabile di giorni (28-31)

// il nostro scopo è creare un array di array, dove l'array "padre" è il mese e ogni array "figlio" rappresenta un giorno
// [
//   [], [], [], [], [], [], [], [], [],
//   [], [], [], [], [], [], [], [], [],
//   [], [], [], [], [], [], [], [], []
//   [], [], []
// ]

// esempio di giorno: 1° settembre
// "14:30 - Q&A"
// "17:00 - DEBRIEF"
// "20:00 - CENA FS0423"
// il 1° settembre è un array di stringhe --> ["14:30 - Q&A", "17:00 - DEBRIEF", "20:00 - CENA FS0423"]

// all'inizio però io NON SO quanti giorni ci sono ancora in questo mese! quindi creo solo il "guscio" del mese
const appointments = []
// ora dovrei pushare dentro appointements tanti "sotto-array" quanti sono i giorni del mese corrente

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

const unSelectAllDays = function () {
  // qua il mio compito è rimuovere eventuali altre classi "selected" precedentemente applicate
  // in modo da lasciare il campo "libero" per la successiva applicazione della nuova class "selected"
  // sull'elemento che ho cliccato..

  // APPROCCIO BULLDOZER
  // prendo TUTTE le celle, e a tappeto rimuovo un'eventuale classe "selected"
  //   const allTheCells = document.getElementsByClassName('day')
  //   const allTheCellsAsArray = Array.from(allTheCells) // ho convertito allTheCells in un vero e proprio array, perchè altrimenti
  //   // una semplice HTMLCollection NON È ciclabile attraverso forEach
  //   allTheCellsAsArray.forEach((cell) => {
  //     cell.classList.remove('selected')
  //   })

  // APPROCCIO CHIRURGICO
  //   const previousSelected = document.getElementsByClassName('selected')[0]
  const previousSelected = document.querySelector('.selected')
  if (previousSelected) {
    previousSelected.classList.remove('selected')
  }
}

const changeMeetingDaySection = function (indexOfTheDay) {
  // questa funzione si occupa di riempire la porzione "newMeetingDay" al click su di una cella
  const rightSpan = document.getElementById('newMeetingDay')
  rightSpan.classList.add('hasDay')
  rightSpan.innerText = indexOfTheDay + 1
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

    // ora, questa cella singola del giorno che ho appena creato, la rendo cliccabile!
    dayCellDiv.addEventListener('click', function (e) {
      // devo toglierla da altre precedenti
      unSelectAllDays()
      // ora che non ho più altri "selected" nel calendario, lo aggiungo alla cella che ho cliccato
      dayCellDiv.classList.add('selected')

      // l'ultima cosa che manca è trasportare il valore della cella che ho cliccato
      // in basso a sx, nella sezione "Meeting Day" (ovvero il div con id="newMeetingDay")
      changeMeetingDaySection(i)
    })

    const cellValue = document.createElement('h3')
    // <h3></h3>
    cellValue.innerText = i + 1

    // appendiamo cellValue dentro dayCellDiv
    dayCellDiv.appendChild(cellValue) // <div class="day"><h3>1</h3></div>, appendo il value alla cella del giorno
    calendarDiv.appendChild(dayCellDiv) // appendo la cella del giorno al calendario

    // ora che ho creato la parte "fisica" della pagina, inserisco anche un array dentro l'array appointments
    // per il giorno che sto ciclando
    appointments.push([]) // aggiungo un array vuoto per ogni giorno
  }
}

const handleFormSubmit = function (e) {
  e.preventDefault()
  console.log('il form sta venendo inviato!')
  // cosa facciamo adesso?
  // 1) raccogliamo il giorno selezionato
  // 2) raccolgo il meeting time dal form
  // 3) raccolgo il meeting name dal form
  // 4) combino time e name in una stringa tipo "17:00 - Debrief"
  // 5) inserisco questa stringa in uno degli array dentro appointments, in quello corrispondente al giorno selezionato
}

printCurrentMonthInH1()
const numberOfDaysInTheCurrentMonth = daysInThisMonth() // 30

createDays(numberOfDaysInTheCurrentMonth)

const meetingForm = document.querySelector('form')
meetingForm.addEventListener('submit', handleFormSubmit)
