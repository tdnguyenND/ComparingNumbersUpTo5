<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 3/30/2020
  Time: 9:17 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
    <input type="text" id="answer">
    <button onclick="submit()">submit</button>
    <script>
        axios({
            method:"get",
            url:"/question/1"
        });
    </script>
    <script>
        submit = function () {
            axios({
                url:"/answer/1",
                method:"post",
                params:{
                    answerContent: document.getElementById("answer").value
                }
            })
        }
    </script>
</body>
</html>
