package answer;

public enum BiggerOrSmallerAnswer implements Answer{
    BIGGER,
    SMALLER;

    @Override
    public boolean compare(Object obj) {
        return this == obj;
    }
}
