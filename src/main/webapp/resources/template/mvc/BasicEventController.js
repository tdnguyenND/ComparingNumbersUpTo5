Application = function () {
    let self = this;
    let backButton = document.getElementById('back-btn')
    let startButton = document.getElementById('start-lesson')
    let countTrueAnswer = 0
    const submitAnswerDelay = 1500

    const listBall = document.getElementById('list-ball')

    this.advanceMode = false

    this.setUpPointBar = function () {
        for (let i = 0; i < numberQuestionOfLesson; i++) {
            let newBall = ball.cloneNode()
            newBall.id = 'ball_' + i
            newBall.style.left = (4 + i * 24) + 'px'
            listBall.appendChild(newBall)
        }
    }

    this.launch = function () {
        this.setUpPointBar()
        self.newQuestion()
        self.listenBasicEvent()
        self.answerButtons.forEach(btn => btn.addEventListener('click', self.submitAnswer))
    }

    this.newQuestion =function(){
        isFirstAnswer = true
        self.clear()
        getQuestionFromServer()
            .then(response => {
                self.answerRenderer(response.data)
            })
    }

    this.hideAnswer = function () {
        self.answerButtons.forEach(btn=>btn.parentElement.style.display = 'none')
    }

    this.showAnswer = function () {
        self.answerButtons.forEach(btn=>btn.parentElement.style.display = 'block')
    }

    this.listenBasicEvent = function(){
        backButton.addEventListener('click', back)
        startButton.addEventListener('click', start)
    }

    function back(){
        window.location = '/'
    }

    function start(){
        setUpAnswerScene()
    }

    this.beforeSubmit = function() {
        self.disableBehavior()
    }

    this.submitAnswer = function(){
        self.beforeSubmit();
        submitAnswerToServer(self.getAnswer(this))
            .then(response => self.handleResult(this, response.data))
            .then(self.afterSubmit)
    }

    this.afterSubmit = function(){
        self.enableBehavior()
    }

    this.disableBehavior = function() {
        container.style.pointerEvents = 'none'
    }

    this.enableBehavior = function() {
        container.style.pointerEvents = ''
    }

    this.handleResult = function(chosenAnswer, result){
        updateModel(result)
        return new Promise(resolve => {
            if (result) {
                setCorrectAnswerColor(chosenAnswer)
                self.correctHandler()
                    .then(checkFinishStage)
                    .then(self.newQuestion)
                    .then(finishChecking)
            }
            else {
                setIncorrectAnswerColor(chosenAnswer)
                self.incorrectHandler()
                    .then(finishChecking)
            }
            function finishChecking() {
                setDefaultAnswerColor(chosenAnswer)
                resolve()
            }
        })
    }

    this.correctHandler = function() {
        countTrueAnswer++
        if (countTrueAnswer >= self.changeModePoint) self.advanceMode = true
        return new Promise((resolve, reject) => {
            setTimeout(resolve, submitAnswerDelay)
        })
    }

    this.incorrectHandler = function (){
        return new Promise((resolve, reject) => {
            app.displaySuggestion(self.advanceMode)
                .then(resolve)
        })
    }

    function updateModel(result){
        if (!isFirstAnswer) return
        if (result){
            currentCorrectAnswer++
            moveBallRight(currentCorrectAnswer, numberQuestionOfLesson)
        }else {
            isFirstAnswer = false
            if (currentCorrectAnswer > 0) currentCorrectAnswer--
            moveBallLeft(currentCorrectAnswer, numberQuestionOfLesson)
        }
    }

    function checkFinishStage(){
        return new Promise((resolve, reject) => {
            if (isFinish()) window.location = "/completed"
            resolve()
        })
    }

    this.clearQuestion = function() {
        self.firstItemChain.clear()
        self.secondItemChain.clear()
    }

    this.clear = function () {
        self.clearQuestion()
    }
}