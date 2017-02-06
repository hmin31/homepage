package com.frw.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoginExceptionImpl extends CommonRuntimeExceptionImpl {

	private static final long serialVersionUID = 5534060774742162622L;
	
	protected final Logger log = LoggerFactory.getLogger(LoginExceptionImpl.class);

	public LoginExceptionImpl(String message) {
		super(message);
	}

	public LoginExceptionImpl(int errorCode, String message) {
		super(errorCode, message);
	}

	public LoginExceptionImpl(int errorCode, String arg[]) {
		super(errorCode, arg);
	}
	
	public LoginExceptionImpl(int errorCode, String message, String viewName) {
		super(errorCode, message, viewName);
	}

	public LoginExceptionImpl() {
		super();
	}
}
