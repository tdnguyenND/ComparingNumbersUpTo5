View = function(){
    let allBlockInfo = ['list-block-one', 'list-block-two'].map(id => {
        return {
            location: document.getElementById(id),
            number: null
        }
    })

    let blockSrc = ["../resources/images/block.png", '../resources/images/45.png', '../resources/images/59.png']

    let greenArrowSrc = "../resources/images/31.png"
    let redArrowSrc = "../resources/images/33.png"
    let XSignSrc = "../resources/images/XSign.png"

    let arrows = document.getElementById("arrows");
    let smallerChainAddition = document.createElement('div')
    smallerChainAddition.className = 'signXList'

    this.renderQuestion = function(question, advanceMode) {
        document.getElementById("arrows").innerHTML = ''
        let i = 0
        for (let key in question){
            allBlockInfo[i].number = question[key]
            i++
        }
        allBlockInfo.forEach(info => {this.drawBlocks(info, advanceMode)})
    }

    this.drawBlocks = function(blockInformation, advanceMode) {
        let html = ""
        for (let i = 0; i < blockInformation.number; i++) {
            let src = blockSrc[0]
            if (advanceMode){
                src = blockSrc[Math.random() * 3|0]
            }
            html += `<img name="block" class="block block_${i}" src="${src}" alt="">`
        }
        blockInformation.location.innerHTML = html
    }

    this.setUpAnswerScene = function() {
        document.getElementById("start-wall").style.display = "none"
        document.getElementById("under-start-wall").setAttribute("class", "scene_under_start")
    }

    this.displaySuggestion = function(question){
        return new Promise(function (resolve, reject) {
            //find the one that have bigger value of number
            let biggerNumberBlockInformation = allBlockInfo.reduce((prev, next)=>{
                return (prev.number > next.number)? prev : next
            })
            // and find smaller one
            let smallerNumberBlockInformation = allBlockInfo.reduce((prev, next)=>{
                return (prev.number < next.number)? prev : next
            })

            let max = biggerNumberBlockInformation.number
            let min = smallerNumberBlockInformation.number
            smallerNumberBlockInformation.location.appendChild(smallerChainAddition)

            let i = 0
            let intervalId = setInterval(() => {
                if(i < min){
                    // add green arrow
                    let arrowGreen = document.createElement('img');
                    arrowGreen.src = `${greenArrowSrc}`;
                    arrowGreen.className = `arrows_list--item__green arrows_item_${i}`;
                    arrows.appendChild(arrowGreen)
                } else{
                    // add red arrow
                    let arrowRed = document.createElement('img');
                    arrowRed.src = `${redArrowSrc}`;
                    arrowRed.className = `arrows_list--item__red arrows_item_${i}`;
                    arrows.appendChild(arrowRed);
                    // add x sign
                    let signX = document.createElement('img');
                    signX.src = `${XSignSrc}`;
                    signX.className = `block block_${i}`;
                    smallerChainAddition.appendChild(signX)
                }
                i++
                if(i >= max){
                    clearInterval(intervalId)
                    resolve()
                }
            }, 1000)
        })
    }

    this.clearSuggestion = function(){
        arrows.innerHTML = ''
        smallerChainAddition.innerHTML = ''
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
}