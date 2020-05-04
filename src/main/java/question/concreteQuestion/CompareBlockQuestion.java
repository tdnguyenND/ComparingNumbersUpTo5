package question.concreteQuestion;

import answer.Answer;
import answer.BiggerOrSmallerAnswer;
import question.abstractQuestion.BiggerOrSmallerQuestion;

public class CompareBlockQuestion extends BiggerOrSmallerQuestion {
    private int firstNumber;
    private int secondNumber;
    private final int max = 5;
    private final int min = 1;

    public CompareBlockQuestion(){
        firstNumber = (int) (Math.random() * (max - min) + min);
        do {
            secondNumber =  (int) (Math.random() * (max - min) + min);
        } while (secondNumber == firstNumber);
    }

    @Override
    public Answer getAnswer() {
        if(firstNumber > secondNumber) answer = BiggerOrSmallerAnswer.BIGGER;
        else answer= BiggerOrSmallerAnswer.SMALLER;
        return answer;
    }

    public int getFirstNumber() {
        return firstNumber;
    }

    public int getSecondNumber() {
        return secondNumber;
    }

    @Override
    public String toString() {
        return "{\n\t\"first\": " + firstNumber + ",\n\t\"second\": " + secondNumber + "\n}";
    }
}