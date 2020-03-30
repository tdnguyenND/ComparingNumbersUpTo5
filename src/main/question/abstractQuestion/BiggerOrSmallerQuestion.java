package main.question.abstractQuestion;

import main.answer.Answer;
import main.answer.BiggerOrSmallerAnswer;
import main.question.Question;

public abstract class BiggerOrSmallerQuestion implements Question {
    private BiggerOrSmallerAnswer answer;

    @Override
    public Answer getAnswer() {
        return answer;
    }
}
