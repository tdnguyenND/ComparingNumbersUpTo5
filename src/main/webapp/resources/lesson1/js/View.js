View = function(){
    let allBlockInfo = ['list-block-one', 'list-block-two'].map(id => {
        return {
            location: document.getElementById(id),
            number: null
        }
    })

    let blockSrc = "../resources/images/block.png"

    let greenArrowSrc = "../resources/images/31.png"
    let redArrowSrc = "../resources/images/33.png"
    let XSignSrc = "../resources/images/71.png"

    let arrows = document.getElementById("arrows");
    let smallerChainAddition = document.createElement('div')

    this.renderQuestion = function(question) {
        document.getElementById("arrows").innerHTML = ''
        let i = 0
        for (let key in question){
            allBlockInfo[i].number = question[key]
            i++
        }
        allBlockInfo.forEach(this.drawBlocks)
    }

    this.drawBlocks = function(blockInformation) {
        let html = ""
        for (let i = 0; i < blockInformation.number; i++) {
            html += `<img name="block" class="block block_${i}" src="${blockSrc}" alt="">`
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
                    arrows.innerHTML += `<img class="arrows_list--item__green arrows_item_${i}" src=${greenArrowSrc} alt="">`
                } else{
                    // add red arrow
                    arrows.innerHTML += `<img class="arrows_list--item__red arrows_item_${i}" src=${redArrowSrc} alt="">`
                    // add x sign
                    smallerChainAddition.innerHTML += `<img class="block block_${i}" src=${XSignSrc} alt="" style="width: 53px; height: 53px;">`
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