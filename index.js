const endPoint = "http://localhost:3000/api/v1/questions"
const openQuestion = document.querySelector("#open-question");
let questionContainer = document.getElementById("open-question").innerHTML // should I change this back to const?
const createForm = document.querySelector("#create-form")

document.addEventListener('DOMContentLoaded', () => {
    openQuestion.addEventListener("click", displayQuestion);
    createForm.addEventListener("submit", (e) => postForm(e));
})

function displayQuestion() {
    if (questionContainer == "") {
        getQuestion
    } else {
        clearContainer(); // run this first?
        getQuestion();
    }
}

function getQuestion() {
    fetch(endPoint)
    .then(response => response.json())
    .then(questions => {
        const random = questions.data[Math.floor(Math.random() * questions.data.length)];
        const oneQuestion = random.attributes.question;
        const questionAuthor = random.attributes.user.username
        
        document.querySelector('#question-container').innerHTML += `"${oneQuestion}"` + ` - ${questionAuthor}`;
    })
}

function clearContainer() {
    questionContainer = "";
}

function postForm(e) {
    e.preventDefault()
    const usernameInput = document.querySelector("#username").value
    const questionInput = document.querySelectorAll("#question").value
    // console.log(usernameInput, questionInput)
    postFetch(usernameInput, questionInput)
    // question: can I select all my questions at once?
}

function postFetch(username, question) {
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username,
            question: question,
        })
    })
    .then(response => response.json())
    .then(question => {
        console.log(question);
    })
}