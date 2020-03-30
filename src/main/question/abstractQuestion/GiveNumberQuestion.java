package main.question.abstractQuestion;

import main.answer.Answer;
import main.answer.GiveNumberAnswer;
import main.question.Question;

public abstract class GiveNumberQuestion implements Question {
    public GiveNumberAnswer answer;

    @Override
    public Answer getAnswer() {
        return answer;
    }
}
