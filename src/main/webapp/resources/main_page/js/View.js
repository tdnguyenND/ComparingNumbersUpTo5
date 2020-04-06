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
        isFirstAnswer = true
        if(result){
            self.setBackground(chosenAnswerID, "rgb(106, 219, 72)")
            setTimeout(() => {
                self.setBackground(chosenAnswerID, "#6ec3e2")
                self.getNewQuestion();

                if (self.model.finish()) {
                    window.location = "../completed"
                }
            }, 1500);
            let ml = 440 - 24 * self.model.numbersOfAnswerTrue
            document.getElementById(`ball_${self.model.numbersOfAnswerTrue}`).style.left = ml.toString() + "px";
            self.model.numbersOfAnswerTrue++;
        } else{
            self.setBackground(chosenAnswerID, "#FF5D6A")
            setTimeout(() => {
                self.setBackground(chosenAnswerID, "#6ec3e2")
            }, 1500);
            if (isFirstAnswer) {
                isFirstAnswer = false
                self.model.numbersOfAnswerTrue--;
                let ml = 124 - 24 * self.model.numbersOfAnswerTrue
                document.getElementById(`ball_${self.model.numbersOfAnswerTrue}`).style.left = ml.toString() + "px";

            }
            self.displaySuggestion(2, 5)
        }
    };

    this.displaySuggestion = function(columnA, columnB){
        //display arrow
        let html = ""
        let mediate = Math.abs(columnA - columnB)
        for(let i = 0; i < mediate; i ++){
            if(i < mediate){
                html += `<img class="arrows_list--item__green arrows_item_${i}" src="../resources/main_page/images/31.png" alt=""></img>`
            } else{
                html += `<img class="arrows_list--item__red arrows_item_${i}" src="../resources/main_page/images/33.png" alt="">`
            }
        }
        
        if(columnA > columnB){
            for(let i = mediate; i < columnA; i ++){
                html+= `<img class="arrows_list--item__red arrows_item_${i}" src="../resources/main_page/images/33.png" alt="">`
            }
        }

    };

    this.setBackground = function(idElement, background){
        console.log(background)
        document.getElementById(idElement).style.background = background
    };
};