let stageID = window.location.pathname.match(/\/lesson\/(?<stageID>\d+)$/).groups.stageID
getQuestionFromServer = function(){
    return axios({
        url: "../question/"+ stageID,
        method: "get"
    });
}

submitAnswerToServer = function(answer){
    return axios({
        url: "../answer/" + stageID,
        method: "post",
        params:{
            answerContent: answer
        }
    });
}
