package com.frw.utl;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.frw.dao.User;
import com.frw.dto.UserInfo;
import com.frw.svc.BizServiceImpl;

public class SecurityHolder extends BizServiceImpl {

	public static boolean isLogin(HttpServletRequest request) {
		return StringUtils.isNotEmpty(getString(request, User.SES_USERID));
	}

	public static String getUserId(HttpServletRequest request) {
		return getString(request, User.SES_USERID);
	}

	public static void setUserId(HttpServletRequest request, String userId) {
		request.getSession().setAttribute(User.SES_USERID, userId);
	}

	public static UserInfo getUserInfo(HttpServletRequest request) {
		return getUserInfo(request, User.SES_USER);
	}

	public static void setUserInfo(HttpServletRequest request, UserInfo userInfo) {
		request.getSession().setAttribute(User.SES_USER, userInfo);
	}
	
	public static void invalidate(HttpServletRequest request) {
		request.getSession().invalidate();
	}

	private static String getString(HttpServletRequest req, String attr) {
		return (String) getAttribute(req, attr);
	}
	
	private static UserInfo getUserInfo(HttpServletRequest req, String attr) {
		return (UserInfo) getAttribute(req, attr);
	}

	private static Object getAttribute(HttpServletRequest req, String attr) {
		return req.getSession().getAttribute(attr);
	}

}
