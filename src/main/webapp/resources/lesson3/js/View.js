View = function () {
    let blockSrc = "../resources/images/block.png"

    let greenArrowSrc = "../resources/images/31.png"
    let redArrowSrc = "../resources/images/33.png"
    let XSignSrc = "../resources/images/XSign.png"

    let arrows = document.getElementById("arrows");
    let allBlockInfo = ['list-block-one', 'list-block-two'].map(id => {
        return {
            location: document.getElementById(id),
            number: 0,
            fixed: null
        }
    })
    function createElement(classNameOptions, src){
        let res = document.createElement('img')
        for (c of classNameOptions){
            res.classList.add(c)
        }
        res.src = src
        return res
    }
    let block = createElement(['block'], blockSrc)
    let greenArrow = createElement(['arrows_list--item__green'], greenArrowSrc)
    let redArrow = createElement(['arrows_list--item__red'], redArrowSrc)
    let xSign = createElement(['x-sign'], XSignSrc)

    let standardDistance = 46

    this.setUpAnswerScene = function () {
        document.getElementById("start-wall").style.display = "none"
        document.getElementById("under-start-wall").setAttribute("class", "scene_under_start")
    }

    this.renderQuestion = function (question) {
        document.getElementById("arrows").innerHTML = ''
        let i = 0
        for (let key in question) {
            allBlockInfo[i].number = question[key]
            i++
        }
        allBlockInfo.forEach(this.drawBlocks)
    }

    this.drawBlock = function (blockInformation) {
        if (blockInformation.fixed) {
            let html = ""
            for (let i = 0; i < blockInformation.number; i++) {
                let pos = 336 - 46 * i
                html += `<img class="block" src="${blockSrc}" style="top: ${pos}px;">`
            }
            blockInformation.location.innerHTML = html
        } else {
            let html = ""
            //random position of blocks
            
        }
    }

    this.displaySuggestion = function (question) {
        return new Promise(function (resolve, reject) {
            //find the one that have bigger value of number
            let biggerNumberBlockInformation = allBlockInfo.reduce((prev, next) => {
                return (prev.number > next.number) ? prev : next
            })
            // and find smaller one
            let smallerNumberBlockInformation = allBlockInfo.reduce((prev, next) => {
                return (prev.number < next.number) ? prev : next
            })

            let max = biggerNumberBlockInformation.number
            let min = smallerNumberBlockInformation.number
            smallerNumberBlockInformation.location.appendChild(smallerChainAddition)

            let i = 0
            let intervalId = setInterval(() => {
                if (i < min) {
                    // add green arrow
                    arrows.appendChild(greenArrow.cloneNode(true))
                    self.reArrangeItems(arrows, 'arrow')
                } else {
                    arrows.appendChild(redArrow.cloneNode(true))
                    xSignChain.appendChild(xSign.cloneNode(true))
                    self.reArrangeItems(arrows, 'arrow')
                    self.reArrangeItems(xSignChain, 'x-sign')
                }
                i++
                if (i >= max) {
                    clearInterval(intervalId)
                    resolve()
                }
            }, 1000)
        })
    }
    this.clearSuggestion = function () {
        arrows.innerHTML = ''
        smallerChainAddition.innerHTML = ''
    }
    this.reArrangeItems = function(element, itemClassName){
        updateBlocksNumber()
        let allElements = element.getElementsByClassName(itemClassName)
        let startHeight = element.offsetTop + element.offsetHeight - standardDistance
        for (let i = 0; i < allElements.length; i++){
            allElements[i].style.top = (startHeight - standardDistance * i)  + 'px'
        }
        checkStatusOfUnfixedChain()
    }

    this.moveBallRight = function (ballID) {
        let ml = 440 - 24 * ballID
        document.getElementById(`ball_${ballID}`).style.left = ml.toString() + "px";
    }

    this.moveBallLeft = function (ballID) {
        let ml = 124 - 24 * ballID
        document.getElementById(`ball_${ballID}`).style.left = ml.toString() + "px";
    }
}