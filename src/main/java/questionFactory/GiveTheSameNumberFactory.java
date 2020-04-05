package questionFactory;

import question.Question;
import question.concreteQuestion.GiveTheSameNumberQuestion;

public class GiveTheSameNumberFactory implements QuestionFactory {

    GiveTheSameNumberQuestion question;
    @Override
    public Question createQuestion() {

        question = new GiveTheSameNumberQuestion();
        return question;
    }
}
