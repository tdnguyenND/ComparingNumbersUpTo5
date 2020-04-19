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
    public String toString(){
        return "{\n\t\"first\": " + fixedNumber + ",\n\t\"second\": " + unfixedNumber + "\n}";
    }
}
