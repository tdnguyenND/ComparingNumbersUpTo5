package question.concreteQuestion;

import answer.Answer;
import answer.GiveNumberAnswer;
import entity.Block;
import question.abstractQuestion.GiveNumberQuestion;


public class GiveTheSameNumberQuestion extends GiveNumberQuestion {
    private Block[] fixedBlock;
    private final int rNumber = 4;

    public GiveTheSameNumberQuestion(){
        fixedBlock = new Block[(int) (Math.random() * rNumber + 1)];
        answer = new GiveNumberAnswer(fixedBlock.length);
    }

    @Override
    public Answer getAnswer() {
        return answer;
    }

    @Override
    public String toString() {
        return "{\"fixedNumber\": \"" + fixedBlock.length + "\"}";
    }
}
