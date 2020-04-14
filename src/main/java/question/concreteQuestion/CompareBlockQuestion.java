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
    private final int rNumber = 4;


    public CompareBlockQuestion(){
        number1 = (int) (Math.random() * rNumber + 1);
        do {
            number2 =  (int) (Math.random() * rNumber + 1);
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

        return "{\n\t\"first\": " + number1 + ",\n\t\"second\": " + number2 + "\n}";
    }

    @Override
    public boolean equals(Object obj) {
        if ( this == obj ) return true;
        if( obj == null ) return false;
        if ( obj instanceof CompareBlockQuestion ){
            CompareBlockQuestion other = (CompareBlockQuestion) obj;
            if( other.number1 == this.number1 && other.number2 == this.number2 )
                return true;
            return false;
        }
        return false;
    }
}
