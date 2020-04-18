package application;

import answer.Answer;
import answer.BiggerOrSmallerAnswer;
import answer.BiggerOrSmallerOrEqualAnswer;
import answer.GiveNumberAnswer;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import question.Question;
import questionFactory.*;

public enum Stage {
    STAGE1(new CompareBlockFactory(), 6),
    STAGE2(new GiveTheSameNumberFactory(), 3),
    STAGE3(new BuildTowerAndCompareFactory(), 5),
    STAGE4(new CompareTrainCartFactory(), 5);

    public static Stage[] ALL = {STAGE1, STAGE2, STAGE3, STAGE4};
    public static final Application app = (Application) new ClassPathXmlApplicationContext("config/Beans.xml").getBean("app");

    private QuestionFactory questionFactory;
    private Question currentQuestion;

    private int trueAnswerRequired;
    private int currentTrueAnswer;

    private boolean completed;
    private boolean isOpened;

    Stage(QuestionFactory questionFactory,int trueAnswerRequired){
        this.questionFactory = questionFactory;
        this.trueAnswerRequired = trueAnswerRequired;
        this.currentQuestion = null;
        this.currentTrueAnswer = 0;

        this.isOpened = false;
        this.completed = false;
    }


    void open(){
        isOpened = true;
    }

    public String getQuestion(){
        if (currentQuestion == null) generateNewQuestion();
        return currentQuestion.toString();
    }

    public void generateNewQuestion(){
        currentQuestion = questionFactory.createQuestion();
    }

    public Answer toAnswer(String t){
        switch (this){
            case STAGE1:
                return BiggerOrSmallerAnswer.valueOf(t);
            case STAGE2:
                return new GiveNumberAnswer(Integer.parseInt(t));
            case STAGE3:
            case STAGE4:
                return BiggerOrSmallerOrEqualAnswer.valueOf(t);
            default:
                return null;
        }
    }

    public String reply(Answer answer) {
        if (isTrueAnswer(answer)){
            trueAnswerHandle();
            return "true";
        }else {
            falseAnswerHandle();
            return "false";
        }
    }

    private boolean isTrueAnswer(Answer ans){
        return currentQuestion.getAnswer().compare(ans);
    }

    private void trueAnswerHandle() {
        currentTrueAnswer++;
        currentQuestion = null;
        if (currentTrueAnswer == trueAnswerRequired) this.complete();
    }

    private void falseAnswerHandle() {
        currentTrueAnswer--;
    }

    void complete(){
        if (!completed) {
            completed = true;
            app.openNextStage();
        }
    }

    public boolean isOpened(){
        return isOpened;
    }

    public void setCurrentTrueAnswer(int i) {
        this.currentTrueAnswer = i;
    }

    public int getTrueAnswerRequired() {
        return trueAnswerRequired;
    }
}
