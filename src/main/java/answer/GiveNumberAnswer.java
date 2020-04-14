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
        if(obj == null) return false;
        if(obj instanceof GiveNumberAnswer){
            GiveNumberAnswer other = (GiveNumberAnswer) obj;
            if( other.value == this.value)
                return true;
            return false;
        }
        return false;
    }
}
