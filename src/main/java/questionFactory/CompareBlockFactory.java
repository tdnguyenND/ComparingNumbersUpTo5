package questionFactory;


import question.Question;
import question.concreteQuestion.CompareBlockQuestion;

public class CompareBlockFactory implements QuestionFactory {
    private Question question;
    @Override
    public Question createQuestion() {
        question = new CompareBlockQuestion();
        return question;
    }
}
