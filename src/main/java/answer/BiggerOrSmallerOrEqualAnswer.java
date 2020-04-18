package answer;

public enum BiggerOrSmallerOrEqualAnswer implements Answer {
    BIGGER,
    SMALLER,
    EQUAL;

    @Override
    public boolean compare(Object obj) {
        return this == obj;
    }
}
