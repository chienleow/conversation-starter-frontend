const endPoint = "http://localhost:3000/api/v1/questions"
const createForm = document.querySelector("#create-form")
// const shuffleButton = document.querySelector("#shuffle-question")
const openQuestion = document.querySelector("#open-question");
const questionContainer = document.getElementById("open-question").innerHTML

document.addEventListener('DOMContentLoaded', () => {
    createForm.addEventListener("submit", (e) => postForm(e));
    openQuestion.addEventListener("click", shuffleMethod);
    openQuestion.addEventListener("click", getQuestion);
})

function shuffleMethod() {
    fetch(endPoint)
    .then(response => response.json())
    .then(questions => {
        const allQuestions = questions.data;
        const questionsArray = []
        allQuestions.forEach(question => {
            questionsArray.push(question.attributes.question)
        });
        
        let currentIndex = questionsArray.length, temporaryValue, randomIndex;
  
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        // And swap it with the current element.
        temporaryValue = questionsArray[currentIndex];
        questionsArray[currentIndex] = questionsArray[randomIndex];
        questionsArray[randomIndex] = temporaryValue;
        }
        const shuffledQuestion = questionsArray;
        getQuestion(shuffledQuestion)
    });
}

function getQuestion(shuffledQuestion) {
    shuffledQuestion.forEach(question => {
        document.querySelector('#question-container').innerHTML = question;
    })
}

// function openQuestion() {
//     fetch(endPoint)
//     .then(response => response.json())
//     .then(questions => {
//         const random = questions.data[Math.floor(Math.random() * questions.data.length)];
//         const oneQuestion = random.attributes.question;
//         const questionAuthor = random.attributes.user.username
        
//         // document.querySelector('#question-container').innerHTML += `"${oneQuestion}"` + ` - ${questionAuthor}`;
//         document.querySelector('#question-container').innerHTML = oneQuestion;
//     })
// }

function postForm(e) {
    e.preventDefault()
    const usernameInput = document.querySelector("#username").value
    const questionInput1 = document.querySelector("#question1").value
    const questionInput2 = document.querySelector("#question2").value
    const questionInput3 = document.querySelector("#question3").value
    const questionInput4 = document.querySelector("#question4").value
    const questionInput5 = document.querySelector("#question5").value

    postFetch(usernameInput, [questionInput1, questionInput2, questionInput3, questionInput4, questionInput5])
}

function postFetch(username, questions) {
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