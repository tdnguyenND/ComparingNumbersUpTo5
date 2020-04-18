View = function(){
    let self = this;
    let allBlockInfo = ['list-block-one', 'list-block-two'].map(id => {
        return {
            location: document.getElementById(id),
            number: 0
        }
    })
    let arrows = document.getElementById("arrows");
    let xSignChain = document.createElement('div')

    function createElement(classNameOptions){
        let res = document.createElement('div')
        for (c of classNameOptions){
            res.classList.add(c)
        }
        return res
    }

    let block = createElement(['item', 'block'])
    let greenArrow = createElement(['item', 'arrow', 'green-arrow'])
    let redArrow = createElement(['item', 'arrow', 'red-arrow'])
    let xSign = createElement(['item', 'x-sign'])

    let standardDistance = 46

    this.setUpAnswerScene = function() {
        document.getElementById("start-wall").style.display = "none"
        document.getElementById("under-start-wall").setAttribute("class", "scene_under_start")
    }

    function updateBlocksNumber() {
        allBlockInfo.forEach(info => {
            info.number = info.location.getElementsByClassName('block').length
        })
    }

    function getBigger() {
        return allBlockInfo.reduce((prev, next) => {
            return (prev.number > next.number) ? prev : next
        });
    }

    function getSmaller() {
        return allBlockInfo.reduce((prev, next) => {
            return (prev.number < next.number) ? prev : next
        });
    }

    this.displaySuggestion = function(){
        return new Promise(function (resolve, reject) {
            self.setBackground(unfixedChain, 'none')
            updateBlocksNumber();
            let bigger = getBigger()
            let smaller = getSmaller()

            xSignChain.style.height = (smaller.location.getBoundingClientRect().height - smaller.number * standardDistance) + 'px'
            smaller.location.insertBefore(xSignChain, smaller.location.firstChild)

            let i = 0
            let intervalId = setInterval(() => {
                if(i < smaller.number){
                    arrows.appendChild(greenArrow.cloneNode(true))
                    self.reArrangeItems(arrows, 'arrow')
                } else{
                    arrows.appendChild(redArrow.cloneNode(true))
                    xSignChain.appendChild(xSign.cloneNode(true))
                    self.reArrangeItems(arrows, 'arrow')
                    self.reArrangeItems(xSignChain, 'x-sign')
                }
                i++
                if(i >= bigger.number){
                    clearInterval(intervalId)
                    resolve()
                }
            }, 1000)
        })
    }

    this.clearSuggestion = function(){
        arrows.innerHTML = ''
        xSignChain.innerHTML = ''
        xSignChain.removeAttribute('style')
    }

    this.setBackground = function(element, background){
        element.style.backgroundImage = background
    }

    this.moveBallRight = function(ballID){
        let ml = 440 - 24 * ballID
        document.getElementById(`ball_${ballID}`).style.left = ml.toString() + "px";
    }

    this.moveBallLeft = function(ballID){
        let ml = 124 - 24 * ballID
        document.getElementById(`ball_${ballID}`).style.left = ml.toString() + "px";
    }

    this.addBlockInto = function(element, option = null){
        let newBlock = block.cloneNode(true)
        newBlock.classList.add(option)
        element.appendChild(newBlock)
    }

    this.reArrangeItems = function(element, itemClassName){
        updateBlocksNumber()
        let allElements = element.getElementsByClassName(itemClassName)
        let startHeight = element.offsetTop + element.offsetHeight - standardDistance
        for (let i = 0; i < allElements.length; i++){
            allElements[i].style.zIndex = (i + 1) + ''
            allElements[i].style.top = (startHeight - standardDistance * i)  + 'px'
        }
        checkStatusOfUnfixedChain()
    }

    this.beforeBuildColumn = function () {
        if(unfixedChain.style.backgroundImage == 'none'){
            self.setBackground(unfixedChain, `url('../resources/images/28.png')`)
            //unfixedChain.style.backgroundImage = `url('../resources/images/28.png')`;
        }
        submitAnswerButton.setAttribute('disabled', true)
    }
    function checkStatusOfUnfixedChain() {
        if(allBlockInfo[1].number != 0){
            submitAnswerButton.removeAttribute('disabled')
        } else{
            submitAnswerButton.setAttribute('disabled', true)
        }
    }
    this.reworkBtnAppear= function(){
        submitAnswerButton.style.display = 'none'
        reworkButton.style.display = 'inline-block'
        reworkButton.addEventListener('click', rework)
    }
    function rework(){
        submitAnswerButton.style.display = 'inline-block'
        reworkButton.style.display = 'none'
        self.clearSuggestion()
        clear()
        newQuestion()
        enableSubmitAnswerButton()
        self.setBackground(unfixedChain, `url('../resources/images/28.png')`)
    }
    this.blockInsideTrash = function () {
        document.querySelector('.context--trash__block > .block').style.visibility = 'visible'
    }
}