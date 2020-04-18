package controller;

import answer.Answer;
import application.Application;
import application.Stage;
import exception.StageCloseException;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/answer")
public class AnswerController {

    public static final Application app = (Application) new ClassPathXmlApplicationContext("config/Beans.xml").getBean("app");

    @RequestMapping(value = "/{stageID}", method = RequestMethod.POST)
    public @ResponseBody String postAnswer(@RequestParam String answerContent, @PathVariable int stageID) throws StageCloseException {
        Stage currentStage = app.getStage(stageID);
        Answer answer = currentStage.toAnswer(answerContent);
        return currentStage.reply(answer);
    }
}
