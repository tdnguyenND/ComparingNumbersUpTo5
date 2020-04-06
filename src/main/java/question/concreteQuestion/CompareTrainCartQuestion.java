package question.concreteQuestion;

import answer.Answer;
import answer.BiggerOrSmallerOrEqualAnswer;
import entity.TrainCart;
import question.abstractQuestion.BiggerOrSmallerOrEqualQuestion;

public class CompareTrainCartQuestion extends BiggerOrSmallerOrEqualQuestion {
    private TrainCart[] fixedTrainCarts;
    private TrainCart[] unfixedTrainCarts;
    private int fixNumber ;
    private int unfixNumber;
    private final int rNumber = 6;

    public CompareTrainCartQuestion(){
        fixNumber = (int) ( Math.random() % rNumber+ 1);
        unfixNumber = (int) (Math.random() % rNumber + 1);
    }

    @Override
    public Answer getAnswer() {
        if(fixNumber == unfixNumber) answer = BiggerOrSmallerOrEqualAnswer.EQUAL;
        else  if (fixNumber > unfixNumber) answer = BiggerOrSmallerOrEqualAnswer.BIGGER;
        else answer = BiggerOrSmallerOrEqualAnswer.SMALLER;
        return answer;
    }
}
