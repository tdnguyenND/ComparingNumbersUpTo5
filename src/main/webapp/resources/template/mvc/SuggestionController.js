suggestedApplication = function () {
    Application.apply(this)

    this.displaySuggestion = function () {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }

    this.clearSuggestion = function() {
        this.arrowChain.clear()
        this.firstItemChain.clearItem('x-sign')
        this.secondItemChain.clearItem('x-sign')
    }

    let superBeforeSubmit = this.beforeSubmit
    this.beforeSubmit = function () {
        superBeforeSubmit()
        this.clearSuggestion()
    }

    let superClearFunction = this.clear
    this.clear = function () {
        superClearFunction()
        this.clearSuggestion()
    }
}

HorizontalChainSuggestedApplication = function(){
    suggestedApplication.apply(this)
    let self = this

    this.calculateAmount = function () {
        let amount2 = this.secondItemChain.amount
        let amount1 = this.firstItemChain.amount
        if (amount1 > amount2){
            this.min = amount2
            this.max = amount1
            this.smaller = this.secondItemChain
        }else {
            this.min = amount1
            this.max = amount2
            this.smaller = this.firstItemChain
        }
    }
    this.displaySuggestion = function (advanceMode) {
        self.calculateAmount()
        return new Promise(resolve => {
            let i = 1
            let interval = setInterval(()=>{
                if (i <= self.min) self.arrowChain.addGreenArrowOrdered()
                else {
                    self.arrowChain.addRedArrowOrdered()
                    self.smaller.addXSignOrdered()
                }
                i++
                if (i > self.max){
                    clearInterval(interval)
                    resolve()
                }
            }, 1000)
        })
    }
}

VerticalChainSuggestedApplication = function () {
    suggestedApplication.apply(this)
    let self = this

    this.calculateAmount = function () {
        let amount2 = this.secondItemChain.root.getElementsByClassName('train_car').length
        let amount1 = this.firstItemChain.root.getElementsByClassName('train_car').length
        if (amount1 > amount2){
            this.min = amount2
            this.max = amount1
            this.smaller = this.secondItemChain
        }else {
            this.min = amount1
            this.max = amount2
            this.smaller = this.firstItemChain
        }
    }
    this.displaySuggestion = function (advanceMode) {
        self.calculateAmount()
        self.firstItemChain.reverseArrangeTrain()
        return new Promise(resolve => {
            if (advanceMode && !self.firstDraggableItemArea.empty()){
                self.hideAnswer()
                resolve()
            }else {
                let i = 1
                let interval = setInterval(() => {
                    if (i <= self.min) self.arrowChain.addGreenArrow()
                    else {
                        self.arrowChain.addRedArrow()
                        if (self.smaller === self.secondItemChain) {
                            self.smaller.addXSign()
                        } else {
                            self.smaller.addXSignInIndex(5 - i)
                        }
                    }
                    i++
                    if (i > self.max) {
                        clearInterval(interval)
                        resolve()
                    }
                }, 1000)
            }
        })
    }
}