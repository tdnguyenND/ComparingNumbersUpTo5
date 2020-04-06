package questionFactory;

import question.Question;
import question.concreteQuestion.BuildTowerAndCompareQuestion;

public class BuildTowerAndCompareFactory implements QuestionFactory {

    BuildTowerAndCompareQuestion question;
    @Override
    public Question createQuestion() {
        question = new BuildTowerAndCompareQuestion();
        return question;
    }
}
