const endPoint = "http://localhost:3000/api/v1/questions"
const openQuestion = document.querySelector("#open-question");

document.addEventListener('DOMContentLoaded', () => {
    openQuestion.addEventListener("click", getOneQuestion);
})

function getOneQuestion() {
    fetch(endPoint)
    .then(response => response.json())
    .then(questions => {
        const random = questions.data[Math.floor(Math.random() * questions.data.length)];
        const oneQuestion = random.attributes.question;
        document.querySelector('#question-container').innerHTML += oneQuestion;
    })
}