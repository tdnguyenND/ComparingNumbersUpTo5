View = function(model){
    this.model = model;
    this.controller = new Controller();
    var self = this;

    this.openPage = function(){
        self.getNewQuestion();
        
        let startBtn = document.getElementById("start-lesson");
        startBtn.onclick = () => self.startLesson();
    };

    this.startLesson = function() {
        console.log("ok")
        self.openQuestion();
        let answerA = document.getElementById("answerA");
        answerA.onclick = () => self.answerQuestion("answerA");
        let answerB = document.getElementById("answerB");
        answerB.onclick = () => self.answerQuestion("answerB");

        if (model.numbersOfAnswerTrue == model.numberQuestionOfLesson) {
            window.location = "./completedLesson.html"
        }
    };

    this.answerQuestion = function(answer) {
        self.controller.submitAnswer(answer)
            .then(response => handleResult(response.data == "true"));
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
        builtColumnOfBlock(listBlockOne, model.currentQuestion.first)

        let listBlockTwo = document.getElementById("list-block-two")
        builtColumnOfBlock(listBlockTwo, model.currentQuestion.second)
    };

    this.builtColumnOfBlock = function(columnId, numberOfBlock) {
        let html = ""
        for (let i = 0; i < numberOfBlock; i++) {
            html += `<img class="block block_${i}" src="../resources/main_page/images/block.png" alt="">`
        }
        columnId.innerHTML = html
    };

    this.handleResult = function(result) {
        let isFirstAnswer = true
        if(result){
            setBackground(answer, "rgb(106, 219, 72)")
            setTimeout(() => {
                selft.setBackground(answer, "#6ec3e2")
            }, 2000);
            document.getElementById(`ball_${model.numbersOfAnswerTrue}`).setAttribute = ("class", "ball ml-auto")

            if(isFirstAnswer){
                isFirstAnswer = false
                model.numbersOfAnswerTrue++
            }

            getNewQuestion();

        } else{
            setBackground(answer, "#FF5D6A")
            setTimeout(() => {
                selft.setBackground(answer, "#6ec3e2")
            }, 2000);

            //hiển thị gợi ý
            displaySuggestion(2, 5)
            
            
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

    this.getNewQuestion = function() {
        self.controller.getQuestion()
            .then(response => {
                model.saveCurrentQuestion(response.data);
                displayCurrentQuestion();;
            })
    };
};