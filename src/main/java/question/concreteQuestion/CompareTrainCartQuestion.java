package question.concreteQuestion;

import entity.TrainCart;
import question.abstractQuestion.BiggerOrSmallerOrEqualQuestion;

public class CompareTrainCartQuestion extends BiggerOrSmallerOrEqualQuestion {
    private TrainCart[] fixedTrainCarts;
    private TrainCart[] unfixedTrainCarts;
}
