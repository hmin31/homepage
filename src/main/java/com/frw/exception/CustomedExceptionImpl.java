package com.frw.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CustomedExceptionImpl extends CommonRuntimeExceptionImpl {

	private static final long serialVersionUID = 5534060774742162622L;
	protected final Logger log = LoggerFactory.getLogger(CustomedExceptionImpl.class);

	public CustomedExceptionImpl(String message) {
		super(message);
	}

	public CustomedExceptionImpl(int errorCode, String message) {
		super(errorCode, message);
	}

	public CustomedExceptionImpl(int errorCode, String arg[]) {
		super(errorCode, arg);
	}
	
	public CustomedExceptionImpl(int errorCode, String message, String viewName) {
		super(errorCode, message, viewName);
	}

	public CustomedExceptionImpl() {
		super();
	}
}
