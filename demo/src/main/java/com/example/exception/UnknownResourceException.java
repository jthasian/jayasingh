package com.example.exception;

/**
 * Simulated business-logic exception indicating a desired business entity or record cannot be found.
 */
public class UnknownResourceException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1411697043406018761L;

	public UnknownResourceException(String msg) {
        super(msg);
    }
}