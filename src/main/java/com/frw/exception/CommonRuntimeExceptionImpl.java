package com.frw.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.frw.exception.ControllerExceptionAdvice.ExceptionViewAddr;
import com.frw.utl.CommonMessage;

public class CommonRuntimeExceptionImpl extends RuntimeException implements CommonException {

	private static final long serialVersionUID = 5534060774742162622L;
	
	private final Logger log = LoggerFactory.getLogger(CommonRuntimeExceptionImpl.class);

	private int errorCode = CommonMessage.CODE_ERROR_UNDEFINED;
	private static String DELIMITER = "|";
	private String arg[];
	private String message = CommonMessage.ERRORMSG_UNDEFINED;
	private String viewName = ExceptionViewAddr.defaultAppErrorView;
	
	public CommonRuntimeExceptionImpl() {}
	
	public CommonRuntimeExceptionImpl(Exception e) {
		super(e);	//모든 Exception 을 RuntimeException 으로 재정의
	}
	
	public CommonRuntimeExceptionImpl(String message) {
		this.message = message;
	}

	public CommonRuntimeExceptionImpl(int errorCode, String message) {
		this.errorCode = errorCode;
		this.message = message;
	}

	public CommonRuntimeExceptionImpl(int errorCode, String arg[]) {
		this.errorCode = errorCode;
		this.arg = arg.clone();
	}
	
	public CommonRuntimeExceptionImpl(int errorCode, String message, String viewName) {
		this.errorCode = errorCode;
		this.message = message;
		this.viewName = viewName;
	}
	
	public int getErrorCode() {
		return this.errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}
	
	public String getArg() {
		String result = "";
		String delimeter = "";
		if(this.arg != null) {
			for(int i=0,j=arg.length ; i<j ; i++){
				result = delimeter + result + arg[i];
				if(i==0) delimeter = DELIMITER;
			}
		}
		return result;
	}
	
	public void setArg(String[] arg) {
		this.arg = arg.clone();
	}
	
	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getViewName() {
		return this.viewName;
	}

	public void setViewName(String viewName) {
		this.viewName = viewName;
	}
	
	@Override
	public CommonException setThisViewName(String viewName) {
		// TODO Auto-generated method stub
		this.viewName = viewName;
		return this;
	}
}
