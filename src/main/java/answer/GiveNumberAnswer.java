package answer;

public class GiveNumberAnswer implements Answer {
    private int value;
    public GiveNumberAnswer(int value){
        this.value = value;
    }

    @Override
    public boolean compare(Object obj) {
        if (this == obj) return true;
        if (obj.getClass() != GiveNumberAnswer.class) return false;
        GiveNumberAnswer other = (GiveNumberAnswer) obj;
        if (other.value == this.value) return true;
        return  false;
    }
}
