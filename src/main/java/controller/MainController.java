package controller;

import application.Application;
import application.Stage;
import exception.StageCloseException;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController {
    private final String[] lessonName = {"lessonForm", "lesson2", "lesson3", "lesson4"};
    private Application app = (Application) new ClassPathXmlApplicationContext("config/Beans.xml").getBean("app");
    @RequestMapping(value = "/")
    public String mainPage() {
        return "mainPage";
    }

    @RequestMapping(value = "lesson/{lessonID}")
    public String openLesson(@PathVariable int lessonID, ModelMap modelMap) throws StageCloseException {
        Stage stage = app.getStage(lessonID);
        modelMap.addAttribute("trueAnswerRequired", stage.getTrueAnswerRequired());
        stage.setCurrentTrueAnswer(0);
        return lessonName[lessonID-1];
    }

    @RequestMapping(value = "/completed")
    public String finishPage(){
        return "completedLesson";
    }
}
