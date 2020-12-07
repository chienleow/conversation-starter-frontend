const endPoint = "http://localhost:3000/api/v1/questions"

document.addEventListener('DOMContentLoaded', () => {
    getOneQuestion()
})

function getOneQuestion() {
    fetch(endPoint)
    .then(response => response.json())
    .then(questions => {
        const random = questions.data[Math.floor(Math.random() * questions.data.length)];
        console.log(random);
    })
}