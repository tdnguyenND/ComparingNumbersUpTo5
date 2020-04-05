package answer;

public class GiveNumberAnswer implements Answer {
    private int value;
    public GiveNumberAnswer(int value){
        this.value = value;
    }
    public  int getValue(){
        return  this.value;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj.getClass() != GiveNumberAnswer.class) return false;
        GiveNumberAnswer other = (GiveNumberAnswer) obj;
        if (other.value == this.value) return true;
        return  false;
    }
}
