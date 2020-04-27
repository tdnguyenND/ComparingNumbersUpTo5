let app = new function () {
    this.firstItemChain = new VerticalItemChain(['rails'], 'first-train')
    this.secondItemChain = new VerticalItemChain(['rails'], 'second-train')
    this.firstDraggableItemArea = new VerticalItemChain(['train_car', 'draggable'], 'group-train')
    this.secondDraggableItemArea = null
    this.arrowChain = new ArrowChain(['arrow'], 'arrows')
    this.answerRenderer = renderQuestion
    this.answerButtons = ['answer1', 'answer2', 'answer3'].map(id => document.getElementById(id))
    this.getAnswer = getAnswer
    this.changeModePoint = 3

    VerticalChainDragGame.apply(this)
}
app.launch()
setInterval(()=>{
    if (app.firstDraggableItemArea.amount === 0) app.showAnswer()
}, 100)

function renderQuestion(question){
    // if (!app.advanceMode){
    //     app.hideAnswer()
    // }
    app.hideAnswer()
    renderUnfixedChain(question['first'])
    renderFixedChain(question['second'])
    setupBeforeAnswer(question)

    let i = setInterval(()=>{
        if (app.firstDraggableItemArea.amount === 0) {
            displayRequestNext()
            app.showAnswer()
            clearInterval(i)
        }
    }, 100)
    // if (!app.advanceMode) app.hideAnswer()
    app.hideAnswer()
}

function renderFixedChain(number) {
    for (let i = 0; i < number; i++) {
        app.secondItemChain.appendItem() //add rail
        let trainToAdd = train.cloneNode()
        if (app.advanceMode) trainToAdd.classList.add('train_car_' + (Math.random() * 4 | 0))
        app.secondItemChain.insertElementToItem(i, trainToAdd)
    }
}

function renderUnfixedChain(number) {
    app.firstItemChain.fillUp()
    for (let i = 0; i < number; i++)
        if (!app.advanceMode) app.firstDraggableItemArea.addItemUnordered()
        else {
            let trainToAdd = train.cloneNode()
            trainToAdd.classList.add('train_car_' + (Math.random() * 4 | 0))
            trainToAdd.classList.add('draggable')
            app.firstDraggableItemArea.addItemUnordered(trainToAdd)
        }
}

function getAnswer(button) {
    return button.dataset.value
}

function displayRequestNext() {
    document.querySelector('.caption_two').style.visibility = 'hidden'
    document.querySelector('.caption_one').style.color = 'black'
}

function setupBeforeAnswer(question) {
    document.querySelector('.caption_two').style.visibility = 'visible'
    document.querySelector('.caption_one').style.color = 'rgba(0,0,0,.3)'
    document.getElementById('arrows').className = 'arrows d-flex'
    let trainBelow =  document.querySelector('.train_below')
    let marginLeft = 95
    if(question['first'] >= question['second']){
        marginLeft =  marginLeft + 60 * Math.abs(5 - question['first'])
    } else{
        marginLeft =  marginLeft + 60 * Math.abs(5 - question['second'])
    }
    trainBelow.style.marginLeft = marginLeft + 'px'
}