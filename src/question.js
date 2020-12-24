class Question {

    constructor(question, user_id) {
        this.question = question
        this.user_id = user_id
    }

    static postForm(e, user_id) {
        e.preventDefault()
        const questionInput = document.querySelector("#question").value
        
        Question.postFetch(questionInput, user_id)
    }

    static postFetch(question, user_id) {
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
        Question.renderForm()
        
        const createQuestionForm = document.querySelector("#create-question-form");
        createQuestionForm.addEventListener("submit", (e) => 
        Question.postForm(e, user_id));
    
        const endSubmission = document.querySelector("#end-submission")
        endSubmission.addEventListener("click", () => Question.backButton());
    }

    static renderForm() {
        let newUserHTML = `
                <div class="card">
                    <h3>Welcome, ${User.currentUser.username}</h3>
                </div>    
            `
        let questionForm = `
        <form class="form-horizontal" id="create-question-form">
            <div class="form-group">
                <label class="control-label col-sm-2" for="question">Question:</label>
                <div class="col-sm-10">          
                    <input type="text" class="form-control" id="question" placeholder="Enter question" name="question">
                    <input type="hidden" id="user-id" value="${User.currentUser.id}">
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
    }

    static getAll() {
        fetch("http://localhost:3000/api/v1/questions")
        .then(response => response.json())
        .then(questions => {
            const random = questions.data[Math.floor(Math.random() * questions.data.length)];
            const oneQuestion = random.attributes.question;
            const questionAuthor = random.attributes.user.username
            
            document.querySelector('#question-container').innerHTML = `"${oneQuestion}"` + ` - ${questionAuthor}`;
        })
    }

    static backButton() {
        let questionContainer = `
        <div class="text-center" id="question-container"></div></br>
        `
        let openQuestionButton = `
        <div class="text-center">
            <button type="submit" id="open-question" class="btn btn-success">Open a Question</button>
        </div><br><br>
        `
        const container = document.querySelector(".container")
        container.innerHTML = questionContainer + openQuestionButton;
    
        const openQuestion = document.querySelector("#open-question")
        openQuestion.addEventListener("click", () => Question.getAll());
    }
}