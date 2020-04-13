Components = function () {
    this.lessonOne = `<div class="caption">
                        Ai có nhiều khối hơn?
                    </div>
                    <div class="context d-flex">
                        <div class="context--answer answer_1">
                            <div class="row_1 d-flex justify-content-between">
                                <div class="context--answer__kid"></div>
                                <div id="list-block-one" class="context--answer__blocks">
                                </div>
                            </div>
                            <div class="context--answer__floor"></div>
                            <div class="context--answer__name">Lan</div>
                            <button id="answerA" class="context--answer__ok" data-value="BIGGER">Ok</button>
                        </div>
                        <div id="arrows" class="arrows_list">
                        </div>
                        <div class="context--answer answer_2">
                            <div class="row_1 d-flex justify-content-between">
                                <div id="list-block-two" class="context--answer__blocks">
                                </div>
                                <div class="context--answer__kid"></div>
                            </div>
                            <div class="context--answer__floor"></div>
                            <div class="context--answer__name">Long</div>
                            <button id="answerB" class="context--answer__ok" data-value = "SMALLER">Ok</button>
                        </div>
                    </div>`
    this.lessonTwo = `<div class="caption">
                        Giúp Long có số khối bằng với của Lan nào!
                    </div>
                    <div class="context d-flex">
                        <div class="context--answer answer_1">
                            <div class="row_1 d-flex justify-content-between">
                                <div class="context--answer__kid"></div>
                                <div id="list-block-one" class="context--answer__blocks" onmousedown="return false">
                                    
                                </div>
                            </div>
                            <div class="context--answer__floor"></div>
                        </div>
                        <div id="arrows" class="arrows_list">
                        </div>
                        <div class="context--answer answer_2">
                            <div class="row_1 d-flex justify-content-between">
                                <div id="list-block-two" class="context--answer__blocks">

                                </div>
                                <div class="context--answer__kid"></div>
                            </div>
                            <div class="context--answer__floor"></div>
                        </div>
                    </div>
                    <div class="context--drag">
                        <div id="factory" class="context--factory">
                            <div id="abc" class="block" draggable="true"></div>
                        </div>
                        <div class="context--trash">
                            <div class="context--trash__block"></div>
                            <div class="context--trash--front"></div>
                            <div id="trash" class="drop-block">
                            </div>
                        </div>
                        <button class="context--drag--done">Hoàn thành</button>
                    </div>`
    this.lessonThree = ``
    this.lessonFour = ``
}