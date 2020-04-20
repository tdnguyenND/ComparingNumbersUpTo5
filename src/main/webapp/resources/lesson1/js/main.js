const model = new Model()
const view = new View()
const controller = new Controller()

let backButton = document.getElementById('back-btn')
let startButton = document.getElementById('start-lesson')
let allSubmitAnswerButton = ['answerA', 'answerB'].map(id => document.getElementById(id))

const submitAnswerDelay = 1500

const correctAnswerColor = "rgb(106, 219, 72)"
const incorrectAnswerColor = "#FF5D6A"
const defaultAnswerColor = "#6ec3e2"

let isFirstAnswer = true
let advanceMode = false
let countTrueAnswer = 0

launch = function(){
    listenEvent()
    newQuestion()
}

newQuestion = function(){
    controller.getQuestion()
        .then(response => {
            model.saveCurrentQuestion(response.data)
            view.renderQuestion(model.currentQuestion, advanceMode)
        })
}

listenEvent = function(){
    backButton.addEventListener('click', back)
    startButton.addEventListener('click', start)
    allSubmitAnswerButton.forEach(btn => btn.addEventListener('click', submitAnswer))
}

back = function(){
    window.location = '/'
}

start = function(){
    view.setUpAnswerScene()
}

submitAnswer = function(){
    disableSubmitAnswerButton()
    if (!isFirstAnswer) view.clearSuggestion()
    controller.submitAnswer(this.dataset.value)
        .then(response => handleResult(this, response.data))
        .then(enableSubmitAnswerButton)

}

disableSubmitAnswerButton = function(){
    allSubmitAnswerButton.forEach(btn => btn.disabled = true)
}

enableSubmitAnswerButton = function(){
    allSubmitAnswerButton.forEach(btn => btn.disabled = false)
}

handleResult = function(chosenAnswer, result){
    return new Promise((resolve, reject) => {
        if (result){
            view.setBackground(chosenAnswer, correctAnswerColor)
            correctAnswerHandle()
                .then(checkFinishStage)
                .then(newQuestion)
                .then(() => isFirstAnswer = true)
                .then(() => view.setBackground(chosenAnswer, defaultAnswerColor))
                .then(resolve)
        }else{
            view.setBackground(chosenAnswer, incorrectAnswerColor)
            incorrectAnswerHandle()
                .then(()=> isFirstAnswer = false)
                .then(() => view.setBackground(chosenAnswer, defaultAnswerColor))
                .then(resolve)
        }
    })
}

correctAnswerHandle = function () {
    countTrueAnswer++
    if (countTrueAnswer >= 3) advanceMode = true
    return new Promise((resolve, reject) => {
        if (isFirstAnswer){
            model.currentCorrectAnswer++
            view.moveBallRight(model.currentCorrectAnswer - 1)
        }
        setTimeout(resolve, submitAnswerDelay)
    })
}

incorrectAnswerHandle = function() {
    return new Promise((resolve, reject) => {
        if (isFirstAnswer && model.currentCorrectAnswer > 0){
            model.currentCorrectAnswer--
            view.moveBallLeft(model.currentCorrectAnswer)
        }
        view.displaySuggestion(model.currentQuestion)
            .then(resolve)
    })
}

checkFinishStage = function(){
    return new Promise((resolve, reject) => {
        if (model.isFinish()) window.location = "/completed"
        resolve()
    })
}

launch()