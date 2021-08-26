let mainForm = document.getElementById("triviaForm");

const fetchDataApi = (e) =>{
    e.preventDefault();
    let difficulty = document.getElementById();
    let amount = document.getElementById();
    let type = document.getElementById();
    const API = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;
    console.log(API);
}   