Components = function () {
    this.lessonOne = `<div class="caption">
                Ai có nhiều khối hơn?
            </div>
            <div class="context d-flex">
                <div class="context--answer answer_1">
                    <div class="row_1 d-flex justify-content-between">
                        <div class="context--answer__kid"></div>
                        <div id="first-chain" class="context--answer__blocks">
                        </div>
                    </div>
                    <div class="context--answer__floor"></div>
                    <div class="context--answer__name">Lan</div>
                    <button id="answer1" class="context--answer__ok" data-value="BIGGER">Ok</button>
                </div>
                <div id="arrows" class="arrows_list">
                </div>
                <div class="context--answer answer_2">
                    <div class="row_1 d-flex justify-content-between">
                        <div id="second-chain" class="context--answer__blocks">
                        </div>
                        <div class="context--answer__kid"></div>
                    </div>
                    <div class="context--answer__floor"></div>
                    <div class="context--answer__name">Long</div>
                    <button id="answer2" class="context--answer__ok" data-value = "SMALLER">Ok</button>
                </div>
            </div>`
    this.lessonTwo = `<div class="caption"> 
                Giúp Long có số khối bằng với của Lan nào! 
            </div> 
            <div id="contextQuestion" class="context d-flex"> 
                <div class="context--answer answer_1"> 
                    <div class="row_1 d-flex justify-content-between"> 
                        <div class="context--answer__kid"></div> 
                        <div id="first-chain" class="context--answer__blocks" onmousedown="return false">
                        </div> 
                    </div> 
                    <div class="context--answer__floor"></div> 
                </div> 
                <div id="arrows" class="arrows_list"> 
                </div> 
                <div class="context--answer answer_2"> 
                    <div class="row_1 d-flex justify-content-between"> 
                        <div id="second-chain" class="context--answer__blocks"></div> 
                        <div class="context--answer__kid"></div> 
                    </div> 
                    <div class="context--answer__floor"></div> 
                </div> 
            </div> 
            <div class="context--drag"> 
                <div id="factory" class="context--factory"> 
                </div> 
                <div class="context--trash"> 
                    <div class="context--trash__block">
                        <div class="item block"></div>
                    </div> 
                    <div class="context--trash--front"></div> 
                    <div id="trash" class="drop-block"> 
                    </div> 
                </div> 
                <button id="submitAnswer" class="context--drag--done">Hoàn thành</button> 
                <button id="reworkBtn" class="context--drag--rework" style="display: none">Làm lại</button>
            </div>`
    this.lessonThree = `<div class="caption">
                    <div class="caption_one">
                        Ai có nhiều khối hơn?
                    </div>
                    <div class="caption_two">
                        Giúp Long có số khối bằng với của Lan nào!
                    </div>
                </div>
                <div class="context">
                    <div class="context--question  d-flex justify-content-center">
                        <div class="d-flex justify-content-between" style="height: 276px">
                            <div class="aside_left d-flex">
                                <div class="aside_left--kid"></div>
                                <div id="first-draggable-area" class="aside_left--drag_block_area">
                                </div>
                                <div id="first-chain" class="aside_left--blocks" onmousedown="return false">
                                </div>
                                <div class="floor big--floor"></div>
                            </div>
                            <div id="arrows" class="arrows_list">
                            </div>
                            <div class="aside_right d-flex">
                                <div id="second-chain" class="aside_right--blocks">
                                </div>
                                <div id="second-draggable-area" class="aside_left--drag_block_area">
                                </div>
                                <div class="aside_right--kid"></div>
                                <div class="floor small--floor"></div>
                            </div>
                        </div>
                    </div>
                    <div class="context--answer d-flex justify-content-around">
                        <div class="answer_one" >
                            <span>Lan</span>
                            <button id="answer1" data-value="BIGGER">OK</button>
                        </div>
                        <div class="answer_two" >
                            <span>Bằng nhau</span>
                            <button id="answer2" data-value="EQUAL">OK</button>
                        </div>
                        <div class="answer_three">
                            <span>Long</span>
                            <button id="answer3" data-value="SMALLER">OK</button>
                        </div>
                    </div>
                </div>`
    this.lessonFour = `<div class="caption">
                    <div class="caption_one">
                        Ai có nhiều toa tàu hơn?
                    </div>
                    <div class="caption_two">
                        Giúp Lan tạo thành một đoàn tàu nhé!
                    </div>
                </div>
                <div class="context">
                    <div class="context--question">
                        <div id="group-train" class="drag_element_area"></div>
                        <div class="train_above">
                            <div class="kid"></div>
                            <div id="first-train" class="train d-flex flex-row-reverse">
                            </div>
                        </div>
                        <div class="train_below">
                            <div class="kid"></div>
                            <div style="display: inline-block;">
                                <div id="arrows" class="arrows d-flex">
                                </div>
                                <div id="second-train" class="d-flex">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="context--answer d-flex justify-content-around">
                        <div>
                            <span>Long</span>
                            <button id="answer1" data-value="SMALLER">OK</button>
                        </div>
                        <div>
                            <span>Bằng nhau</span>
                            <button id="answer2" data-value="EQUAL">OK</button>
                        </div>
                        <div>
                            <span>Lan</span>
                            <button id="answer3" data-value="BIGGER">OK</button>
                        </div>
                    </div>
                </div>`

    this.lessonTemplate = `<div class="uchiru_container">
            <div class="uchiru_bg_cell"></div>
            <div class="uchiru_bg_color"></div>
            <div class="uchiru_bg_stuff"></div>
            <img src="/resources/images/background_0.jpg" alt="" class="uchiru_bg_color">
            <div class="uchiru_box">
                <div class="uchiru_box--header d-flex justify-content-between">
                        <span id="back-btn">
                            <i class="fas fa-angle-left"></i>
                            Trở về
                        </span>
                    <div id="list-ball" class="inner_process d-flex align-items-center">
                    </div>
                    <span>
                            Ngôn ngữ
                            <i class="fas fa-caret-down"></i>
                        </span>
                </div>
                <div class="uchiru_box--body">
                    <div id="under-start-wall" class="scene_under_start blur_effect">
        
                    </div>
                    <div id="start-wall" class="btn_play_wall">
                        <div id="start-lesson" class="btn_play">
                            <div class="btn_play--start">
                                Bắt đầu
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
        
        <!-- link bootstrap 4 -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
                integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
                integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                crossorigin="anonymous"></script>`
}