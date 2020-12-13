const endPoint = "http://localhost:3000/api/v1/questions"
const createUserForm = document.querySelector("#create-user-form")
const createQuestionForm = document.querySelector("#create-question-form")
const openQuestion = document.querySelector("#open-question");
const questionContainer = document.getElementById("open-question").innerHTML

document.addEventListener('DOMContentLoaded', () => {
    createUserForm.addEventListener("submit", (e) => postUserForm(e));
    createQuestionForm.addEventListener("submit", (e) => postQuestionForm(e));
    openQuestion.addEventListener("click", getQuestion);
})

function getQuestion() {
    fetch(endPoint)
    .then(response => response.json())
    .then(questions => {
        const random = questions.data[Math.floor(Math.random() * questions.data.length)];
        const oneQuestion = random.attributes.question;
        const questionAuthor = random.attributes.user.username
        
        document.querySelector('#question-container').innerHTML = `"${oneQuestion}"` + ` - ${questionAuthor}`;
        // document.querySelector('#question-container').innerHTML = oneQuestion;
    })
}

function postUserForm(e) {
    e.preventDefault()
    const usernameInput = document.querySelector("#username").value
    const questionInput1 = document.querySelector("#question1").value
    const questionInput2 = document.querySelector("#question2").value
    const questionInput3 = document.querySelector("#question3").value
    const questionInput4 = document.querySelector("#question4").value
    const questionInput5 = document.querySelector("#question5").value

    postFetch(usernameInput, [questionInput1, questionInput2, questionInput3, questionInput4, questionInput5])
}

function postUserFetch(username, questions) {
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            user: {
                username: username,
                questions: questions
            }
        })
    })
    .then(response => response.json())
    .then(question => {
        console.log(question);
    })
}