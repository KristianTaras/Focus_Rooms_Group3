package hr.algebra.exception;

public class DuplicateUserException extends RuntimeException {
    public DuplicateUserException(String m) {
        super(m);
    }
}
