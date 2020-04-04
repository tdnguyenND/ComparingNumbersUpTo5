package question.abstractQuestion;

import answer.Answer;
import answer.BiggerOrSmallerAnswer;
import question.Question;

public abstract class BiggerOrSmallerQuestion implements Question {
    private BiggerOrSmallerAnswer answer;

    @Override
    public Answer getAnswer() {
        return answer;
    }
}
