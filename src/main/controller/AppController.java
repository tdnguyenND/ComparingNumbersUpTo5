package main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class AppController {
    @RequestMapping(path = "/")
    public void mainPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("index.js").forward(request, response);
    }

    @RequestMapping(path = "lesson/part1")
    public void whoHasMoreBlocks(HttpServletRequest request, HttpServletResponse response){
    }
}
