const endPoint = "http://localhost:3000/api/v1/questions"

document.addEventListener('DOMContentLoaded', () => {
    getQuestions()
})

function getQuestions() {
    fetch(endPoint)
    .then(response => response.json())
    .then(questions => {
        console.log(questions);
    })
}