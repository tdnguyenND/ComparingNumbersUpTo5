const model = new Model()
const view = new View()
const controller = new Controller()

let backButton = document.getElementById('back-btn')
let startButton = document.getElementById('start-lesson')
let submitAnswerButton = document.getElementById('submitAnswer')
let reworkButton = document.getElementById('reworkBtn')

const fixedChain = document.getElementById("list-block-one")
const unfixedChain = document.getElementById('list-block-two')

const factory = document.getElementById("factory")
const trash = document.getElementById("trash")

const submitAnswerDelay = 1500
let isFirstAnswer = true

let container = document.getElementById('under-start-wall')
let containerSize = container.getBoundingClientRect()

launch = function(){
    view.beforeBuildColumn()
    newQuestion()
    listenEvent()
    newBlock()
}
newBlock = function(){
    view.addBlockInto(factory, 'draggable')
    Array.from(factory.getElementsByClassName('draggable'))
        .forEach(element=>{
            element.addEventListener('mousedown', startMoving)
            element.addEventListener('dragstart', () => false)
        })
}
newQuestion = function(){
    controller.getQuestion()
        .then(response => {
            renderQuestion(response.data)
        })
}

renderQuestion = function(question){
    let numberOfUnfixedBlock = question['fixedNumber']
    for (let i = 0; i < numberOfUnfixedBlock; i++)
        view.addBlockInto(fixedChain)
    view.reArrangeItems(fixedChain, 'block')
}

listenEvent = function(){
    window.onresize = () => {
        containerSize = container.getBoundingClientRect()
    }

    backButton.addEventListener('click', back)
    startButton.addEventListener('click', start)
    submitAnswerButton.addEventListener('click', submitAnswer)
}

startMoving = function(){
    view.clearSuggestion()
    let self = this
    firstSetUp();
    let previousPosition = savePosition()
    document.addEventListener('mousemove', moveBlock)
    document.addEventListener('mouseup', dropBlock)

    function firstSetUp(){
        self.style.zIndex = '1000'
    }

    function savePosition(){
        return {
            x: self.style.left,
            y: self.style.top,
        }
    }

    function moveBlock(e){
        moveTo(e.pageX, e.pageY)
    }

    function moveTo(x, y){
        let newX = Math.min(Math.max(x - containerSize.left - self.offsetWidth/2, 0), containerSize.width - self.offsetWidth)
        let newY = Math.min(Math.max(y - containerSize.top - self.offsetHeight/2, 0), containerSize.height - self.offsetHeight)
        setLocation(newX, newY)
    }

    function setLocation(newX, newY){
        self.style.left = newX
        self.style.top = newY
    }

    function dropBlock(){
        let currentLocation = self.getBoundingClientRect()
        if (isInside(currentLocation, unfixedChain) && self.parentNode !== unfixedChain && view.getNumberBlockOfUnfixedBlockChain() < 6){
            self.parentNode.removeChild(self)
            self.removeAttribute('style')
            unfixedChain.appendChild(self)
            view.reArrangeItems(unfixedChain, 'block')
            newBlock()
        }else if (isInside(currentLocation, trash) && self.parentNode === unfixedChain){
            unfixedChain.removeChild(self)
            view.reArrangeItems(unfixedChain, 'block')
            view.blockInsideTrash()
            self.removeEventListener('mousedown', startMoving)
        } else{
            backToLastLocation()
        }
        document.removeEventListener('mousemove', moveBlock);
        document.removeEventListener('mouseup', dropBlock)
        if(self.parentNode !== factory) view.reArrangeItems(self.parentNode, 'block')
    }

    function backToLastLocation(){
        setLocation(previousPosition.x, previousPosition.y)
    }

    function isInside(position, element){
        let x = position.x
        let y = position.y
        let elementLocation = element.getBoundingClientRect()
        return (x > elementLocation.left && x < elementLocation.right && y > elementLocation.top && y < elementLocation.bottom)
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
}

disableSubmitAnswerButton = function(){
    document.getElementById('contextQuestion').style.pointerEvents = 'none'
    document.getElementById('factory').style.pointerEvents = 'none'
}

enableSubmitAnswerButton = function(){
    document.getElementById('contextQuestion').style.pointerEvents = ''
    document.getElementById('factory').style.pointerEvents = ''
}

handleResult = function(chosenAnswer, result){
    return new Promise((resolve, reject) => {
        if (result){
            correctAnswerHandle()
                .then(clear)
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

clear = function(){
    unfixedChain.innerHTML = ''
    fixedChain.innerHTML = ''
    document.querySelector('.context--trash__block > .block').style.visibility = 'hidden'
}

correctAnswerHandle = function () {
    enableSubmitAnswerButton()
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
        view.displaySuggestion()
            .then(view.reworkBtnAppear)
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