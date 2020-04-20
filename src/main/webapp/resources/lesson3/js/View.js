View = function () {
    this.setUpAnswerScene = function() {
        document.getElementById("start-wall").style.display = "none"
        document.getElementById("under-start-wall").setAttribute("class", "scene_under_start")
    }

    this.moveBallRight = function(currentTrueAnswer, totalBall){
        let ml = 464 - 24 * currentTrueAnswer
        document.getElementById(`ball_${totalBall - currentTrueAnswer}`).style.left = ml.toString() + "px";
    }

    this.moveBallLeft = function(currentTrueAnswer, totalBall){
        let ml = 4 + 24 * (totalBall - currentTrueAnswer - 1)
        document.getElementById(`ball_${totalBall - currentTrueAnswer - 1}`).style.left = ml.toString() + "px";
    }
    this.displayRequestNext = function () {
        document.querySelector('.caption_two').style.visibility = 'hidden'
        document.querySelector('.caption_one').style.color = 'black'
        document.getElementById('list-block-one').style.backgroundImage = 'none'
        let overlay = document.getElementById('overlay')
        overlay.style.display = 'none'
    }
    this.setupBeforeAnswer = function () {
        document.querySelector('.caption_two').style.visibility = 'visible'
        document.querySelector('.caption_one').style.color = 'rgba(0,0,0,.3)'
        document.getElementById('list-block-one').style.backgroundImage = `url('../resources/images/28.png')`
        let overlay = document.getElementById('overlay')
        if(overlay.style.display == 'none'|| overlay.style.display == ''){
            overlay.style.display = 'block'
        }
    }
}