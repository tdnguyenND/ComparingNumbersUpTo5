package question.concreteQuestion;

import answer.Answer;
import answer.GiveNumberAnswer;
import entity.Block;
import question.abstractQuestion.GiveNumberQuestion;

public class GiveTheSameNumberQuestion extends GiveNumberQuestion {
    private Block[] fixedBlock;
    private final int rNumber = 5;

    public GiveTheSameNumberQuestion(){
        answer = new GiveNumberAnswer((int)  Math.random()% rNumber + 1);
    }

    @Override
    public Answer getAnswer() {
        return answer;
    }


}
