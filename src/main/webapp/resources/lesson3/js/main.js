let app = new function () {
    this.firstItemChain = new ItemChain(['block'], 'first-chain')
    this.secondItemChain = new ItemChain(['block'], 'second-chain')
    this.firstDraggableItemArea = new ItemChain(['block', 'draggable'], 'first-draggable-area')
    this.secondDraggableItemArea = new ItemChain(['block', 'draggable'], 'second-draggable-area')
    this.arrowChain = new ArrowChain(['arrow'], 'arrows')
    this.answerRenderer = renderQuestion
    this.answerButtons = ['answer1', 'answer2', 'answer3'].map(id => document.getElementById(id))
    this.getAnswer = getAnswer
    this.changeModePoint = 2

    HorizontalChainDragGame.apply(this)

    let superSuggestion = this.displaySuggestion
    this.displaySuggestion = function () {
        if (!(app.firstDraggableItemArea.amount === 0 && app.secondDraggableItemArea.amount === 0)){
            return new Promise(resolve => {
                this.hideAnswer()
                resolve()
            })
        }else return superSuggestion()
    }
}

app.launch()
let i = setInterval(()=>{
    if (app.advanceMode){
        document.getElementById('second-draggable-area').style.display = 'block'
        let floor = document.querySelector('.aside_right .floor')
        floor.classList.remove('small--floor')
        floor.classList.add('big--floor')
        clearInterval(i)
    }
}, 200)

function renderQuestion(question) {
    renderFirstChain(question['first'])
    renderSecondChain(question['second'])

    setupBeforeAnswer(app.advanceMode)

    let i = setInterval(()=>{
        if (app.firstDraggableItemArea.amount === 0 && app.secondDraggableItemArea.amount === 0) {
            displayRequestNext(app.advanceMode)
            app.showAnswer()
            clearInterval(i)
        }
    }, 100)
    if (!app.advanceMode) app.hideAnswer()
}

function renderFirstChain(number) {
    for (let i = 0; i < number; i++)
        app.firstDraggableItemArea.addItemUnordered()
}

function renderSecondChain(number) {
    if (app.advanceMode) {
        for (let i = 0; i < number; i++)
            app.secondDraggableItemArea.addItemUnordered()
    }else{
        for (let i = 0; i < number; i++)
            app.secondItemChain.addItemOrdered()
    }
}

function getAnswer(btn) {
    return btn.dataset.value
}

function displayRequestNext(advanceMode) {
    document.querySelector('.caption_two').style.visibility = 'hidden'
    document.querySelector('.caption_one').style.color = 'black'
    document.getElementById('first-chain').style.backgroundImage = 'none'
    if (advanceMode)
        document.getElementById('second-chain').style.backgroundImage = 'none'
}
function setupBeforeAnswer(advanceMode) {
    document.querySelector('.caption_two').style.visibility = 'visible'
    document.querySelector('.caption_one').style.color = 'rgba(0,0,0,.3)'
    document.getElementById('first-chain').style.backgroundImage = `url('../resources/images/28.png')`
    let areaBlock = document.getElementById('second-draggable-area')
    let floor = document.querySelector('.aside_right .floor')
    if (advanceMode){
        document.getElementById('second-chain').style.backgroundImage = `url('../resources/images/28.png')`
        floor.className = 'floor big--floor'
        areaBlock.style.display = 'block'
    } else {

    }
}