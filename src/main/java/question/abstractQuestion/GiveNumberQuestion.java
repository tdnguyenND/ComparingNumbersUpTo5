package question.abstractQuestion;

import answer.Answer;
import answer.GiveNumberAnswer;
import question.Question;

public abstract class GiveNumberQuestion implements Question {
    public GiveNumberAnswer answer;

    @Override
    public Answer getAnswer() {
        return answer;
    }
}
