package com.frw.utl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.WebUtils;

import com.frw.dao.User;
import com.frw.exception.ControllerExceptionAdvice;
import com.frw.exception.LoginExceptionImpl;
import com.frw.exception.ControllerExceptionAdvice.ExceptionViewAddr;

public class LoginCheckInterceptor extends HandlerInterceptorAdapter {

	protected final Logger log = LoggerFactory.getLogger(LoginCheckInterceptor.class);

	
	/**
	 * 
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		boolean result = false;		
		if (WebUtils.getSessionAttribute(request, User.SES_USER) !=null ) {
			log.debug("Session Check OK!!");
			result = true;
		} else {
			log.info(CommonMessage.ERRORMSG_LOGIN_ERROR);
			request.getSession().invalidate();
			throw new LoginExceptionImpl(CommonMessage.CODE_LOGIN_ERROR, CommonMessage.ERRORMSG_LOGIN_ERROR , ExceptionViewAddr.loginErrorView);
		}		
		return result;
    }
	
}
