package question.concreteQuestion;

import answer.Answer;
import answer.GiveNumberAnswer;
import entity.Block;
import question.abstractQuestion.GiveNumberQuestion;

import java.util.Random;

public class GiveTheSameNumberQuestion extends GiveNumberQuestion {
    private Block[] fixedBlock;
    private final int rNumber = 5;


    public GiveTheSameNumberQuestion(){
        answer = new GiveNumberAnswer( (int) (Math.random() * rNumber));
    }

    @Override
    public Answer getAnswer() {
        return answer;
    }

    @Override
    public String toString() {
        return "initNumber: " + answer.getValue();
    }
}
