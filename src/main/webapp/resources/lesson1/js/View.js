View = function(){
    let model = null;
    let controller = null;
    let components = null;
    let isFirstAnswer = true;
    let listAnswer = null;
    let chosenAnswerID = null;

    let self = this;


    this.initializeVariable = function () {
        model = new Model();
        model.numberQuestionOfLesson = document.getElementById("trueAnswerRequired").value
        controller = new Controller()
        controller.stageID = window.location.pathname.match(/\/lesson\/(?<stageID>\d+)$/).groups.stageID
        listAnswer = ["answerA", "answerB"].map(id=> document.getElementById(id))
    }

    this.launch = function(){
        self.initializeVariable();
        self.newQuestion();
        document.getElementById("start-lesson").onclick = () => self.startLesson();
        document.getElementById("back-btn").onclick = () => {window.location.href ="../../.."}
    };

    this.newQuestion = function() {
         controller.getQuestion()
            .then(response => {
                model.saveCurrentQuestion(response.data);
                self.displayQuestion();
                isFirstAnswer = true;
            })
    };

    this.displayQuestion = function() {
        document.getElementById("arrows").innerHTML = ""

        self.drawBlocks(document.getElementById("list-block-one"), model.currentQuestion.first)
        self.drawBlocks(document.getElementById("list-block-two"), model.currentQuestion.second)
    };

    this.drawBlocks = function(drawElement, numberOfBlock) {
        let html = ""
        for (let i = 0; i < numberOfBlock; i++) {
            html += `<img class="block block_${i}" src="../resources/images/block.png" alt="">`
        }
        drawElement.innerHTML = html
    };

    this.startLesson = function() {
        self.setUpAnswerScene();
        listAnswer.forEach(self.addOnclickEventForAnswer)
    }

    this.setUpAnswerScene = function() {
        document.getElementById("start-wall").style.display = "none"
        document.getElementById("under-start-wall").setAttribute("class", "scene_under_start")
    };

    this.addOnclickEventForAnswer= function(answerElement){
        answerElement.onclick = function() {
            self.disableAnswerButton();
            chosenAnswerID = answerElement.id;
            controller.submitAnswer(answerElement.dataset.value)
                .then((response) => {
                    self.handleResult(response.data)
                        .then(self.enableAnswerButton)
                })
        }
    }

    this.handleResult = function(result) {
        return new Promise(function(resolve, reject){
            if (result) {
                self.handleTrueAnswer()
                    .then(self.checkStageFinish)
                    .then(self.newQuestion)
                    .then(resolve)
            } else {
                self.handleFalseAnswer()
                    .then(()=> isFirstAnswer = false)
                    .then(resolve)
            }
        })
    };

    this.handleTrueAnswer= function(){
        return new Promise(function(resolve, reject){
            self.setBackground(chosenAnswerID, "rgb(106, 219, 72)")
            if (isFirstAnswer) {
                let ml = 440 - 24 * model.numbersOfAnswerTrue
                document.getElementById(`ball_${model.numbersOfAnswerTrue}`).style.left = ml.toString() + "px";
                model.numbersOfAnswerTrue++;
            }
            setTimeout(resolve, 1500)
        })
    }

    this.handleFalseAnswer = function(){
        return new Promise(function(resolve, reject){
            self.setBackground(chosenAnswerID, "#FF5D6A")
            if(isFirstAnswer && model.numbersOfAnswerTrue > 0){
                model.numbersOfAnswerTrue--;
                let ml = 124 - 24 * model.numbersOfAnswerTrue
                document.getElementById(`ball_${model.numbersOfAnswerTrue}`).style.left = ml.toString() + "px";
            }
            if(!isFirstAnswer){
                self.displayQuestion();
            }
            self.displaySuggestion().then(resolve);
        })
    }

    this.enableAnswerButton = function(){
        self.setBackground(chosenAnswerID, "#6ec3e2")
        listAnswer.forEach(ans => {ans.disabled = false})
    }

    this.disableAnswerButton = function(){
        listAnswer.forEach(ans => {ans.disabled = true})
    };

    this.displaySuggestion = function(){
        return new Promise(function (resolve, reject) {
            let columnA = model.currentQuestion.first;
            let columnB = model.currentQuestion.second;
            let arrows = document.getElementById("arrows");
            let max, min, col;
            if(columnA > columnB){
                max = columnA;
                min = columnB;
                col = document.getElementById("list-block-two")
            } else{
                max = columnB;
                min = columnA;
                col = document.getElementById("list-block-one")
            }
            let i = 0;
            let intervalId = setInterval(() => {
                if(i < min){
                    let htmlOfArrow = arrows.innerHTML;
                    htmlOfArrow += `<img class="arrows_list--item__green arrows_item_${i}" src="../resources/images/31.png" alt="">`
                    arrows.innerHTML = htmlOfArrow
                } else{
                    let htmlOfArrow = arrows.innerHTML;
                    htmlOfArrow += `<img class="arrows_list--item__red arrows_item_${i}" src="../resources/images/33.png" alt="">`
                    arrows.innerHTML = htmlOfArrow

                    let htmlOfCol = col.innerHTML
                    htmlOfCol += `<img class="block block_${i}" src="../resources/images/71.png" alt="" style="width: 53px; height: 53px;">`
                    col.innerHTML = htmlOfCol
                }
                i++;
                if(i >= max){
                    clearInterval(intervalId);
                    resolve();
                }
            }, 1000)
        });
    };

    this.setBackground = function(idElement, background){
        document.getElementById(idElement).style.background = background
    };

    this.checkStageFinish = function(){
        if (model.finish()) {
            window.location = "/completed"
        }
    };
};