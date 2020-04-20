View = function () {
    this.setUpAnswerScene = function() {
        document.getElementById("start-wall").style.display = "none"
        document.getElementById("under-start-wall").setAttribute("class", "scene_under_start")
    }

    this.setBackground = function(element, background){
        element.style.background = background
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
        //document.getElementById('list-block-one').style.backgroundImage = 'none'
        let overlay = document.getElementById('overlay')
        overlay.style.display = 'none'
    }

    this.setupBeforeAnswer = function (question) {
        document.querySelector('.caption_two').style.visibility = 'visible'
        document.querySelector('.caption_one').style.color = 'rgba(0,0,0,.3)'

        document.getElementById('arrows').className = 'arrows d-flex'
        let overlay = document.getElementById('overlay')
        if(overlay.style.display == 'none'|| overlay.style.display == ''){
            overlay.style.display = 'block'
        }
        let trainBelow =  document.querySelector('.train_below')
        let marginLeft = 95
        if(question['first'] >= question['second']){
            marginLeft =  marginLeft + 60 * Math.abs(5 - question['first'])
        } else{
            marginLeft =  marginLeft + 60 * Math.abs(5 - question['second'])
        }
        trainBelow.style.marginLeft = marginLeft
    }
    this.trainJump = function () {

    }
}