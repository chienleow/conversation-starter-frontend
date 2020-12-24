class Question {

    constructor(question, user_id) {
        this.id = question.id
        this.user_id = question.user_id
    }
}

// getQuestion will just grab all the questions in index.js
// renderQuestion will randomize from the array, then show one question at a time