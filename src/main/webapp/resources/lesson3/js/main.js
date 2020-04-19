let view = new View()
let controller = new Controller()
let model = new Model()

let backButton = document.getElementById('back-btn')
let startButton = document.getElementById('start-lesson')

const correctAnswerColor = "rgb(106, 219, 72)"
const incorrectAnswerColor = "#FF5D6A"
const defaultAnswerColor = "#6ec3e2"

const submitAnswerDelay = 1500

let allAnswerBtn = ['answer1', 'answer2', 'answer3'].map(id => document.getElementById(id))

let container = document.getElementById('under-start-wall')
let containerSize = container.getBoundingClientRect()

let groupBlock = new ItemChain('block', 'group-block', ['draggable'])
let unfixedChain = new ItemChain('block', 'list-block-one')
let fixedChain = new ItemChain('block', 'list-block-two')

let arrow = new ItemChain('arrow', 'arrows')
let xSignChain = new ItemChain('x-sign')

let isFirstAnswer = true

function launch() {
    listenBasicEvent()
    newQuestion()
}

function listenBasicEvent(){
    backButton.addEventListener('click', back)
    startButton.addEventListener('click', start)
    allAnswerBtn.forEach(btn => btn.addEventListener('click', submitAnswer))
    window.addEventListener('resize', ()=> containerSize = container.getBoundingClientRect())
}

back = function(){
    window.location = '/'
}

start = function(){
    view.setUpAnswerScene()
}

submitAnswer = function(){
    disableBehavior()
    clearSuggestion()
    controller.submitAnswer(this.dataset.value)
        .then(response => handleResult(this, response.data))
        .then(enableBehavior)
}

function disableBehavior() {
    container.style.pointerEvents = 'none'
}

function enableBehavior() {
    container.style.pointerEvents = ''
}

handleResult = function (chosenAnswer, result) {
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
    return new Promise((resolve, reject) => {
        if (isFirstAnswer){
            model.currentCorrectAnswer++
            view.moveBallRight(model.currentCorrectAnswer - 1)
        }
        setTimeout(resolve, submitAnswerDelay)
    })
}

checkFinishStage = function(){
    return new Promise((resolve, reject) => {
        if (model.isFinish()) window.location = "/completed"
        resolve()
    })
}

function clearQuestion() {
    unfixedChain.clear()
    fixedChain.clear()
    groupBlock.clear()
}

function clearSuggestion() {
    arrow.clear()
    xSignChain.clear()
}

clear = function(){
    clearQuestion();
    clearSuggestion();
}

incorrectAnswerHandle = function() {
    return new Promise((resolve, reject) => {
        if (isFirstAnswer && model.currentCorrectAnswer > 0){
            model.currentCorrectAnswer--
            view.moveBallLeft(model.currentCorrectAnswer)
        }
        displaySuggestion()
            .then(resolve)
    })
}

function displaySuggestion() {
    let bigger, smaller
    if (unfixedChain.amount > fixedChain.amount){
        bigger = unfixedChain
        smaller = fixedChain
    }else{
        bigger = fixedChain
        smaller = unfixedChain
    }

    smaller.appendChain(xSignChain)
    xSignChain.setMaxAmount(6 - smaller.amount)

    return new Promise((resolve, reject) => {
        let i = 1
        let interval = setInterval(()=>{
            if (i <= smaller.amount) arrow.addItemOrdered(null, ['green-arrow'])
            else{
                arrow.addItemOrdered(null, ['red-arrow'])
                xSignChain.addItemOrdered()
            }
            i++
            if (i > bigger.amount){
                clearInterval(interval)
                resolve()
            }
        },1000)
    })
}

function newQuestion(){
    controller.getQuestion()
        .then(response => renderQuestion(response.data))
        .then(listenMoveBlockEvent)
}

function renderQuestion(question){
    clearQuestion()
    renderArrangedBlocks(question['first'])
    renderUnArrangedBlocks(question['second'])
}

function renderArrangedBlocks(number) {
    for (let i = 0; i < number; i++)
        fixedChain.addItemOrdered()
}

function renderUnArrangedBlocks(number) {
    for (let i = 0; i < number; i++)
        groupBlock.addItemUnordered()
}

function listenMoveBlockEvent(){
    Array.from(groupBlock.domElement.getElementsByClassName('draggable'))
        .forEach(ele => ele.addEventListener('mousedown', startMoving))
}

function startMoving() {
    let self = this

    self.style.zIndex = '1000'
    let previousPosition = saveLastPosition()
    function saveLastPosition(){
        return {
            left: self.style.left,
            top: self.style.top
        }
    }
    document.addEventListener("mousemove", followCursor)
    document.addEventListener("mouseup", dropItem)

    function followCursor(event){
        let position = getCursorPositionWithContainer(event)
        moveTo(position)
    }

    function getCursorPositionWithContainer(event) {
        let x = event.pageX
        let y = event.pageY
        let mouseX = Math.min(Math.max(x - containerSize.left - self.offsetWidth/2, 0), containerSize.width - self.offsetWidth)
        let mouseY = Math.min(Math.max(y - containerSize.top - self.offsetHeight/2, 0), containerSize.height - self.offsetHeight)
        return {
            x: mouseX,
            y: mouseY
        }
    }

    function moveTo(position) {
        setPosition(position.x + 'px', position.y + 'px')
    }

    function setPosition(left, top){
        self.style.left = left
        self.style.top = top
    }

    function dropItem(){
        putDown()
        removeEventListener()
    }

    function putDown() {
        let position = self.getBoundingClientRect()
        if (unfixedChain.cover(position) && groupBlock.contain(self)){
            groupBlock.remove(self)
            unfixedChain.addItemOrdered(self)
            self.removeEventListener('mousedown', startMoving)
        }else{
            returnToLastPosition()
        }
    }

    function returnToLastPosition() {
        setPosition(previousPosition.left, previousPosition.top)
    }

    function removeEventListener() {
        document.removeEventListener("mousemove", followCursor)
        document.removeEventListener("mouseup", dropItem)
    }
}

launch()