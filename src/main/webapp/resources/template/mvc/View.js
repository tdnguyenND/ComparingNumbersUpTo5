const correctAnswerColor = "rgb(106, 219, 72)"
const incorrectAnswerColor = "#FF5D6A"
const defaultAnswerColor = "#6ec3e2"

setUpAnswerScene = function() {
    document.getElementById("start-wall").style.display = "none"
    document.getElementById("under-start-wall").setAttribute("class", "scene_under_start")
}

setCorrectAnswerColor = function(btn){
    setBackground(btn, correctAnswerColor)
}

setIncorrectAnswerColor = function(btn){
    setBackground(btn, incorrectAnswerColor)
}

setDefaultAnswerColor = function(btn){
    setBackground(btn, defaultAnswerColor)
}

setBackground = function(element, background){
    element.style.background = background
}

moveBallRight = function(currentTrueAnswer, totalBall){
    let ml = 464 - 24 * currentTrueAnswer
    document.getElementById(`ball_${totalBall - currentTrueAnswer}`).style.left = ml.toString() + "px";
}
moveBallLeft = function(currentTrueAnswer, totalBall){
    let ml = 4 + 24 * (totalBall - currentTrueAnswer - 1)
    document.getElementById(`ball_${totalBall - currentTrueAnswer - 1}`).style.left = ml.toString() + "px";
}
