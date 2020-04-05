package question.concreteQuestion;

import answer.Answer;
import answer.BiggerOrSmallerAnswer;
import entity.Block;
import question.abstractQuestion.BiggerOrSmallerQuestion;

import java.util.Random;

public class CompareBlockQuestion extends BiggerOrSmallerQuestion {
    private Block[][] fixedBlocks;
    private int number1;
    private int number2;
    private final int rNumber = 5;


    public CompareBlockQuestion(){
        number1 = (int) (Math.random() * rNumber);
        do {
            number2 =  (int) (Math.random() * rNumber);
        } while (number2 == number1);
    }

    @Override
    public Answer getAnswer() {
        if(number1 > number2) answer =  BiggerOrSmallerAnswer.BIGGER;
        else answer= BiggerOrSmallerAnswer.SMALLER;
        return answer;
    }

    @Override
    public String toString() {
        return "number1: " + number1 + " number2: " + number2;
    }
}
