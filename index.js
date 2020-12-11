const endPoint = "http://localhost:3000/api/v1/questions"
const openQuestion = document.querySelector("#open-question");
let questionContainer = document.getElementById("open-question").innerHTML // should I change this back to const?
const createForm = document.querySelector("#create-form")

document.addEventListener('DOMContentLoaded', () => {
    openQuestion.addEventListener("click", getQuestion);
    createForm.addEventListener("submit", (e) => postForm(e));
})


// button called "shuffle"
// go through the array from element 1 - 20, once we hit the bottom of the array, display game over

// stretch goal: trash box
// put it first thing in DOMContentLoaded, create a variable, push the question_id to the trash array
// 1. const unaskedQuestions = questions.filter(question => question.id !== askedQuestion);
// OR 2. push every time in a trash array
// when I am passing getQuestion(), pass in 2 arguments (unaskedQuestions, shuffleMethod)


function getQuestion() {
    fetch(endPoint)
    .then(response => response.json())
    .then(questions => {
        const random = questions.data[Math.floor(Math.random() * questions.data.length)];
        const oneQuestion = random.attributes.question;
        const questionAuthor = random.attributes.user.username
        
        // document.querySelector('#question-container').innerHTML += `"${oneQuestion}"` + ` - ${questionAuthor}`;
        document.querySelector('#question-container').innerHTML = oneQuestion;
    })
}

function clearContainer() {
    questionContainer = "";
}

function postForm(e) {
    e.preventDefault()
    const usernameInput = document.querySelector("#username").value
    const questionInput1 = document.querySelector("#question1").value
    // const questionInput2 = document.querySelector("#question2").value
    // const questionInput3 = document.querySelector("#question3").value
    // const questionInput4 = document.querySelector("#question4").value
    // const questionInput5 = document.querySelector("#question5").value

    // console.log(usernameInput, questionInput)
    // postFetch(usernameInput, questionInput1, questionInput2, questionInput3, questionInput4, questionInput5)
    postFetch(usernameInput, questionInput1)
    // question: can I select all my questions at once?
}

// function postFetch(username, question1, question2, question3, question4, question5) {
//     fetch(endPoint, {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//             username: username,
//             question: question1,
//             question: question2,
//             question: question3,
//             question: question4,
//             question: question5,
//             // check these, + sign might be from here
//         })
//     })
//     .then(response => response.json())
//     .then(question => {
//         console.log(question);
//     })
// }

function postFetch(username, question1) {
    fetch(endPoint, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            question: {
                username: username,
                question: question1,
            }
        })
    })
    .then(response => response.json())
    .then(question => {
        console.log(question);
    })
}