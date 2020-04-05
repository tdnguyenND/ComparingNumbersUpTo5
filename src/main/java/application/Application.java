package application;

import questionFactory.BuildTowerAndCompareFactory;
import questionFactory.CompareBlockFactory;
import questionFactory.CompareTrainCartFactory;

public class Application {
    private Stage[] stages;
    int currentStage = 0;

    public  Application(){
        stages = new Stage[4];
        stages[0] = new Stage(new CompareBlockFactory(),6);
        stages[1] = new Stage(new BuildTowerAndCompareFactory(),3);
        stages[2] = new Stage(new BuildTowerAndCompareFactory(),5);
        stages[3] = new Stage(new CompareTrainCartFactory(),5);
        stages[currentStage].open();
    }
    public void checkStage(){
        if(stages[currentStage].isCompleted()) currentStage++;
        stages[currentStage].open();
    }
}
