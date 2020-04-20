View = function () {
    this.setUpAnswerScene = function() {
        document.getElementById("start-wall").style.display = "none"
        document.getElementById("under-start-wall").setAttribute("class", "scene_under_start")
    }

    this.setBackground = function(element, background){
        element.style.background = background
    }

    this.moveBallRight = function(currentTrueAnswer, totalBall){
        let ml = 464 - 24 * currentTrueAnswer
        document.getElementById(`ball_${totalBall - currentTrueAnswer}`).style.left = ml.toString() + "px";
    }

    this.moveBallLeft = function(currentTrueAnswer, totalBall){
        let ml = 4 + 24 * (totalBall - currentTrueAnswer - 1)
        document.getElementById(`ball_${totalBall - currentTrueAnswer - 1}`).style.left = ml.toString() + "px";
    }
}