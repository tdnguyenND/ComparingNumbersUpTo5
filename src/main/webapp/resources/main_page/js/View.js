View = function(model){
    this.model = model;
    this.controller = new Controller();
    let isFirstAnswer = true;
    let self = this;

    let answer1ID = "answerA";
    let answer2ID = "answerB";
    let chosenAnswerID = null;

    this.openPage = function(){
        self.getNewQuestion();
        let startBtn = document.getElementById("start-lesson");
        startBtn.onclick = () => self.startLesson();

        let backBtn = document.getElementById("back-btn")
        backBtn.onclick = () => {window.location = "../main"}
    };

    this.getNewQuestion = function() {
        self.controller.getQuestion()
            .then(response => {
                model.saveCurrentQuestion(response.data);
                self.displayCurrentQuestion();
            })
    };

    this.startLesson = function() {
        console.log("ok")
        self.openQuestion();
        let answerA = document.getElementById(answer1ID);
        answerA.onclick = () => {
            self.answerQuestion("BIGGER");
            chosenAnswerID = answer1ID
        };
        let answerB = document.getElementById(answer2ID);
        answerB.onclick = () => {
            self.answerQuestion("SMALLER")
            chosenAnswerID = answer2ID
        };
    };

    this.answerQuestion = function(answer) {
        self.controller.submitAnswer(answer)
            .then(response => self.handleResult(response.data));
    };

    this.openQuestion = function() {
        console.log("open question")
        let startWall = document.getElementById("start-wall")
        startWall.style.display = "none"
        let sceneUnderStart = document.getElementById("under-start-wall")
        sceneUnderStart.setAttribute("class", "scene_under_start")
    };

    this.displayCurrentQuestion = function() {
        console.log("display question")
        document.getElementById("arrows").innerHTML = ""
        document.getElementById("list-block-one").innerHTML = ""
        document.getElementById("list-block-two").innerHTML = ""

        let listBlockOne = document.getElementById("list-block-one")
        self.builtColumnOfBlock(listBlockOne, model.currentQuestion.first)

        let listBlockTwo = document.getElementById("list-block-two")
        self.builtColumnOfBlock(listBlockTwo, model.currentQuestion.second)
    };

    this.builtColumnOfBlock = function(columnId, numberOfBlock) {
        let html = ""
        for (let i = 0; i < numberOfBlock; i++) {
            html += `<img class="block block_${i}" src="../resources/main_page/images/block.png" alt="">`
        }
        columnId.innerHTML = html
    };

    this.handleResult = function(result) {
        if(result){
            self.setBackground(chosenAnswerID, "rgb(106, 219, 72)")
            setTimeout(() => {
                self.setBackground(chosenAnswerID, "#6ec3e2")
                self.getNewQuestion();

                if (self.model.finish()) {
                    window.location = "../completed"
                }
            }, 1500);

            if(isFirstAnswer){
                let ml = 440 - 24 * self.model.numbersOfAnswerTrue
                document.getElementById(`ball_${self.model.numbersOfAnswerTrue}`).style.left = ml.toString() + "px";
                self.model.numbersOfAnswerTrue++;
            }
            isFirstAnswer = true;
        } else{
            self.setBackground(chosenAnswerID, "#FF5D6A")
            setTimeout(() => {
                self.setBackground(chosenAnswerID, "#6ec3e2")
            }, 1500);

            if(isFirstAnswer && model.numbersOfAnswerTrue > 0){
                self.model.numbersOfAnswerTrue--;
                let ml = 124 - 24 * self.model.numbersOfAnswerTrue
                document.getElementById(`ball_${self.model.numbersOfAnswerTrue}`).style.left = ml.toString() + "px";
            }
            isFirstAnswer = false
            self.displaySuggestion(model.currentQuestion.first, model.currentQuestion.second)
        }
    };

    this.displaySuggestion = function(columnA, columnB){
        let arrows = document.getElementById("arrows")
        let max, min, col;
        if(columnA > columnB){
            max = columnA
            min = columnB
            col = document.getElementById("list-block-two")
        } else{
            max = columnB
            min = columnA
            col = document.getElementById("list-block-one")
        }

        let i = 0
        const intervalId = setInterval(() => {
            if(i < min){
                let htmlOfArrow = arrows.innerHTML
                htmlOfArrow += `<img class="arrows_list--item__green arrows_item_${i}" src="../resources/main_page/images/31.png" alt="">`
                arrows.innerHTML = htmlOfArrow
            } else{
                let htmlOfArrow = arrows.innerHTML
                htmlOfArrow += `<img class="arrows_list--item__red arrows_item_${i}" src="../resources/main_page/images/33.png" alt="">`
                arrows.innerHTML = htmlOfArrow

                let htmlOfCol = col.innerHTML
                htmlOfCol += `<img class="block block_${i}" src="../resources/main_page/images/71.png" alt="" style="width: 53px; height: 53px;">`
                col.innerHTML = htmlOfCol
            }
            i++;
            if(i >= max){
                clearInterval(intervalId);
            }
        }, 1000)
    };

    this.setBackground = function(idElement, background){
        console.log(background)
        document.getElementById(idElement).style.background = background
    };
};