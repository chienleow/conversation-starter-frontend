const endPoint = "http://localhost:3000/api/v1/questions"
const openQuestion = document.querySelector("#open-question");
const questionContainer = document.getElementById("open-question").innerHTML
const createForm = document.querySelector("#create-form")

document.addEventListener('DOMContentLoaded', () => {
    openQuestion.addEventListener("click", getQuestion);
    createForm.addEventListener("submit", (e) => postForm(e));
})


// button called "shuffle"
// go through the array from element 1 - 20, once we hit the bottom of the array, display game over

// JS mantra: When some event happens, I want to make what kind of fetch and then manipulate the DOM in what way?
// shuffleMethod: When user clicks the shuffle button, I want to shuffle the questionsArray 

// stretch goal: trash box
// put it first thing in DOMContentLoaded, create a variable, push the question_id to the trash array
// 1. const unaskedQuestions = questions.filter(question => question.id !== askedQuestion);
// OR 2. push every time in a trash array
// when I am passing getQuestion(), pass in 2 arguments (unaskedQuestions, shuffleMethod)

function shuffleMethod(questionsArray) {
    const currentIndex = questionsArray.length, temporaryValue, randomIndex;
  
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
  
    return questionsArray;
}

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