package com.frw.exception;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.frw.utl.CommonMessage;
import com.frw.utl.JsonDataHandlerImpl;

import net.sf.json.JSONObject;

@ControllerAdvice
public class  ControllerExceptionAdvice {
	
	private final Logger log = LoggerFactory.getLogger(ControllerExceptionAdvice.class);
	
	@Resource private JsonDataHandlerImpl jsonDataHandlerImpl;

	@ExceptionHandler(Exception.class)
	public @ResponseBody JSONObject handleError(HttpServletRequest req, HttpServletResponse res, Exception exception) throws Exception {

		JSONObject jObj = new JSONObject();
		CommonException ex = null;
		
		if(isAsync(req)) {	// 1.Async 인 경우
			if(exception instanceof CommonException) {	//개발자가 던진 에러인 경우
				ex = (CommonException)exception;
				log.info("Request: " + req.getRequestURL() + " raised " + exception);
			} else {
				ex = new CommonRuntimeExceptionImpl(exception);
				log.error("Request: " + req.getRequestURL() + " raised " + exception);
			}
			jObj.put("html", ex.getViewName());
			jObj.put(CommonMessage.RESULT, "{" + CommonMessage.ERRORCODE + ":" + ex.getErrorCode() + ", " + CommonMessage.ERRORMSG + ":'" + ex.getMessage() + "'}");
		}else{  //2. Async 가 아닌 경우
			//일단 Async 가 아닌 경우는 에러페이지로 넘김
			log.error(exception.getMessage());
			throw new Exception("This is not Async Request");
		}

		return jObj;
	}
	
	//SKT AIR BO 에서 request header 에 AJAX 인 경우 xmlhttprequest 를 넣어줌 으로 판별함
	private boolean isAsync(HttpServletRequest req) {
		boolean result = false;
		String ajaxCheckStr = req.getHeader("X-Requested-With") != null ? req.getHeader("X-Requested-With").toLowerCase() : "";
		if (ajaxCheckStr.equals("xmlhttprequest")) {
			result = true;
		}
		return result;
	}
	
	//차후 필요시 별도의 class 파일로 분리
	public static class ExceptionViewAddr {
		public static final String defaultAppErrorView = "/applicationError";
		public static final String loginErrorView = "/loginError";	
	}
	
//	public void getResultMap(Map map, int errorCode, String errorMsg){
//		if(map == null) {
//			map = new LinkedHashMap<String,Object>();
//		} 
//		map.put(CommonMessage.RESULT, "{" + CommonMessage.ERRORCODE + ":" + errorCode + ", " + CommonMessage.ERRORMSG + ":'" + errorMsg + "'}");
//	}
//	
//	public JSONObject convertMapToJSONObject(Map<String,Object> map){
//		JSONObject jObj = new JSONObject();
//		jObj.putAll(map);
//		return jObj;
//	}
}