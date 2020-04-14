View = function(){
    let allBlockInfo = ['list-block-one', 'list-block-two'].map(id => {
        return {
            location: document.getElementById(id),
            number: null
        }
    })
    let fixedBlockInfo = allBlockInfo[0]
    let unfixedBlockInfo = allBlockInfo[1]

    let blockSrc = "../resources/images/block.png"

    let greenArrowSrc = "../resources/images/31.png"
    let redArrowSrc = "../resources/images/33.png"
    let XSignSrc = "../resources/images/XSign.png"

    let arrows = document.getElementById("arrows");
    let smallerChainAddition = document.createElement('div')

    this.oneMoreBlock = function(factory){
        factory.innerHTML = `<div class="block" alt="" draggable="true"></div>`
    }

    this.renderQuestion = function(question) {
        document.getElementById("arrows").innerHTML = ''
        fixedBlockInfo.number = question['fixedNumber']
        this.drawBlocks(fixedBlockInfo)
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
            unfixedBlockInfo.number = unfixedBlockInfo.location.getElementsByClassName('block').length
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
                    let bot = (46 * i).toString()
                    smallerChainAddition.innerHTML += `<img src=${XSignSrc} alt="" style="bottom: ${bot} px; position:absolute; width: 53px; height: 53px;">`
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

    this.clearAnswer = function(){
        allBlockInfo[1].location.innerHTML = ''
    }
}