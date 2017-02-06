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
//
//	public int getErrorCode() {
//		return errorCode;
//	}
//
//	public void setErrorCode(int errorCode) {
//		this.errorCode = errorCode;
//	}
//
//	public String getMessage() {
//		return message;
//	}
//
//	public void setMessage(String message) {
//		this.message = message;
//	}
//
//	public String getArg() {
//		if (arg == null)
//			return null;
//		String msg = "";
//		for (int i = 0; i < arg.length; i++)
//			if (i == 0)
//				msg = arg[i];
//			else
//				msg = msg + DELIMITER + arg[i];
//
//		return msg;
//	}
//
//	public void setError(int code, String message) {
//		this.errorCode = code;
//		this.message = message;
//	}

}
