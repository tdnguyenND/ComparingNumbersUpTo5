Controller = function(){
    this.getQuestion = function(){
        return axios({
            url: "../question/1",
            method: "get"
        });
    }

    this.submitAnswer = function(answer){
        return axios({
            url: "../answer/1",
            method: "post",
            params:{
                answerContent: answer
            }
        });
    }
}