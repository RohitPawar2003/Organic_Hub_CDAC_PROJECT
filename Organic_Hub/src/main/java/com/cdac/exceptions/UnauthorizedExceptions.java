package com.cdac.exceptions;

public class UnauthorizedExceptions extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public UnauthorizedExceptions(String message) {
        super(message);
    }
}
