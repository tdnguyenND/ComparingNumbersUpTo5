package question.concreteQuestion;

import answer.Answer;
import answer.BiggerOrSmallerOrEqualAnswer;
import entity.Block;
import question.abstractQuestion.BiggerOrSmallerOrEqualQuestion;

public class BuildTowerAndCompareQuestion extends BiggerOrSmallerOrEqualQuestion {
    private Block[] fixedBlocks;
    private Block[] unfixedBlocks;
    private int fixedNumber;
    private int unfixedNumber;
    private  final int rNumber =  4;
    public BuildTowerAndCompareQuestion(){
        fixedNumber = (int)(Math.random() * rNumber + 1)  ;
        unfixedNumber = (int) (Math.random() * (rNumber + 1) + 1) ;
    }

    @Override
    public Answer getAnswer() {
        if (fixedNumber == unfixedNumber) answer = BiggerOrSmallerOrEqualAnswer.EQUAL;
        else if(fixedNumber > unfixedNumber) answer = BiggerOrSmallerOrEqualAnswer.BIGGER;
        else answer = BiggerOrSmallerOrEqualAnswer.SMALLER;
        return answer;
    }

    @Override
    public String toString() {
        return "fixedNumber: " + fixedNumber + " unfixedNumber: " + unfixedNumber;
    }

    @Override
    public boolean equals(Object obj) {
        if ( this == obj ) return true;
        if ( obj == null ) return false;
        if( obj instanceof  BuildTowerAndCompareQuestion ){
            BuildTowerAndCompareQuestion other = (BuildTowerAndCompareQuestion) obj;
            if( other.fixedNumber == this.fixedNumber && other.unfixedNumber == this.unfixedNumber )
                return true;
            return false;
        }
        return false;
    }
}
