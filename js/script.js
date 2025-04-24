// # DICHIARAZIONI GLOBALI
// Dichiarazione array di oggetti
infoCard = [];

// Dichiarazione Stringa HTML
cardHTML = "";

// # CHIAMATA API

// Richiediamo i dati API
axios.get("https://lanciweb.github.io/demo/api/pictures/").then((response) => {
  let dataAPI = response.data;
  for (let i = 0; i < 6; i++) {
    // Leggo i dati API
    let title = dataAPI[i].title;
    let date = dataAPI[i].date;
    let image = dataAPI[i].url;

    // Creo oggetto con i dati API
    const newObj = { title, date, image };

    // Push oggetto in inoCard
    infoCard.push(newObj);

    console.log(infoCard[i].title);
    console.log(infoCard[i].date);
    console.log(infoCard[i].image);
  }
  //   Termine caricamento

  if (infoCard.length === 6) {
    console.table(infoCard);
  }
});
