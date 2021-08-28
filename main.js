const urlBase = "https://opentdb.com/api.php?";
const categorySelect = document.getElementById("categorySelect");
const triviaForm = document.getElementById("triviaForm");
const container = document.getElementById("question-container");
let q = 0;
let correct_answer = "";
let score = 0;
let questions = [];
let disorderQuestions =[];
let amount = 0;

const myRequest = new Request('http://localhost/flowers.jpg');

const handleSearchTrivia = () => {
    fetch("https://opentdb.com/api_category.php")
    .then(response => response.json())
    .then(resp => handleFillCategories(resp["trivia_categories"]));
}

const handleFillCategories = categories => {
    categorySelect.innerHTML = `<option value="0">Any Category</option>`
    for (let category in categories) {
        categorySelect.innerHTML += `<option value="${categories[category].id}">${categories[category].name}</option>`;
    }
};

const handleGetQuestionsAPI = (e) => {
    e.preventDefault();
    amount = document.getElementById("amount").value;
    let category = document.getElementById("categorySelect").value;
    let difficulty = document.getElementById("difficulty").value;
    let type = document.getElementById("type").value;
    urlGetQuestions = `${urlBase}amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    fetch(urlGetQuestions)
    .then(response => response.json())
    .then(resultado => fillQuestions(resultado.results)) // funcion(RespuestaDeFetchConvertidaEnObjeto) {console.log(RespuestaDeFetchConvertidaEnObjeto ----> {results: [{}]})}
    .catch(error => console.log(error));
};

const fillQuestions = questionsAPI => {
  questions = questionsAPI;
  disorderQuestions.push(questions[q]);
  // console.log(questions);
  showQuestions();
};

const showQuestions = () => {
  triviaForm.innerHTML = '';
  disorderQuestions = [...questions[q].incorrect_answers];
  correctAnswer = questions[q].correct_answer;
  total_answers = disorderQuestions.length + 1;
  let correct_position = parseInt(Math.random() * (0 - total_answers) + (total_answers));
  disorderQuestions.splice(correct_position, 0, correctAnswer);
  disorderQuestions.push(correct_position);
  console.log("Desordendas",disorderQuestions);
  if (questions[q].incorrect_answers.length > 1) {
    container.innerHTML = `
    <div>
      <h4>${questions[q].question}</h4>
      <div class="question-contanier">
        <ul>
          <li><button class="button-question" onClick="handleCheckAnswer(this)">${
            disorderQuestions[0]
          }</button></li>
          <li><button class="button-question" onClick="handleCheckAnswer(this)"> ${
            disorderQuestions[1]
          }</button></li>
          <li><button class="button-question" onClick="handleCheckAnswer(this)">${
            disorderQuestions[2]
          }</button></li>
          <li><button class="button-question" onClick="handleCheckAnswer(this)">${
            disorderQuestions[3]
          }</button></li>
        </ul>
      </div>

    </div>
  `;
  } else {  
    container.innerHTML = `
    <div class="question-contanier">
      <h4>${questions[q].question}</h4>
      <ul>
        <li><button class="button-question" onClick="handleCheckAnswer(this)">${
          disorderQuestions[0]
        }</button></li>
        <li><button class="button-question" onClick="handleCheckAnswer(this)"> ${
          disorderQuestions[1]
        }</button></li>
    </ul>
    </div>
  `;
  }
};

const resetGame = () => {
  document.location.reload();
}

const handleCheckAnswer = button => {
  if (button.innerText === correctAnswer) {
    score++;
    console.log("Correcto");
  } else {
    console.log("Incorrecto");
  }

  if (questions.length - 1 !== q) {
    q++;
    showQuestions();
  } else {
    console.log(`Juego terminado. Tu puntuación: ${score/amount*100}%`);
    container.innerHTML = `
    <div>
      <h4>Juego terminado. \n Tu puntuación: ${score/amount*100}\%</h4>
      <div class="button">
        <button onclick="resetGame()">Play Again</button>
      </div>
    </div>`
    q=0;
    score=0;
  }
};


// buttonTrivia.onclick = handleSearchTrivia;
document.addEventListener("DOMContentLoaded", handleSearchTrivia);
triviaForm.onsubmit = handleGetQuestionsAPI;