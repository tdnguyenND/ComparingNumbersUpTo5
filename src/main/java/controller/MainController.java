package controller;

import application.Application;
import application.Stage;
import exception.StageCloseException;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController {
    private final String[] lessonName = {"lesson1", "lesson2", "lesson3", "lesson4"};
    private Application app = (Application) new ClassPathXmlApplicationContext("config/Beans.xml").getBean("app");
    @RequestMapping(value = "/")
    public String mainPage() {
        return "mainPage";
    }

    @RequestMapping(value = "lesson/{lessonID}")
    public String openLesson(@PathVariable int lessonID) throws StageCloseException {
        Stage stage = app.getStage(lessonID);
        stage.setCurrentTrueAnswer(0);
        return lessonName[lessonID-1];
    }
}
