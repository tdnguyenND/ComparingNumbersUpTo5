LessonTwo = function(){
    let isFirstAnswer = true;
    let listAnswer = null;
    let chosenAnswerID = null;

    const column = document.getElementById("list-block-two")
    const factory = document.getElementById("factory")
    const trash = document.getElementById("trash")
    let draggedItem = null;

    let self = this;

    this.startLesson = function(){
        self.oneMoreBlock();
        self.addEventForDragPlace()
        self.addEventForDropPlaces()
    }

    this.oneMoreBlock = function(){
        factory.innerHTML = `<div class="block" alt="" draggable="true"></div>`
    }

    this.addEventForDragPlace = function(){
        let blockInFactory = document.querySelector('.context--factory > .block');
        blockInFactory.addEventListener('dragstart', function (ev) {
            draggedItem = blockInFactory;
            ev.dataTransfer.setData("text/plain", this.parentNode.id);
            setTimeout(function () {
                blockInFactory.style.display = 'none';
            }, 0)
        });
        blockInFactory.addEventListener('dragend', function () {
            setTimeout(function () {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        })
    }

    this.addEventForDropPlaces = function(){
        column.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        column.addEventListener('drop', function (e) {
            
            this.append(draggedItem);
            self.setLocationOfBlock();
            self.oneMoreBlock();
            self.addEventForDragPlace()
        });
        
        trash.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        trash.addEventListener('drop', function (ev) {
            var data = ev.dataTransfer.getData("text");
            console.log(data);
            if(data != "factory"){
                this.append(draggedItem);
                trash.innerHTML = "";
                document.querySelector('.context--trash__block').innerHTML = `<div class="block"></div>`
                self.setLocationOfBlock()
            }
        });
    }

    this.setLocationOfBlock = function(){
        let child = column.querySelectorAll('div');
        for(let i = 0; i < child.length; i ++){
            const item = child[i];
            item.setAttribute("class", `block block_${i}`);
        }
    }

    this.drawBlocks = function(drawElement, numberOfBlock) {
        let html = ""
        for (let i = 0; i < numberOfBlock; i++) {
            html += `<img class="block block_${i}" src="../resources/main_page/images/block.png" alt="">`
        }
        drawElement.innerHTML = html
    };

    this.displayQuestion = function() {
        document.getElementById("arrows").innerHTML = ""

        self.drawBlocks(document.getElementById("list-block-one"), model.currentQuestion.first)
    };

    this.displaySuggestion = function () {

    }
}