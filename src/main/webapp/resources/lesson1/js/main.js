let app = new function () {
    this.firstItemChain = new ItemChain(['block'], 'first-chain')
    this.secondItemChain = new ItemChain(['block'], 'second-chain')
    this.arrowChain = new ArrowChain(['arrow'], 'arrows')
    this.answerRenderer = renderQuestion
    this.answerButtons = ['answer1', 'answer2'].map(id => document.getElementById(id))
    this.getAnswer = getAnswer
    this.changeModePoint = 3

    HorizontalChainSuggestedApplication.apply(this)
}

app.launch()

function renderQuestion(question) {
    renderFirstChain(question['first'])
    renderSecondChain(question['second'])
}

function renderFirstChain(number) {
    for (let i = 0; i < number; i++) {
        if (!app.advanceMode) {
            app.firstItemChain.addItemOrdered()
        }else {
            let newBlock = block.cloneNode()
            newBlock.classList.add('type_' + (Math.random() * 3 | 0))
            app.firstItemChain.addItemOrdered(newBlock)
        }
    }
}

function renderSecondChain(number) {
    for (let i = 0; i < number; i++) {
        if (!app.advanceMode) {
            app.secondItemChain.addItemOrdered()
        }else {
            let newBlock = block.cloneNode()
            newBlock.classList.add('type_' + (Math.random() * 3 | 0))
            app.secondItemChain.addItemOrdered(newBlock)
        }
    }
}

function getAnswer(btn) {
    return btn.dataset.value
}