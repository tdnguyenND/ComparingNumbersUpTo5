package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class MainController {
    @RequestMapping(value = "/")
    public String mainPage() {
        return "mainPage";
    }

    @RequestMapping(value = "lesson/part1")
    public void whoHasMoreBlocks(HttpServletRequest request, HttpServletResponse response){
    }
}
