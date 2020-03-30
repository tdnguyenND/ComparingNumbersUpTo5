package main.question.concreteQuestion;

import main.entity.TrainCart;
import main.question.abstractQuestion.BiggerOrSmallerOrEqualQuestion;

public class CompareTrainCartQuestion extends BiggerOrSmallerOrEqualQuestion {
    private TrainCart[] fixedTrainCarts;
    private TrainCart[] unfixedTrainCarts;
}
