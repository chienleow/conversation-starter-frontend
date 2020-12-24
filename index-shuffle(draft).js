// stretch goal: a shuffle button
const shuffleButton = document.querySelector("#shuffle-question")

function shuffleMethod() {
    fetch(endPoint)
    .then(response => response.json())
    .then(questions => {
        const allQuestions = questions.data;
        const questionsArray = []
        allQuestions.forEach(question => {
            questionsArray.push(question.attributes.question)
        });
        
        let currentIndex = questionsArray.length, temporaryValue, randomIndex;
  
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
    });
}

function getOriginalQuestions() {
    fetch(endPoint)
    .then(response => response.json())
    .then(questions => {
        const allQuestions = questions.data;
        const questionsArray = []
        allQuestions.forEach(question => {
            questionsArray.push(question.attributes.question)
        });
        return questionsArray;
    });
}

function shuffleMethod(questionsArray) {
    let currentIndex = questionsArray.length, temporaryValue, randomIndex;
  
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



if you combined both methods, every single time you click open-question, it is going to shuffle all over

const shuffledQuestion = shuffleMethod();
console.log("hello!!!!", shuffledQuestion)
this will grab you the return value from shuffleMethod(); which is questionsArray

function getQuestion() {
    const shuffledQuestion = shuffleMethod();

    shuffledQuestion.forEach(question => {
        document.querySelector('#question-container').innerHTML = question;
    })
}

function openQuestion() {
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