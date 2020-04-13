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