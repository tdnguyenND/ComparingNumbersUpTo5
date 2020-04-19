View = function () {
    this.setUpAnswerScene = function() {
        document.getElementById("start-wall").style.display = "none"
        document.getElementById("under-start-wall").setAttribute("class", "scene_under_start")
    }

    this.moveBallRight = function(ballID){
        let ml = 440 - 24 * ballID
        document.getElementById(`ball_${ballID}`).style.left = ml.toString() + "px";
    }

    this.moveBallLeft = function(ballID){
        let ml = 124 - 24 * ballID
        document.getElementById(`ball_${ballID}`).style.left = ml.toString() + "px";
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