package com.cdac.exceptions;

public class ResourceNotFoundExceptions extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ResourceNotFoundExceptions(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
    }

    public ResourceNotFoundExceptions(String message) {
        super(message);
    }
}
