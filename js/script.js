// # DICHIARAZIONI GLOBALI

// # ACQUISIZIONE
// Dichiarazione Stringa HTML
const rowForCard = document.getElementById("row-for-card");

// # CHIAMATA API

// Richiediamo i dati API
axios.get("https://lanciweb.github.io/demo/api/pictures/").then((response) => {
  // Dichiarazione array di oggetti
  const infoCard = [];
  let dataAPI = response.data;

  for (let i = 0; i < dataAPI.length; i++) {
    // Leggo i dati API e li pusho nell'array
    infoCard.push({
      title: dataAPI[i].title,
      date: dataAPI[i].date,
      image: dataAPI[i].url,
      id: dataAPI[i].id,
    });

    // // Console Test
    // console.log(infoCard[i].title);
    // console.log(infoCard[i].date);
    // console.log(infoCard[i].image);
  }

  // Stampa griglia
  stampaHTML(infoCard);
  // Seleziona immagine
  isImageSelected(infoCard);
});

// # FUNZIONI

// FUNZIONE DI STAMPA

const stampaHTML = (infoCard) => {
  // Dichiarazione Stringa HTML
  let cardHTML = "";
  for (let i = 0; i < infoCard.length; i++) {
    // Creazione STRING HTML
    cardHTML += `<div class="col-12 col-md-6 col-lg-4 p-3 position-relative ">
      <!-- CARD 1 -->
      <div class="card shadow-sm rounded-0 p-4" id="${infoCard[i].id}">
        <img src="${infoCard[i].image}" class="card-img-top rounded-0" alt="fotoVacanza" />
        <div class="card-body p-0 pt-3">
          <h5 class="card-title">${infoCard[i].title}</h5>
          <p class="card-text">${infoCard[i].date}</p>
          <img id="pin" src="./assets/img/pin.svg" alt="" />
        </div>
      </div>
    </div>`;
  }

  //   Termine caricamento e incollo l'HTML CARD
  rowForCard.innerHTML = cardHTML;
  return;
};

// SELEZIONE IMMAGINE CON ACQUISIZIONE URL

const isImageSelected = (infoCard) => {
  // # ACQUISIZIONE DOM
  const gridCards = document.querySelectorAll(".card");
  console.log(gridCards);
  // Acquisiione immagine dalla Card selezionata
  gridCards.forEach((selectedCard, i) => {
    selectedCard.addEventListener("click", () => {
      const idCard = selectedCard.getAttribute(`id`);
      console.log(idCard);
      console.log(infoCard[i].id);
      if (idCard === String(infoCard[i].id))
        showImageSelected(infoCard[i].image);
      // Zoom immagine con overlay
    });
  });
  return;
};

// SHOW IMMAGINE SELEZIONATA
const showImageSelected = (imageSelected) => {
  console.log("URL SELEZIONATO" + imageSelected);
  const overlay = document.getElementById("overlay");
  const overlayImage = document.getElementById("overlay-image");
  const closeIcon = document.getElementById("close-overlay");

  // 1. Tolgo d-none per mostrare l'overlay e impedisco lo scroll
  overlay.classList.remove("d-none");
  document.body.classList.add("no-scroll");

  // 2. Cambio l'immagine e riattivo lo scroll
  overlayImage.setAttribute("src", imageSelected);

  // Alla chiusura dell'overlay riattivo lo scroll e chiudo l'ovelay
  closeIcon.addEventListener("click", () => {
    overlay.classList.add("d-none");
    document.body.classList.remove("no-scroll");
  });
};
