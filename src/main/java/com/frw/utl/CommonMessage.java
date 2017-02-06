package com.frw.utl;

public class CommonMessage {
	
	// error 없을때
	public static final int CODE_NO_ERROR = 0;
	public static final String MSG_OK = "OK";

	// db 오류
	public static final int CODE_ERROR_DB = -2;
	public static final String ERRORMSG_DB_ERROR = "DB 오류가 발생했습니다.<br>관리자에게 문의하세요."; // "DB_ERROR";

	// 알수 없는 오류
	public static final int CODE_ERROR_UNDEFINED = -3;
	public static final String ERRORMSG_UNDEFINED = "정상처리 되지 않았습니다. <br> 중복된 데이터 이거나 입력데이터에 문제가 있을 수 있습니다. <br> 문제가 지속되는 경우 관리자에게 연락하시기 바랍니다. "; // "UNDEFINED";
	
	
	public static final int CODE_LOGIN_ERROR = 640;
	public static final String ERRORMSG_LOGIN_ERROR = "로그인 되지 않았습니다."; 
	
	public static final int CODE_INCORRECT_PASSWORD = 640;
	public static final String ERRORMSG_INCORRECT_PASSWORD = "패스워드가 틀립니다."; 
	
	public static final int CODE_UNRESISTED_ID = 640;
	public static final String ERRORMSG_UNRESISTED_ID  = "등록되지 않은 ID 입니다."; 
	
	public static final String RESULT = "RESULT";
	public static final String ERRORCODE = "ERRORCODE";
	public static final String ERRORMSG = "ERRORMSG";
	

}
