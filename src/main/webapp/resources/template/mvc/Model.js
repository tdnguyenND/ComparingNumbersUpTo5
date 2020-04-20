
Model = function() {
    this.numberQuestionOfLesson = document.getElementById("trueAnswerRequired").value
    this.currentQuestion = null
    this.currentCorrectAnswer = 0

    this.saveCurrentQuestion = function(question){
        this.currentQuestion = question
    }

    this.isFinish = function () {
        return this.currentCorrectAnswer === parseInt(this.numberQuestionOfLesson);
    }
}

ItemChain = function(type, id = null, option = null){
    let self = this
    let standardDistance = 46
    let allInstances = []
    allInstances.push(self)

    this.classes = ['item', type]

    if (option !== null){
        this.classes = this.classes.concat(option)
    }

    this.domElement = (id !== null)? document.getElementById(id):document.createElement('div')
    this.amount = 0
    this.instance = document.createElement('div')
    this.classes.forEach(cl => this.instance.classList.add(cl))

    this.maxAmount = 6

    this.addItemOrdered = function(itemAdded, option = null) {
        itemAdded = itemAdded || self.instance.cloneNode()
        if (option !== null){
            option.forEach(opt => itemAdded.classList.add(opt))
        }
        self.domElement.appendChild(itemAdded)
        setOrderedPosition(itemAdded)
        self.amount++
    }

    let setOrderedPosition = function(newItem){
        let startHeight = self.domElement.offsetTop + self.domElement.offsetHeight - 60
        newItem.style.top = (startHeight - standardDistance * self.amount)  + 'px'
        newItem.style.left = 'auto'
    }

    this.addItemUnordered = function(item = null, option = null) {
        item = item||self.instance.cloneNode()
        if (option !== null){
            option.forEach(opt => item.classList.add(opt))
        }
        self.domElement.appendChild(item)
        setRandomPosition(item)
        self.amount++
    }

    let setRandomPosition = function(newItem){

    }

    this.appendChain = function(chain){
        self.domElement.insertBefore(chain.domElement, self.domElement.firstChild)
    }

    this.removeChain = function (chain) {
        self.domElement.removeChild(chain.domElement)
    }

    this.setMaxAmount = function (amount) {
        this.maxAmount = amount
        this.domElement.style.height = (this.maxAmount * standardDistance) + 'px'
    }

    this.remove = function(domElement){
        //this.domElement.removeChild(domElement)
    }

    this.cover = function (position) {
        let x = position.x
        let y = position.y
        let elementLocation = self.domElement.getBoundingClientRect()
        return (x > elementLocation.left && x < elementLocation.right &&
            y > elementLocation.top && y < elementLocation.bottom)
    }

    this.contain = function(element){
        return element.parentNode === self.domElement
    }
    this.clear = function(){
        this.amount = 0
        this.setMaxAmount(6)
        this.domElement.innerHTML = ''
    }

    ItemChain.getContainer = function (element) {
        for (let instance of allInstances){
            if (instance.contain(element)) return instance
        }
    }
}

VerticalItemChain = function (type, id = null, option = null) {
    let self = this

    this.classes = ['item', type]
    if (option !== null){
        this.classes = this.classes.concat(option)
    }

    this.domElement = (id !== null)? document.getElementById(id):document.createElement('div')
    this.amount = 0
    this.instance = document.createElement('div')
    this.classes.forEach(cl => this.instance.classList.add(cl))

    this.addItem = function (option = null) {
        let item = this.instance.cloneNode()
        if (option!== null)
            option.forEach(c => item.classList.add(c))
        this.domElement.appendChild(item)
    }

    this.addItemUnordered = function(item = null, option = null) {
        item = item||self.instance.cloneNode()
        if (option !== null){
            option.forEach(opt => item.classList.add(opt))
        }
        self.domElement.appendChild(item)
        setRandomPosition(item)
        self.amount++
    }

    let setRandomPosition = function(newItem){

    }

    this.isTargeted = function(event){
        return this.cover({
            x: event.pageX,
            y: event.pageY
        })
    }

    this.cover = function (position, element = self.domElement) {
        let x = position.x
        let y = position.y
        let elementLocation = element.getBoundingClientRect()
        return (x > elementLocation.left && x < elementLocation.right &&
            y > elementLocation.top && y < elementLocation.bottom)
    }

    this.contain = function(element){
        return element.parentNode === this.domElement
    }

    this.findTarget = function(event){
        let pos = {
            x: event.pageX,
            y: event.pageY
        }
        for (let element of Array.from(self.domElement.getElementsByClassName('rails'))){
            if (self.cover(pos, element)) return element
        }
    }

    this.remove = function(domElement){
        this.domElement.removeChild(domElement)
    }

    this.clear = function(itemClass = null){
        if (itemClass === null) {
            this.amount = 0
            this.domElement.innerHTML = ''
        }else {
            Array.from(this.domElement.getElementsByClassName(itemClass)).forEach(item=>{
                item.parentNode.removeChild(item)
            })
        }
    }

    this.appendChain = function (chain) {
        this.domElement.appendChild(chain.domElement)
    }

    this.addXSign = function (index) {
        let xSign = document.createElement('div')
        xSign.setAttribute('class', 'item x-sign')
        let collection = this.domElement.getElementsByClassName('rails')
        if (index > collection.length){
            this.domElement.appendChild(xSign)
        }else {
            collection.item(5-index).appendChild(xSign)
        }
    }

    this.addItemWithSpecificClass = function (classList, random = false) {
        let item = this.instance.cloneNode()
        for (c of classList) {
            item.classList.add(c)
        }
        if (random){
            this.addItemUnordered(item)
        }else this.domElement.appendChild(item)
    }

    this.reverseArrangeTrain = function () {
        let collection = Array.from(this.domElement.getElementsByClassName('train_car'))
        collection.forEach(train => {train.parentNode.removeChild(train)})
        let rails = Array.from(this.domElement.getElementsByClassName('rails'))
        for (let i = 0; i < 5; i++){
            if (i >= collection.length) break
            rails[4 - i].appendChild(collection[i])
        }
    }
}