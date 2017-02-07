package com.frw.utl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.stereotype.Service;

import com.frw.exception.CustomedExceptionImpl;
import com.frw.svc.BizServiceImpl;

@Service("securityManagerImpl")
public class SecurityManagerImpl extends BizServiceImpl {
	
	private static Logger log = LoggerFactory.getLogger(SecurityManagerImpl.class);
	
	public void sessionCheck(HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		
		if (!SecurityHolder.isLogin(request)) {
			log.error("No Session was available!");
			session.invalidate();
			throw new CustomedExceptionImpl(640, "먼저 로그인을 하셔야 합니다.");
		} else {
			log.error("Session checked!");
		}
	}
	
}
