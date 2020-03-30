package main.answer;

public class GiveNumberAnswer implements Answer {
    private int value;
    private GiveNumberAnswer(int value){
        this.value = value;
    }
    public static GiveNumberAnswer withValue(int value){
        return new GiveNumberAnswer(value);
    }
}
