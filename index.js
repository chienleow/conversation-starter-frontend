document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.querySelector("#create-user-form")
    createUserForm.addEventListener("submit", postUserForm);
    const openQuestion = document.querySelector("#open-question")
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
        let questionForm = `
        <form class="form-horizontal" id="create-question-form">
            <div class="form-group">
                <label class="control-label col-sm-2" for="question">Question:</label>
                <div class="col-sm-10">          
                    <input type="text" class="form-control" id="question" placeholder="Enter question" name="question">
                    <input type="hidden" id="user-id" value="${user.id}">
                </div><br>
            </div>
            <div class="form-group">        
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-secondary">Submit</button>
                </div>
            </div>
        </form>
        `
        let endSubmissionButton = `
        <div class="text-center">
            <button type="submit" id="end-submission" class="btn btn-primary">Done Submitting Questions</button>
        </div><br><br>
        `
        const container = document.querySelector(".container")
        container.innerHTML = newUserHTML + questionForm + endSubmissionButton;
        const createQuestionForm = document.querySelector("#create-question-form");
        createQuestionForm.addEventListener("submit", (e) => 
        postQuestionForm(e, user.id));
    })
}

function postQuestionForm(e, user_id) {
    e.preventDefault()
    const questionInput = document.querySelector("#question").value
    console.log(questionInput, user_id)
    postQuestionFetch(questionInput, user_id)
}

function postQuestionFetch(question, user_id) {
    fetch("http://localhost:3000/api/v1/questions", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            question: {
                question: question,
                user_id: user_id
            }
        })
    })

    let questionForm = `
    <form class="form-horizontal" id="create-question-form">
        <div class="form-group">
            <label class="control-label col-sm-2" for="question">Question:</label>
            <div class="col-sm-10">          
                <input type="text" class="form-control" id="question" placeholder="Enter question" name="question">
                <input type="hidden" id="user-id" value="${user_id}">
            </div><br>
        </div>
        <div class="form-group">        
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-secondary">Submit</button>
            </div>
        </div>
    </form>
    `
    let endSubmissionButton = `
    <div class="text-center">
        <button type="submit" id="end-submission" class="btn btn-primary">Done Submitting Questions</button>
    </div><br><br>
    `
    const container = document.querySelector(".container")
    container.innerHTML = questionForm + endSubmissionButton;
    const createQuestionForm = document.querySelector("#create-question-form");
    createQuestionForm.addEventListener("submit", (e) => 
    postQuestionForm(e, user_id));

}

function getQuestion() {
    fetch("http://localhost:3000/api/v1/questions")
    .then(response => response.json())
    .then(questions => {
        const random = questions.data[Math.floor(Math.random() * questions.data.length)];
        const oneQuestion = random.attributes.question;
        const questionAuthor = random.attributes.user.username
        
        document.querySelector('#question-container').innerHTML = `"${oneQuestion}"` + ` - ${questionAuthor}`;
    })
}