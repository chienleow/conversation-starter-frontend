class User {

    constructor(username, id) {
        this.username = username
        this.id = id
    }    


    static postForm(e) {
        e.preventDefault()
        const usernameInput = document.querySelector("#username").value

        User.postFetch(usernameInput)
    }

    static postFetch(username) {
        fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
            })
        })
        .then(response => response.json())
        .then(user => {
            let newUser = new User(user.username, user.id)
            // debugger
            let newUserHTML = `
                <div class="card">
                    <h3>Welcome, ${newUser.username}</h3>
                </div>    
            `
            let questionForm = `
            <form class="form-horizontal" id="create-question-form">
                <div class="form-group">
                    <label class="control-label col-sm-2" for="question">Question:</label>
                    <div class="col-sm-10">          
                        <input type="text" class="form-control" id="question" placeholder="Enter question" name="question">
                        <input type="hidden" id="user-id" value="${newUser.id}">
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
            Question.postForm(e, newUser.id));
            
            const endSubmission = document.querySelector("#end-submission")
            endSubmission.addEventListener("click", () => Question.backButton());
        })
    }
}

