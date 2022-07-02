let dataStore = null;
let shuffeQuiz = null;
let shuffeRisposte = null;

$("#shuffleQuiz").change(function () {
  shuffeQuiz = this.checked;
  creaQuiz(dataStore.mainData, shuffeQuiz, shuffeRisposte);
});

$("#shuffleRisposte").change(function () {
  shuffeRisposte = this.checked;
  creaQuiz(dataStore.mainData, shuffeQuiz, shuffeRisposte);
});

function doFetch() {
  // Replace ./data.json with your JSON feed
  fetch("./dataStorage/data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      dataStore = data;

      creaQuiz(data.mainData, shuffeQuiz, shuffeRisposte);
      var title = document.getElementById("title").innerHTML;
      title += ", Totale Domande: " + data.mainData.length;
      document.getElementById("title").innerHTML = title;
    })
    .catch((err) => {
      // Do something for an error here
    });
}

function shuffleArray(data) {
  data.sort(() => Math.random() - 0.5);
}

function creaQuiz(dataJson, quizzShuffle, answerShuffle) {
  let strVal = "";
  if (quizzShuffle) shuffleArray(dataJson);
  dataJson.forEach((element) => {
    strVal += creaDomanda(element, answerShuffle);
  });
  $("#contentQuiz").html(strVal);
}

function creaDomanda(data, answerShuffle) {
  var strVar = "";
  strVar += '<div class="bg-warning fancy-border-radius">';
  strVar += "<div>";

  //Intestazione
  strVar += creaIntestazione(data.domanda);
  //Opzioni
  if (answerShuffle) shuffleArray(data.possibiliRisp);
  data.possibiliRisp.forEach((element) => {
    strVar += creaOpzione(element);
  });
  //Risposta
  strVar += creaRisposta(data.risposta);

  strVar += "";

  strVar += "</div>";
  strVar += "</div>";
  strVar += "</div>";
  return strVar;
}

function creaIntestazione(testoDomanda) {
  var strVar = "";
  strVar += '  <h1 class="fs-2 m-5">';
  strVar += testoDomanda;
  strVar += "  </h1>";
  return strVar;
}

function creaOpzione(testoOpzione) {
  var strVar = "";
  if (testoOpzione == "") return strVar;
  strVar += '  <p class="fs-4 m-2">';
  strVar += "@ " + testoOpzione;
  strVar += "  </p>";
  return strVar;
}

function creaRisposta(testoRisposta) {
  var strVar = "";
  strVar += '  <div class="p-3 m-2">';
  strVar += "    <details>";
  strVar += '      <summary class="fs-3 m-2 p-2 text-capitalize text-info">';
  strVar += "        Mostra la risposta";
  strVar += "      </summary>";
  strVar += '      <p class="note note-primary fs-4 fa-amazon text-warning">';
  strVar += testoRisposta;
  strVar += "      </p>";
  strVar += "    </details>";
  strVar += "  </div>";
  return strVar;
}
