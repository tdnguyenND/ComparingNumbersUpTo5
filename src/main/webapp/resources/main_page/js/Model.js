Model = function() {
    this.numberQuestionOfLesson = null;
    this.currentQuestion = null; 
    this.currentResult = null; 
    this.numbersOfAnswerTrue = 0;

    this.saveCurrentQuestion = function(question){
        this.currentQuestion = question
    }

    this.saveCurrentResult = function(result){
        this.currentResult = result
    }

    this.finish = function () {
        return this.numbersOfAnswerTrue === this.numberQuestionOfLesson;

    }
}