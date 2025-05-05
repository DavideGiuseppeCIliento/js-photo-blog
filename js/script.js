// # ACQUISIZIONE
// Dichiarazione Stringa HTML Riga per Card
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
  // Console src
  srcNameStamp();
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
  // Acquisimo dal DOM tutte le card stampate in precedenza
  const gridCards = document.querySelectorAll(".card");

  // Per ogni Cardstampata al click acquisiamo Id e confrontiamo
  gridCards.forEach((selectedCard, i) => {
    selectedCard.addEventListener("click", () => {
      // 1. Al click leggiamo l'attributo id alla card
      const idCard = selectedCard.getAttribute(`id`);
      // 2. Se corrisponde all'id dell'oggetto dell'arry acquisiamol'url
      if (idCard === String(infoCard[i].id))
        showImageSelected(infoCard[i].image, selectedCard);
    });
  });
  return;
};

// SHOW IMMAGINE SELEZIONATA
const showImageSelected = (imageSelected, selectedCard) => {
  console.log("URL SELEZIONATO" + imageSelected);
  // # ACQUISIZIONE DOM
  const overlay = document.getElementById("overlay");
  const overlayImage = document.getElementById("overlay-image");
  const closeIcon = document.getElementById("close-overlay");
  const body = document.querySelector("body");

  // 1. Tolgo d-none per mostrare l'overlay e impedisco lo scroll
  overlay.classList.remove("d-none");
  selectedCard.classList.add("d-none");
  body.classList.add("no-scroll");

  // 2. Cambio l'immagine
  overlayImage.setAttribute("src", imageSelected);

  // Alla chiusura dell'overlay riattivo lo scroll e chiudo l'ovelay
  closeIcon.addEventListener("click", () => {
    overlay.classList.add("d-none");
    body.classList.remove("no-scroll");
    selectedCard.classList.remove("d-none");
  });
};

// Funzione per mostrare gli src
function srcNameStamp() {
  let arrayImg = [];

  let immaginiNode = document.querySelectorAll(".card-img-top");
  immaginiNode.forEach((nodo) => {
    arrayImg.push(nodo.getAttribute(`src`));
  });

  console.log(immaginiNode);
  console.table(arrayImg);
}
