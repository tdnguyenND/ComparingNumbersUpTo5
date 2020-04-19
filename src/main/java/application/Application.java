package application;

import exception.StageCloseException;

public class Application {
    private Stage[] stages;
    int currentStage = 0;

    public  Application(){
        stages = Stage.ALL;
        stages[currentStage].open();
    }

    public void openNextStage(){
        currentStage++;
        stages[currentStage].open();
    }

    public Stage getStage(int stageID) throws StageCloseException{
        Stage res = stages[stageID - 1];
        //if (!res.isOpened()) throw new StageCloseException();
        return stages[stageID - 1];
    }
}
