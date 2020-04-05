Controller = function(){
    this.getQuestion = function(){
        return axios({
            url: "/question/stageID",
            method: "get"
        });
    }

    this.submitAnswer = function(answer){
        return axios({
            url: "answer/stageID",
            method: "post",
            params:{
                answerContent: answer
            }
        });
    }
}