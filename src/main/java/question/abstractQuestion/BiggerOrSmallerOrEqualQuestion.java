package question.abstractQuestion;

import answer.*;
import question.Question;

public abstract class BiggerOrSmallerOrEqualQuestion implements Question {
    private BiggerOrSmallerOrEqualAnswer answer;

    @Override
    public Answer getAnswer() {
        return answer;
    }
}
