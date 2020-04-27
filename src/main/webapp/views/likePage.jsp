<!-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page contentType="text/html; charset=UTF-8" %> -->
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dragon Learn</title>
    <link href="<c:url value = "/resources/like_page/css/main.css"/>" rel="stylesheet">
    <link rel="shortcut icon" href="../resources/images/dragon_favicon.png" type="image/x-icon">
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
<section class="main">
    <div class="main--containner">
        <div class="rating">
            <h1 class="rating-header">Bạn thích hoạt động này chứ?</h1>
            <div class="card-rating">
                <div class="rating-item simple-yes" data-value="5"></div>
                <div class="rating-item simple-no" data-value="1"></div>
            </div>
            <div class="card-rating-form">
                <form method="post">
                    <button class="btn btn-default" disabled="disabled" name="button" type="submit">
                        Next
                        <i class="fas fa-angle-right"></i>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>

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
<script src="/resources/like_page/js/main.js"></script>

</body>

</html>