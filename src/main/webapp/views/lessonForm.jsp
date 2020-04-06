<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="<c:url value = "/resources/main_page/css/lessonForm.css"/>">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans&display=swap" rel="stylesheet">
</head>
<body>
    <div class="uchiru_container">
        <div class="uchiru_bg_cell"></div>
        <div class="uchiru_bg_color"></div>
        <div class="uchiru_bg_stuff"></div>
        <img src="<c:url value = "/resources/main_page/images/background_0.jpg"/>" alt="" class="uchiru_bg_color">
        <div class="uchiru_box">
            <div class="uchiru_box--header d-flex justify-content-between">
                <span id="back-btn">
                    <i class="fas fa-angle-left"></i>
                    Trở về
                </span>
                <div class="inner_process d-flex align-items-center">
                    <div id="ball_5" class="ball"></div>
                    <div id="ball_4" class="ball"></div>
                    <div id="ball_3" class="ball"></div>
                    <div id="ball_2" class="ball"></div>
                    <div id="ball_1" class="ball"></div>
                    <div id="ball_0" class="ball"></div>
                </div>
                <span>
                    Ngôn ngữ
                    <i class="fas fa-caret-down"></i>
                </span>
            </div>
            <div class="uchiru_box--body">
                <div id="under-start-wall" class="scene_under_start blur_effect">
                    <div class="caption">
                        Ai có nhiều khối hơn?
                    </div>
                    <div class="context d-flex">
                        <div class="context--answer answer_1">
                            <div class="row_1 d-flex justify-content-between">
                                <div class="context--answer__kid"></div>
                                <div id="list-block-one" class="context--answer__blocks">
                                    <!-- <img class="block block_0" src="../resources/main_page/images/block.png" alt="">
                                    <img class="block block_1" src="../resources/main_page/images/block.png" alt="">
                                    <img class="block block_2" src="../resources/main_page/images/block.png" alt="">
                                    <img class="block block_3" src="../resources/main_page/images/71.png" alt="" style="width: 53px; height: 53px;"> -->
                                </div>
                            </div>
                            <div class="context--answer__floor"></div>
                            <div class="context--answer__name">Lan</div>
                            <div id="answerA" class="context--answer__ok" disabled="true">Ok</div>
                        </div>
                        <div class="arrows_list">
                            <!-- <img class="arrows_list--item__green arrows_item_0" src="../resources/main_page/images/31.png" alt="">
                            <img class="arrows_list--item__green arrows_item_1" src="../resources/main_page/images/31.png" alt="">
                            <img class="arrows_list--item__green arrows_item_2" src="../resources/main_page/images/31.png" alt="">
                            <img class="arrows_list--item__red arrows_item_3" src="../resources/main_page/images/33.png" alt=""> -->
                        </div>
                        <div class="context--answer answer_2">
                            <div class="row_1 d-flex justify-content-between">
                                <div id="list-block-two" class="context--answer__blocks">
                                    <!-- <img class="block block_0" src="../resources/main_page/images/block.png" alt="">
                                    <img class="block block_1" src="../resources/main_page/images/block.png" alt="">
                                    <img class="block block_2" src="../resources/main_page/images/block.png" alt="">
                                    <img class="block block_3" src="../resources/main_page/images/block.png" alt=""> -->
                                </div>
                                <div class="context--answer__kid"></div>
                            </div>
                            <div class="context--answer__floor"></div>
                            <div class="context--answer__name">Long</div>
                            <div id="answerB" class="context--answer__ok">Ok</div>
                        </div>
                    </div>
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
        crossorigin="anonymous"></script>

    <script src="<c:url value = "/resources/main_page/js/View.js"/>"></script>
    <script src="<c:url value = "/resources/main_page/js/component.js"/>"></script>
    <script src="<c:url value = "/resources/main_page/js/Controller.js"/>"></script>
    <script src="<c:url value = "/resources/main_page/js/Model.js"/>"></script>
    <script type="text/javascript">
        let model = new Model();
        model.numberQuestionOfLesson = <%= request.getAttribute("trueAnswerRequired")%>
        const view = new View(model);
        view.openPage();
    </script>
</body>
</html>
