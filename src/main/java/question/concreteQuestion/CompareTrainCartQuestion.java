package question.concreteQuestion;

import answer.Answer;
import answer.BiggerOrSmallerOrEqualAnswer;
import entity.TrainCart;
import question.abstractQuestion.BiggerOrSmallerOrEqualQuestion;

import java.util.Random;

public class CompareTrainCartQuestion extends BiggerOrSmallerOrEqualQuestion {
    private TrainCart[] fixedTrainCarts;
    private TrainCart[] unfixedTrainCarts;
    private int fixedNumber ;
    private int unfixedNumber;
    private final int rNumber = 4;


    public CompareTrainCartQuestion(){
        fixedNumber = (int)(Math.random() * rNumber + 1);
        unfixedNumber = (int)(Math.random() * rNumber  + 1);
    }

    @Override
    public Answer getAnswer() {
        if(fixedNumber == unfixedNumber) answer = BiggerOrSmallerOrEqualAnswer.EQUAL;
        else  if (fixedNumber > unfixedNumber) answer = BiggerOrSmallerOrEqualAnswer.BIGGER;
        else answer = BiggerOrSmallerOrEqualAnswer.SMALLER;
        return answer;
    }

    @Override
    public String toString() {
        return "fixedNumber: " + fixedNumber + " unfixedNumber: " + unfixedNumber;
    }

    @Override
    public boolean equals(Object obj) {
        if( this == obj) return true;
        if( obj == null ) return false;
        if( obj instanceof CompareTrainCartQuestion ){
            CompareTrainCartQuestion other = (CompareTrainCartQuestion) obj;
            if( other.fixedNumber == this.fixedNumber && other.unfixedNumber == this.unfixedNumber)
                return true;
            return false;
        }
        return false;
    }
}
