let app = new function () {
    this.firstItemChain = new ItemChain(['block'], 'first-chain')
    this.secondItemChain = new ItemChain(['block'], 'second-chain')
    this.arrowChain = new ArrowChain(['arrow'], 'arrows')
    this.secondDraggableItemArea = new ItemChain(['block', 'draggable'], 'factory')
    this.trash = new Trash(['block', 'draggable'], 'trash')
    this.answerRenderer = renderQuestion
    this.answerButtons = ['submitAnswer'].map(id => document.getElementById(id))
    this.getAnswer = getAnswer
    this.changeModePoint = 3

    HorizontalChainDragGame.apply(this)
}

app.launch()

setInterval(()=>{
    if (app.secondDraggableItemArea.empty()) {
        app.secondDraggableItemArea.appendItem()
        app.listenMoveBlockEvent()
    }
    if (!app.secondItemChain.empty()){
        Array.from(app.secondItemChain.root.getElementsByClassName('item'))
            .forEach(ele=> {
                ele.onmousedown = function f() {
                    app.clearSuggestion()
                    let moveFunction = function(dragElement, src, dest, f){
                        startMoving.apply(this, [dragElement, src, dest, f])
                        let self = this
                        this.putDown = function (event) {
                            if (dest.isTargeted(event)){
                                src.removeComponent(dragElement)
                                src.reArrangeItems()
                                dragElement.style = ''
                                dragElement.removeEventListener('mousedown',f)
                                dest.addItemOrdered(dragElement)
                            }else self.returnToLastPosition()
                        }

                    }
                    moveFunction(ele, app.secondItemChain, app.trash, f)
                }
            })
    }
}, 100)

function renderQuestion(question) {
    renderFirstChain(question['fixedNumber'])
    app.listenMoveBlockEvent()
}

function renderFirstChain(number) {
    for (let i = 0; i < number; i++) {
            app.firstItemChain.addItemOrdered()
    }
}

function getAnswer(btn) {
    return app.secondItemChain.amount
}