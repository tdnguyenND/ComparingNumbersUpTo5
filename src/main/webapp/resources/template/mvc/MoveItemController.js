function startMoving(dragElement, src, dest, srcFunction) {
    let self = this
    let previousZIndex = dragElement.style.zIndex
    dragElement.style.zIndex = '1000'

    let previousPosition = saveLastPosition()

    function saveLastPosition() {
        return {
            left: dragElement.style.left,
            top: dragElement.style.top
        }
    }

    document.addEventListener("mousemove", followCursor)
    document.addEventListener("mouseup", dropItem)

    function followCursor(event) {
        let position = getCursorPositionWithContainer(event)
        moveTo(position)
    }

    function getCursorPositionWithContainer(event) {
        let x = event.pageX
        let y = event.pageY
        let mouseX = Math.min(Math.max(x - containerSize.left - dragElement.offsetWidth / 2, 0), containerSize.width - dragElement.offsetWidth)
        let mouseY = Math.min(Math.max(y - containerSize.top - dragElement.offsetHeight / 2, 0), containerSize.height - dragElement.offsetHeight)
        return {
            x: mouseX,
            y: mouseY
        }
    }

    function moveTo(position) {
        setPosition(position.x + 'px', position.y + 'px')
    }

    function setPosition(left, top) {
        dragElement.style.left = left
        dragElement.style.top = top
    }

    function dropItem(event) {
        self.putDown(event)
        removeEventListener()
    }

    this.putDown = function(event) {
        if (dest.isTargeted(event)){
            src.removeComponent(dragElement)
            dragElement.style = ''
            dragElement.removeEventListener('mousedown',srcFunction)
            dest.addItemOrdered(dragElement)
        }else self.returnToLastPosition()
    }

    this.returnToLastPosition = function() {
        setPosition(previousPosition.left, previousPosition.top)
        dragElement.style.zIndex = previousZIndex
    }

    function removeEventListener() {
        document.removeEventListener("mousemove", followCursor)
        document.removeEventListener("mouseup", dropItem)
    }
}

function startMovingForTrain(dragElement, src, dest, srcFunction){
    startMoving.apply(this, [dragElement, src, dest, srcFunction])
    this.putDown = function(event) {
        if (dest.isTargeted(event)) {
            let target = dest.findTarget(event)
            if (target.getElementsByClassName('train_car').length !== 0) {
                this.returnToLastPosition()
            } else {
                src.removeComponent(dragElement)
                dragElement.style = ''
                dragElement.removeEventListener('mousedown',srcFunction)
                target.appendChild(dragElement)
            }
        } else this.returnToLastPosition()
    }
}

DragGame = function () {
    Application.apply(this)
    let self = this

    let superRenderAnswer = this.answerRenderer
    this.answerRenderer = function (question) {
        superRenderAnswer(question)
        self.listenMoveBlockEvent()
    }

    let superClearQuestion = this.clearQuestion
    this.clearQuestion = function () {
        superClearQuestion()
        if (self.firstDraggableItemArea) self.firstDraggableItemArea.clear()
        if (self.secondDraggableItemArea) self.secondDraggableItemArea.clear()
    }

    this.listenMoveBlockEvent = function() {
        if (self.firstDraggableItemArea && self.firstDraggableItemArea.root) {
            Array.from(self.firstDraggableItemArea.root.getElementsByClassName('draggable')).forEach(ele => {
                ele.addEventListener('mousedown', function func() {
                    self.clearSuggestion()
                    self.moveFunction(ele, self.firstDraggableItemArea, self.firstItemChain, func)
                })
            })
        }
        if (self.secondDraggableItemArea && self.secondDraggableItemArea.root){
            Array.from(self.secondDraggableItemArea.root.getElementsByClassName('draggable')).forEach(ele => {
                ele.addEventListener('mousedown',function func () {
                    self.clearSuggestion()
                    self.moveFunction(ele, self.secondDraggableItemArea, self.secondItemChain, func)
                })
            })
        }
    }
}
HorizontalChainDragGame = function(){
    DragGame.apply(this)
    let superRenderAnswer = this.answerRenderer
    let superClearQuestion = this.clearQuestion
    HorizontalChainSuggestedApplication.apply(this)

    this.answerRenderer = superRenderAnswer
    this.clearQuestion = superClearQuestion

    this.moveFunction = startMoving
}


VerticalChainDragGame = function () {
    DragGame.apply(this)
    let superRenderAnswer = this.answerRenderer
    let superClearQuestion = this.clearQuestion
    VerticalChainSuggestedApplication.apply(this)

    this.answerRenderer = superRenderAnswer
    this.clearQuestion = superClearQuestion

    this.moveFunction = startMovingForTrain
}