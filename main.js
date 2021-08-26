const urlBase = "https://opentdb.com/api.php?";
const categorySelect = document.getElementById("categorySelect");
const triviaForm = document.getElementById("triviaForm");

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
    let amount = document.getElementById("amount").value;
    console.log(amount);
    let category = document.getElementById("categorySelect").value;
    console.log(category);
    let difficulty = document.getElementById("difficulty").value;
    console.log(difficulty);
    let type = document.getElementById("type").value;
    console.log(type)
    urlGetQuestions = `${urlBase}amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    fetch(urlGetQuestions)
    .then(response => response.json())
    .then(request => console.log(request));
};

// buttonTrivia.onclick = handleSearchTrivia;
document.addEventListener("DOMContentLoaded", handleSearchTrivia);
triviaForm.onsubmit = handleGetQuestionsAPI;