numberQuestionOfLesson = document.getElementById("trueAnswerRequired").value
currentCorrectAnswer = 0
isFirstAnswer = true

isFinish = function () {
    return this.currentCorrectAnswer === parseInt(this.numberQuestionOfLesson);
}

let container = document.getElementById('under-start-wall')
let containerSize = container.getBoundingClientRect()

window.addEventListener('resize', ()=> containerSize = container.getBoundingClientRect())

const xSign = document.createElement('div')
xSign.setAttribute('class', 'item x-sign')

const train = document.createElement('div')
train.setAttribute('class', 'item train_car')

const block = document.createElement('div')
block.setAttribute('class', 'item block')

const ball = document.createElement('div')
ball.setAttribute('class', 'ball')

const greenArrow = document.createElement('div')
greenArrow.setAttribute('class', 'item arrow green-arrow')

const redArrow = document.createElement('div')
redArrow.setAttribute('class', 'item arrow red-arrow')

ItemChain = function(classList, id = null){
    let self = this
    const standardDistance = 46
    const maxAmount = 6

    this.root = (id !== null)? document.getElementById(id):document.createElement('div')
    this.classAttr = 'item ' + classList.join(' ')
    this.component = document.createElement('div')
    this.component.setAttribute('class', self.classAttr)
    this.amount = 0

    this.appendItem = function(item = null){
        if (self.amount === maxAmount) return;
        self.root.appendChild(item || self.instance())
        self.amount++
    }

    this.insertElementToItem = function (itemIndex, newElement = null) {
        let collection = this.root.getElementsByClassName('rails')
        collection.item(itemIndex).appendChild(newElement)
    }

    this.instance = function(){
        return self.component.cloneNode()
    }

    this.addItemOrdered = function(item = null){
        item = item || this.instance()
        self.appendItem(item)
        self.setOrderedPosition(item)
    }

    this.setOrderedPosition = function(newItem){
        let startHeight = self.root.offsetTop + self.root.offsetHeight
        newItem.style.top = (startHeight - standardDistance *self.amount)  + 'px'
        newItem.style.left = 'auto'
    }

    this.addItemUnordered = function(item = null) {
        item = item || self.instance()
        self.appendItem(item)
        self.setRandomPosition(item)
    }

    this.setRandomPosition = function(newItem){
        let minX = self.root.offsetLeft
        let maxX = self.root.offsetLeft + self.root.offsetWidth - 60
        let minY = self.root.offsetTop
        let maxY = self.root.offsetTop + self.root.offsetHeight - 60
        let left, top
        do {
            left = between(minX, maxX)
            top = between(minY, maxY)
        }while (!positionEmpty(left + containerSize.left, top + containerSize.top))
        newItem.style.left = left
        newItem.style.top = top
    }

    function between(min, max) {
        return (Math.random()*(max - min) + min)|0
    }

    function positionEmpty(x, y) {
        if (self.root.getElementsByClassName('item').length === 0) return true
        let allItems = Array.from(self.root.getElementsByClassName('item'))
        for (let item of allItems){
            if (itemCoverPosition(item, x, y) ||
                itemCoverPosition(item, x + 60, y) ||
                itemCoverPosition(item, x, y + 60) ||
                itemCoverPosition(item, x + 60, y + 60))
                return false
        }
        return true
    }

    function itemCoverPosition(item, x, y) {
        let rect = item.getBoundingClientRect()
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)
            return true
    }

    this.fillUp = function () {
        for (let i = 0; i< maxAmount; i++)
            self.appendItem()
    }

    this.removeComponent = function(element){
        this.root.removeChild(element)
        this.amount--
    }

    this.reArrangeItems = function () {
        let collection = Array.from(this.root.getElementsByClassName('item'))
        self.clear()
        collection.forEach(ele => self.addItemOrdered(ele))
    }

    this.coverPosition = function (position) {
        let x = position.x
        let y = position.y
        return itemCoverPosition(self.root, x, y)
    }

    this.containElement = function(element){
        return element.parentNode === self.root
    }

    this.isTargeted = function(event){
        return self.coverPosition({
            x: event.pageX,
            y: event.pageY
        })
    }

    this.findTarget = function(event){
        for (let element of Array.from(self.root.getElementsByClassName('rails'))){
            if (itemCoverPosition(element, event.pageX, event.pageY)) return element
        }
    }

    this.addXSign = function(){
        self.appendItem(xSign.cloneNode())
    }

    this.addXSignOrdered = function () {
        self.addItemOrdered(xSign.cloneNode())
    }

    this.addXSignInIndex = function (index) {
        self.insertElementToItem(index, xSign.cloneNode())
    }

    this.empty = function () {
        return this.amount === 0
    }

    this.clear = function(){
        this.amount = 0
        this.root.innerHTML = ''
    }

    this.clearItem = function (type) {
        Array.from(self.root.getElementsByClassName(type)).forEach(item=>{
            if (item.parentNode === self.root) self.amount--
            item.parentNode.removeChild(item)
        })
    }
}

Trash = function(classList, id = null){
    ItemChain.apply(this, [classList, id])

    this.appendItem = function (item) {
        return false
    }
}

VerticalItemChain = function (classList, id = null) {
    ItemChain.apply(this, [classList, id])

    this.reverseArrangeTrain = function () {
        let collection = Array.from(this.root.getElementsByClassName('train_car')).reverse()
        collection.forEach(train => {train.parentNode.removeChild(train)})
        for (let i = 0; i < collection.length; i++){
            this.insertElementToItem(4 - i, collection[i])
        }
    }
}

ArrowChain = function (classList, id = null) {
    ItemChain.apply(this, [classList, id])
    this.addRedArrowOrdered = function () {
        this.addItemOrdered(redArrow.cloneNode())
    }

    this.addGreenArrowOrdered = function () {
        this.addItemOrdered(greenArrow.cloneNode())
    }

    this.addGreenArrow = function () {
        this.appendItem(greenArrow.cloneNode())
    }

    this.addRedArrow = function () {
        this.appendItem(redArrow.cloneNode())
    }
}

