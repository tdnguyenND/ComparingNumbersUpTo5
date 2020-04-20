let view = new View()
let controller = new Controller()
let model = new Model()

let backButton = document.getElementById('back-btn')
let startButton = document.getElementById('start-lesson')

const submitAnswerDelay = 1500

let allAnswerBtn = ['answer1', 'answer2', 'answer3'].map(id => document.getElementById(id))

let container = document.getElementById('under-start-wall')
let containerSize = container.getBoundingClientRect()

let leftGroup = new ItemChain('block', 'left-group-block', ['draggable'])
let leftBlockChain = new ItemChain('block', 'list-block-one')

let rightGroup = new ItemChain('block', 'right-group-block', ['draggable'])
let rightBlockChain = new ItemChain('block', 'list-block-two')

let arrow = new ItemChain('arrow', 'arrows')
let xSignChain = new ItemChain('x-sign')
let currentQuestion = null

let isFirstAnswer = true
let advanceMode = false
let countTrueAnswer = 0

let listBall = document.getElementById('list-ball')
for (let i = 0; i < model.numberQuestionOfLesson; i++) {
    let ball = document.createElement('div')
    ball.id = 'ball_' + i
    ball.setAttribute('class', 'ball')
    ball.style.left = (4 + i * 24) + 'px'
    listBall.appendChild(ball)
}

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
            correctAnswerHandle()
                .then(checkFinishStage)
                .then(newQuestion)
                .then(() => isFirstAnswer = true)
                .then(resolve)
        }else{
            incorrectAnswerHandle()
                .then(()=> isFirstAnswer = false)
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
            view.moveBallRight(model.currentCorrectAnswer, model.numberQuestionOfLesson)
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
    leftBlockChain.clear()
    rightBlockChain.clear()
    leftGroup.clear()
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
            view.moveBallLeft(model.currentCorrectAnswer, model.numberQuestionOfLesson)
        }
        displaySuggestion()
            .then(resolve)
    })
}

function displaySuggestion() {
    let bigger, smaller
    if (leftBlockChain.amount > rightBlockChain.amount){
        bigger = leftBlockChain
        smaller = rightBlockChain
    }else{
        bigger = rightBlockChain
        smaller = leftBlockChain
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
    currentQuestion = question
    clearQuestion()
    renderRightBlocks(question['first'])
    renderLeftBlocks(question['second'])
    view.setupBeforeAnswer(advanceMode)
}

function renderRightBlocks(number) {
    if (!advanceMode) {
        rightGroup.domElement.style.display = 'none'
        for (let i = 0; i < number; i++)
            rightBlockChain.addItemOrdered()
    }else{
        rightGroup.domElement.style.display = 'block'
        for (let i = 0; i < number; i++)
            rightGroup.addItemUnordered()
    }
}

function renderLeftBlocks(number) {
    for (let i = 0; i < number; i++)
        leftGroup.addItemUnordered()
}

function listenMoveBlockEvent(){
    Array.from(leftGroup.domElement.getElementsByClassName('draggable'))
        .forEach(ele => ele.addEventListener('mousedown',() => startMoving(ele, leftGroup, leftBlockChain)))
    Array.from(rightGroup.domElement.getElementsByClassName('draggable'))
        .forEach(ele => ele.addEventListener('mousedown',() => startMoving(ele, rightGroup, rightBlockChain)))
    let interval = setInterval(()=>{
        if (rightGroup.amount === 0 && leftGroup.amount === 0){
            clearInterval(interval)
            view.displayRequestNext(advanceMode)
        }
    }, 300)
}

function startMoving(self, src, dest) {
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
        if (dest.cover(position) && src.contain(self)){
            src.remove(self)
            dest.addItemOrdered(self)
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