const model = new Model()
const view = new View()
const controller = new Controller()

let backButton = document.getElementById('back-btn')
let startButton = document.getElementById('start-lesson')
let submitAnswerButton = document.getElementById('submitAnswer')

const fixedChain = document.getElementById("list-block-one")
const unfixedChain = document.getElementById('list-block-two')
const factory = document.getElementById("factory")
const trash = document.getElementById("trash")

const submitAnswerDelay = 1500
let isFirstAnswer = true

let draggedItem = null

launch = function(){
    view.oneMoreBlock(factory)
    listenEvent()
    newQuestion()
}

newQuestion = function(){
    controller.getQuestion()
        .then(response => {
            model.saveCurrentQuestion(response.data)
            view.renderQuestion(model.currentQuestion)
        })
}

listenEvent = function(){
    backButton.addEventListener('click', back)
    startButton.addEventListener('click', start)
    submitAnswerButton.addEventListener('click', submitAnswer)
    addEventForDragPlace()
    addEventForDropPlaces()
}

addEventForDragPlace = function(){
    let blockInFactory = document.querySelector('.context--factory > .block');
    blockInFactory.addEventListener('dragstart', function (ev) {
        draggedItem = blockInFactory;
        ev.dataTransfer.setData("text/plain", this.parentNode.id);
        setTimeout(function () {
            blockInFactory.style.display = 'none';
        }, 0)
    });
    blockInFactory.addEventListener('dragend', function () {
        setTimeout(function () {
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
    })
}

addEventForDropPlaces = function(){
    unfixedChain.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    unfixedChain.addEventListener('drop', function (e) {
        this.append(draggedItem);
        setLocationOfBlock();
        view.oneMoreBlock(factory);
        addEventForDragPlace()
    });

    trash.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    trash.addEventListener('drop', function (ev) {
        let data = ev.dataTransfer.getData("text");
        if(data !== "factory"){
            this.append(draggedItem);
            trash.innerHTML = "";
            document.querySelector('.context--trash__block').innerHTML = `<div class="block"></div>`
            setLocationOfBlock()
        }
    });
}

setLocationOfBlock = function(){
    let child = unfixedChain.querySelectorAll('.block');
    for(let i = 0; i < child.length; i ++){
        const item = child[i];
        item.setAttribute("class", `block block_${i}`);
    }
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
    controller.submitAnswer(unfixedChain.getElementsByClassName('block').length)
        .then(response => handleResult(this, response.data))
        .then(enableSubmitAnswerButton)

}

disableSubmitAnswerButton = function(){
    submitAnswerButton.disabled = true
}

enableSubmitAnswerButton = function(){
    submitAnswerButton.disabled = false
}

handleResult = function(chosenAnswer, result){
    return new Promise((resolve, reject) => {
        if (result){
            correctAnswerHandle()
                .then(checkFinishStage)
                .then(newQuestion)
                .then(clearAnswer)
                .then(() => isFirstAnswer = true)
                .then(resolve)
        }else{
            incorrectAnswerHandle()
                .then(()=> isFirstAnswer = false)
                .then(resolve)
        }
    })
}

clearAnswer = function(){
    view.clearAnswer()
    submitAnswerButton.dataset.value = '0'
}

correctAnswerHandle = function () {
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