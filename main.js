const urlBase = "https://opentdb.com/api.php?amount=10";
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

// const handleGetQuestionsAPI 

// buttonTrivia.onclick = handleSearchTrivia;
document.addEventListener("DOMContentLoaded", handleSearchTrivia);
triviaForm.onsubmit = handleGetQuestionsAPI;