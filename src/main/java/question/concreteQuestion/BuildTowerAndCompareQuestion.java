package question.concreteQuestion;

import answer.Answer;
import answer.BiggerOrSmallerOrEqualAnswer;
import question.abstractQuestion.BiggerOrSmallerOrEqualQuestion;

public class BuildTowerAndCompareQuestion extends BiggerOrSmallerOrEqualQuestion {
    private int firstNumber;
    private int secondNumber;
    private final int max =  5;
    private final int min = 1;
    public BuildTowerAndCompareQuestion(){
        firstNumber = (int)(Math.random() * (max - min) + min);
        secondNumber = (int) (Math.random() * (max - min) + min) ;
    }

    @Override
    public Answer getAnswer() {
        if (firstNumber == secondNumber) answer = BiggerOrSmallerOrEqualAnswer.EQUAL;
        else if(firstNumber > secondNumber) answer = BiggerOrSmallerOrEqualAnswer.BIGGER;
        else answer = BiggerOrSmallerOrEqualAnswer.SMALLER;
        return answer;
    }

    public int getFirstNumber() {
        return firstNumber;
    }

    public int getSecondNumber() {
        return secondNumber;
    }

    @Override
    public String toString(){
        return "{\n\t\"first\": " + firstNumber + ",\n\t\"second\": " + secondNumber + "\n}";
    }
}