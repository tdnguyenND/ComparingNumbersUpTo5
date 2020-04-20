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
        self.amount --
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

    this.reverseArrangeTrain = function () {
        let collection = Array.from(this.domElement.getElementsByClassName('train_car'))
        let collection1 = Array.from(this.domElement.getElementsByClassName('rails'))
        let j = 0
        collection1.forEach(rails =>{
            let train = rails.querySelector('.train_car')
            if(train != null){
                train.style.right = j * 60 + 'px'
            }
            j ++
        })

        return new Promise(function(resolve, reject) {
            setTimeout(resolve, 100);
        }).then(function() {
            let i = 0
            collection.forEach(train => {
                train.style.right = i * 60 +  'px'
                i ++
            })
        });
    }

    this.jump = function () {
        let trains = Array.from(this.domElement.getElementsByClassName('train_car'))
        let max = trains.length
        localStorage.setItem('total', max.toString());
        return new Promise((resolve, reject) => {
            let i = 0
            let interval = setInterval(()=>{
                trains[i].style.animation = 'jump 1.25s'
                i++
                if (i >= max){
                    clearInterval(interval)
                    resolve()
                }
            }, 400)
        })
    }
}