package main.question.abstractQuestion;

import main.answer.*;
import main.question.Question;

public abstract class BiggerOrSmallerOrEqualQuestion implements Question {
    private BiggerOrSmallerOrEqualAnswer answer;

    @Override
    public Answer getAnswer() {
        return answer;
    }
}
