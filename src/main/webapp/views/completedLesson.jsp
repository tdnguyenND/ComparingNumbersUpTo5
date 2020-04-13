<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <link href="<c:url value = "/resources/main_page/css/main.css"/>" rel="stylesheet">
    <link href="<c:url value = "/resources/completedLesson/css/completedLesson.css"/>" rel="stylesheet">


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans&display=swap" rel="stylesheet">
</head>

<body>
    <div class="banner-wrapper sticky-top">
        <div class="banner-wrapper--block">
        </div>
    </div>
    <section class="header">
        <div class="header--container d-flex">
            <div class="header--logo">
                <a href="#"></a>
            </div>
            <div class="header--nav">
                <a href="#" class="header--nav-item">Main page</a>
                <a href="#" class="header--nav-item">My classes</a>
                <a href="#" class="header--nav-item">Portfolio</a>
            </div>
            <div class="header--right ml-auto d-flex align-items-center">
                <div class="header--right-invite mr-auto">
                    <a href="#">Invite a colleague</a>
                </div>
                <div class="header--right-profile">
                    John
                    <i class="fas fa-angle-down"></i>
                </div>
            </div>
        </div>
    </section>
    <section class="card_completed">
        <div class="card_completed--title">Giỏi quá! Bạn đã hoàn thành bài học!</div>
        <div class="card_completed--congrats"></div>
        <a href="<c:url value="/"/>">
            <div class="card_completed--button">Tiếp tục</div>
        </a>
    </section>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"></script>

</body>

</html>