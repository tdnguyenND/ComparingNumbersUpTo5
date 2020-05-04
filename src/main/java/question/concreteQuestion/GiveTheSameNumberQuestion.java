package question.concreteQuestion;

import answer.Answer;
import answer.GiveNumberAnswer;
import question.abstractQuestion.GiveNumberQuestion;

public class GiveTheSameNumberQuestion extends GiveNumberQuestion {
    private int fixedNumber;
    private final int max = 5;
    private final int min = 1;

    public GiveTheSameNumberQuestion(){
        fixedNumber = (int)  (Math.random() * (max - min) + min);
        answer = new GiveNumberAnswer(fixedNumber);
    }

    public int getFixedNumber() {
        return fixedNumber;
    }

    @Override
    public Answer getAnswer() {
        return answer;
    }

    @Override
    public String toString() {
        return "{\"fixedNumber\": " + fixedNumber + "}";
    }
}