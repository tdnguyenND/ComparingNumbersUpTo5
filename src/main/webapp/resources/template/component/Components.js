Components = function () {
    this.lessonOne = '<div class="caption">\n' +
        '        Ai có nhiều khối hơn?\n' +
        '    </div>\n' +
        '    <div class="context d-flex">\n' +
        '        <div class="context--answer answer_1">\n' +
        '            <div class="row_1 d-flex justify-content-between">\n' +
        '                <div class="context--answer__kid"></div>\n' +
        '                <div id="list-block-one" class="context--answer__blocks">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="context--answer__floor"></div>\n' +
        '            <div class="context--answer__name">Lan</div>\n' +
        '            <button id="answerA" class="context--answer__ok" data-value="BIGGER">Ok</button>\n' +
        '        </div>\n' +
        '        <div id="arrows" class="arrows_list">\n' +
        '        </div>\n' +
        '        <div class="context--answer answer_2">\n' +
        '            <div class="row_1 d-flex justify-content-between">\n' +
        '                <div id="list-block-two" class="context--answer__blocks">\n' +
        '                </div>\n' +
        '                <div class="context--answer__kid"></div>\n' +
        '            </div>\n' +
        '            <div class="context--answer__floor"></div>\n' +
        '            <div class="context--answer__name">Long</div>\n' +
        '            <button id="answerB" class="context--answer__ok" data-value = "SMALLER">Ok</button>\n' +
        '        </div>\n' +
        '    </div>'
    this.lessonTwo = '<div class="caption">\n' +
        '        Giúp Long có số khối bằng với của Lan nào!\n' +
        '    </div>\n' +
        '    <div class="context d-flex">\n' +
        '        <div class="context--answer answer_1">\n' +
        '            <div class="row_1 d-flex justify-content-between">\n' +
        '                <div class="context--answer__kid"></div>\n' +
        '                <div id="list-block-one" class="context--answer__blocks" onmousedown="return false">\n' +
        '\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="context--answer__floor"></div>\n' +
        '        </div>\n' +
        '        <div id="arrows" class="arrows_list">\n' +
        '        </div>\n' +
        '        <div class="context--answer answer_2">\n' +
        '            <div class="row_1 d-flex justify-content-between">\n' +
        '                <div id="list-block-two" class="context--answer__blocks">\n' +
        '\n' +
        '                </div>\n' +
        '                <div class="context--answer__kid"></div>\n' +
        '            </div>\n' +
        '            <div class="context--answer__floor"></div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="context--drag">\n' +
        '        <div id="factory" class="context--factory">\n' +
        '        </div>\n' +
        '        <div class="context--trash">\n' +
        '            <div class="context--trash__block"></div>\n' +
        '            <div class="context--trash--front"></div>\n' +
        '            <div id="trash" class="drop-block">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <button id="submitAnswer" class="context--drag--done">Hoàn thành</button>\n' +
        '    </div>'
    this.lessonThree = ``
    this.lessonFour = ``

    this.lessonTemplate = '<div class="uchiru_container">\n' +
        '    <div class="uchiru_bg_cell"></div>\n' +
        '    <div class="uchiru_bg_color"></div>\n' +
        '    <div class="uchiru_bg_stuff"></div>\n' +
        '    <img src="/resources/images/background_0.jpg" alt="" class="uchiru_bg_color">\n' +
        '    <div class="uchiru_box">\n' +
        '        <div class="uchiru_box--header d-flex justify-content-between">\n' +
        '                <span id="back-btn">\n' +
        '                    <i class="fas fa-angle-left"></i>\n' +
        '                    Trở về\n' +
        '                </span>\n' +
        '            <div class="inner_process d-flex align-items-center">\n' +
        '                <div id="ball_5" class="ball"></div>\n' +
        '                <div id="ball_4" class="ball"></div>\n' +
        '                <div id="ball_3" class="ball"></div>\n' +
        '                <div id="ball_2" class="ball"></div>\n' +
        '                <div id="ball_1" class="ball"></div>\n' +
        '                <div id="ball_0" class="ball"></div>\n' +
        '            </div>\n' +
        '            <span>\n' +
        '                    Ngôn ngữ\n' +
        '                    <i class="fas fa-caret-down"></i>\n' +
        '                </span>\n' +
        '        </div>\n' +
        '        <div class="uchiru_box--body">\n' +
        '            <div id="under-start-wall" class="scene_under_start blur_effect">\n' +
        '\n' +
        '            </div>\n' +
        '            <div id="start-wall" class="btn_play_wall">\n' +
        '                <div id="start-lesson" class="btn_play">\n' +
        '                    <div class="btn_play--start">\n' +
        '                        Bắt đầu\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '</div>\n' +
        '\n' +
        '<!-- link bootstrap 4 -->\n' +
        '<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"\n' +
        '        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"\n' +
        '        crossorigin="anonymous"></script>\n' +
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"\n' +
        '        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"\n' +
        '        crossorigin="anonymous"></script>\n' +
        '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"\n' +
        '        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"\n' +
        '        crossorigin="anonymous"></script>\n'
}