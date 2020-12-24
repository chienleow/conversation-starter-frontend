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
            User.currentUser = newUser
            
            Question.renderForm()
            
            const createQuestionForm = document.querySelector("#create-question-form");
            createQuestionForm.addEventListener("submit", (e) => 
            Question.postForm(e, newUser.id));
            
            const endSubmission = document.querySelector("#end-submission")
            endSubmission.addEventListener("click", () => Question.backButton());
        })
    }
}

