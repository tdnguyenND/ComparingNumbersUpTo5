package questionFactory;

import question.Question;
import question.concreteQuestion.CompareTrainCartQuestion;

public class CompareTrainCartFactory implements  QuestionFactory {

    private CompareTrainCartQuestion question;
    @Override
    public Question createQuestion() {

        question = new CompareTrainCartQuestion();
        return question;
    }
}
