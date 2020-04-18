package controller;

import application.Application;
import application.Stage;
import exception.StageCloseException;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/question")
public class QuestionController {
    public static final Application app = (Application) new ClassPathXmlApplicationContext("config/Beans.xml").getBean("app");

    @RequestMapping(value = "/{stageID}", method = RequestMethod.GET)
    public @ResponseBody String getQuestion(@PathVariable int stageID) throws StageCloseException {
        Stage currentStage = app.getStage(stageID);
        return currentStage.getQuestion();
    }
}
