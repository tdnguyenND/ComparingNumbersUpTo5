package question.concreteQuestion;

import answer.Answer;
import answer.GiveNumberAnswer;
import entity.Block;
import question.abstractQuestion.GiveNumberQuestion;


public class GiveTheSameNumberQuestion extends GiveNumberQuestion {
    private Block[] fixedBlock;
    private final int rNumber = 4;


    public GiveTheSameNumberQuestion(){
        answer = new GiveNumberAnswer( (int) (Math.random() * rNumber + 1));
    }

    @Override
    public Answer getAnswer() {
        return answer;
    }

    @Override
    public String toString() {
        return "{\n\t\"initNumber\": " + answer.getValue() + "\n}";
    }

    @Override
    public boolean equals(Object obj) {
        if( this == obj ) return true;
        if (obj == null) return false;
        if( obj instanceof GiveTheSameNumberQuestion){
            GiveTheSameNumberQuestion other = (GiveTheSameNumberQuestion) obj;
            if( this.answer.equals(other.answer))
                return true;
            return false;
        }
        return false;
    }
}
