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