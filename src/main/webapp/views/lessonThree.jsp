<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dragon Learn</title>
    <link rel="shortcut icon" href="<c:url value = "/resources/images/dragon_favicon.png"/>" type="image/x-icon">
    <link rel="stylesheet" href="<c:url value = "/resources/template/css/main.css"/>">
    <link rel="stylesheet" href="<c:url value = "/resources/lesson3/css/main.css"/>">
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>


    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans&display=swap" rel="stylesheet">
</head>
<body>
<data id="trueAnswerRequired" value="<%= request.getAttribute("trueAnswerRequired")%>"/>
<script src = '/resources/template/component/Components.js'></script>
<script>
    let c = new Components()
    let e = document.createElement('div')
    e.innerHTML = c.lessonTemplate
    document.body.insertBefore(e, document.body.firstChild)
    document.getElementById('under-start-wall').innerHTML = c.lessonThree
</script>
<script src="/resources/template/mvc/BasicEventController.js"></script>
<script src="/resources/template/mvc/MoveItemController.js"></script>
<script src="/resources/template/mvc/SuggestionController.js"></script>
<script src="/resources/template/mvc/InteractiveController.js"></script>
<script src="/resources/template/mvc/Model.js"></script>
<script src="/resources/template/mvc/View.js"></script>
<script src="/resources/lesson3/js/main.js"></script>
</body>
</html>
