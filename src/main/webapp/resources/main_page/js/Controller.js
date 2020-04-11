Controller = function(){
    this.stageID = null
    this.getQuestion = function(){
        return axios({
            url: "../question/"+ this.stageID,
            method: "get"
        });
    }

    this.submitAnswer = function(answer){
        return axios({
            url: "../answer/" + this.stageID,
            method: "post",
            params:{
                answerContent: answer
            }
        });
    }
}