MVP MVP MVP!!!

Event, Fetch, DOM

JS Mantra: When some event happens, I want to make what kind of fetch and then manipulate the DOM in what way?

Wrapping up to-do-list:
Sunday 12/20
[ ] give user the option to go back to open question (make it at the bottom of all question forms)
[ ] refactor OOJS 

----------------------------------------------

[ ] Create two buttons, one for submitting questions, one for game
[ ] Create two forms, one for username, then one for questions
 
[ ] When user (enter their username and questions in a form), I want to (post the data to the backend API) and then manipulate the DOM by (showing user their username has been saved)

[ ] When user (enter their 1st question in a form), I want to (post the data to the backend API) and then manipulate the DOM by (showing user their question has been saved) and (append another form)

[ ] When user (click on the "open a question" button), I want to (get questions from the backend API - select random question) and then manipulate the DOM by (appending the questions from backend API to the frontend HTML), so users can see the questions ONE at a time

[ ] When (there is a question already on screen), I want to manipulate the DOM by erasing the question on screen before the next question pops up

// button called "shuffle"
// go through the array from element 1 - 20, once we hit the bottom of the array, display game over

// shuffle button (front or back end?)

// frontend: 1. JS listens to the shuffle button, get the questionsArray from backend, push all questions into a questionsArray, then shuffle it using JS function, store it as a shuffledArray (for the open question function to use later)

// backend: 1. JS listens to the shuffle button, somehow trigger a Ruby method that shuffles the questionsArray in the backend

// shuffleMethod: When user clicks the shuffle button, I want to shuffle the questionsArray 

// stretch goal: trash box
// put it first thing in DOMContentLoaded, create a variable, push the question_id to the trash array
// 1. const unaskedQuestions = questions.filter(question => question.id !== askedQuestion);
// OR 2. push every time in a trash array
// when I am passing getQuestion(), pass in 2 arguments (unaskedQuestions, shuffleMethod)


Things to fix:
// done: do not repeat question
// 1. label each question and use filter to filter all opened questions
// 2. first shuffled all questions, then display them one by one
[ ] when refresh, everything is gone?
// done: how to make sure it is clear before new append every time?



Stretch goals:
[ ] reset game button to delete all users and questions
[ ] keep active games, keep a page of active and ended games for record
[ ] users can resume game

Questions to ask:
// Does it count as a full AJAX call? If I am just posting the data to the backend, but not appending to the front end right away?
// WHat does the error in my terminal mean? It has been there for awhile