<!-- <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page contentType="text/html; charset=UTF-8" %> -->
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dragon Learn</title>
    <link href="<c:url value = "/resources/main_page/css/main.css"/>" rel="stylesheet">

    <link rel="shortcut icon" href="<c:url value = "/resources/main_page/images/dragon_favicon.png"/>" type="image/x-icon">
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
            <div class="row">
                <div class="col-3">
                    <a class="back-btn-block" href="#">
                        <i class="fas fa-arrow-circle-left"></i>
                        Back
                    </a>
                    <div class="program-menu d-flex flex-column">
                        <div class="program-menu--item" style="background-color: #00ad9b;border-radius: 5px 5px 0 0; color: white;
                        ">
                            Numbers
                        </div>
                        <div class="program-menu--item">
                            Operations
                        </div>
                        <div class="program-menu--item">
                            Geometry
                        </div>
                        <div class="program-menu--item">
                            Measurement
                        </div>
                        <div class="program-menu--item"
                            style="background: url('<c:url value ="/resources/main_page/images/secret-lab-label.svg"/>') no-repeat right;">
                            Secret Lab
                        </div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="bread-crumb d-flex">
                        <div class="bread-crumb--item">Programme</div>
                        <div class="bread-crumb--separator"><i class="fas fa-angle-right"></i></div>
                        <div class="bread-crumb--item">Numbers</div>
                        <div class="bread-crumb--separator"><i class="fas fa-angle-right"></i></div>
                        <div class="bread-crumb--item" style="font-weight: bold;">Numbers and counting from 0 to 5</div>
                    </div>
                    <div class="lesson-title">So sánh các số nhỏ hơn 5</div>
                    <div class="lesson-card-row d-flex justify-content-between">
                        <div class="lesson-card-item first">
                            <a href="/lesson/1">
                                <div class="lesson-card-item--status"></div>
                                <div class="lesson-card-item--preview"></div>
                                <div class="lesson-card-item--title">
                                    Ai có nhiều khối hơn?
                                </div>
                            </a>
                        </div>
                        <div class="lesson-card-item second">
                            <div class="lesson-card-item--status"></div>
                            <div class="lesson-card-item--preview"></div>
                            <div class="lesson-card-item--title">
                                Giúp các bạn có số khối bằng nhau!
                            </div>
                        </div>
                        <div class="lesson-card-item third">
                            <div class="lesson-card-item--status"></div>
                            <div class="lesson-card-item--preview"></div>
                            <div class="lesson-card-item--title">
                                Ai có nhiều khối hơn?
                            </div>
                        </div>
                        <div class="lesson-card-item last">
                            <div class="lesson-card-item--status"></div>
                            <div class="lesson-card-item--preview"></div>
                            <div class="lesson-card-item--title">
                                Ai có nhiều toa tàu hơn?
                            </div>
                        </div>
                    </div>
                </div>
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
    
</body>

</html>