package application;

import answer.Answer;
import question.Question;
import questionFactory.QuestionFactory;

public class Stage {
    private QuestionFactory questionFactory;
    private Question currentQuestion;
    private int trueAnswerRequired;
    private int currentTrueAnswer;
    private boolean completed;
    private boolean isOpened;
    private boolean firstTime = true;

    public Stage(QuestionFactory questionFactory,int trueAnswerRequired){
        this.questionFactory = questionFactory;
        this.trueAnswerRequired = trueAnswerRequired;
        currentQuestion = null;
        this.currentTrueAnswer = 0;

    }

    void generateNewQuestion(){
        if (currentQuestion == null){
            currentQuestion = questionFactory.createQuestion();
        } else {
            Question temp;
            do {
                temp = questionFactory.createQuestion();
            } while ( temp.equals(currentQuestion));

            currentQuestion = temp;
        }

        firstTime = true;
    }

    //khong biet dat ten ham nhung dai loai la:
//     + Nếu currentQuestion == null thì tạo moi


    void open(){
        isOpened = true;
    }

    void reply(Answer ans){
        if(firstTime){
            if (ans == currentQuestion.getAnswer()) {
                // tao hieu ung bay cai vien dan khi currentTrueAnswer > 0
                currentTrueAnswer++;
                complete();
                generateNewQuestion();

            } else{
                firstTime = false;
                //cho vien dan quay lai neu currentTrueAnser > 0
                currentTrueAnswer--;
            }
        } else {
            if(ans == currentQuestion.getAnswer()){
                generateNewQuestion();
            } else firstTime = false;
        }
    }

    void complete(){
        if (currentTrueAnswer == trueAnswerRequired)
            completed = true;
    }

    public boolean isCompleted() {
        return completed;
    }
}
