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

function postUserForm(e) {
    e.preventDefault()
    const usernameInput = document.querySelector("#username").value

    postUserFetch(usernameInput)
}

function postUserFetch(username) {
    fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: username,
        })
    })
    .then(response => response.json())
    .then(user => {
        let newUserHTML = `
            <div class="card">
                <h3>Welcome, ${user.username}</h3>
            </div>    
        `
        let questionFormOne = `
        <form class="form-horizontal" id="create-question-form">
            <div class="form-group">
                <label class="control-label col-sm-2" for="question">Question 1:</label>
                <div class="col-sm-10">          
                    <input type="text" class="form-control" id="question" placeholder="Enter question" name="question">
                </div><br>
            </div>
            <div class="form-group">        
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-secondary">Submit</button>
                </div>
            </div>
        </form>
        `
        createUserForm.innerHTML = newUserHTML + questionFormOne;
    })
}

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
    const questionInput = document.querySelector("#question").value

    postFetch(question)
}

function postUserFetch(question) {
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