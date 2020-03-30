package main.application;

import main.answer.Answer;
import main.question.Question;
import main.questionFactory.QuestionFactory;

public class Stage {
    private QuestionFactory questionFactory;
    private Question currentQuestion;
    private int trueAnswerRequired;
    private int currentTrueAnswer;
    private boolean completed;
    private boolean isOpened;

    void generateNewQuestion(){

    }

    void open(){
        isOpened = true;
    }

    void reply(Answer ans){

    }

    void complete(){

    }
}
