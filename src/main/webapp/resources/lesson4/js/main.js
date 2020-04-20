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

let groupTrain = new VerticalItemChain('train_car', 'group-train', ['draggable'])
let fixedChain = new VerticalItemChain('rails', 'second-train')
let unfixedChain = new VerticalItemChain('rails', 'first-train')

let arrow = new VerticalItemChain('arrow', 'arrows')
let xSignChain = new VerticalItemChain('x-sign')

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
                .then(clearQuestion)
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
    groupTrain.clear()
}

function clearSuggestion() {
    arrow.clear()
    unfixedChain.clear('x-sign')
    fixedChain.clear('x-sign')
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
    unfixedChain.reverseArrangeTrain()
    let amount1 = unfixedChain.domElement.getElementsByClassName('train_car').length
    let amount2 = fixedChain.domElement.getElementsByClassName('train_car').length
    let min, max, smaller
    if (amount2 > amount1){
        min = amount1
        max = amount2
        smaller = unfixedChain
    }else {
        min = amount2
        max = amount1
        smaller = fixedChain
    }
    return new Promise((resolve, reject) => {
        let i = 1
        let interval = setInterval(()=>{
            if (i <= min) arrow.addItem(['arrow-green'])
            else {
                arrow.addItem(['arrow-red'])
                smaller.addXSign(i)
            }
            i++
            if (i > max){
                clearInterval(interval)
                resolve()
            }
        }, 1000)
    })
}

function newQuestion(){
    controller.getQuestion()
        .then(response => renderQuestion(response.data))
        .then(listenMoveBlockEvent)
}

function renderQuestion(question){
    renderUnfixedChain(question['first'])
    renderFixedChain(question['second'])
}

function renderFixedChain(number) {
    for (let i = 0; i < number; i++)
        fixedChain.addItem()
    Array.from(fixedChain.domElement.getElementsByClassName('rails')).forEach(rail=>{
        let train = document.createElement('div')
        train.classList.add('item')
        train.classList.add('train_car')

        rail.appendChild(train)
    })
}

function renderUnfixedChain(number) {
    for (let i = 0; i < 6; i++) unfixedChain.addItem()
    for (let i = 0; i < number; i++)
        groupTrain.addItemUnordered()
}

function listenMoveBlockEvent(){
    Array.from(groupTrain.domElement.getElementsByClassName('draggable'))
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

    function dropItem(event){
        putDown(event)
        removeEventListener()
    }

    function putDown(event) {
        if (unfixedChain.isTargeted(event)){
            let target = unfixedChain.findTarget(event)
            if (target.getElementsByClassName('train_car').length !== 0){
                returnToLastPosition()
            }else{
                groupTrain.remove(self)
                self.style = ''
                target.appendChild(self)
            }
        }else returnToLastPosition()
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