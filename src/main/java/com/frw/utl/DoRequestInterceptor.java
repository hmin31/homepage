package com.frw.utl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class DoRequestInterceptor extends HandlerInterceptorAdapter {

	 private Logger log = LoggerFactory.getLogger(DoRequestInterceptor.class);

	/**
	 * dispatcher로 들어가기 전 시점에 공통 처리.
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		/*StringBuilder sb = new StringBuilder();

		sb.append("[from:");
		sb.append(request.getRemoteAddr());
		sb.append("]");
		sb.append("SERVER URL::");
		sb.append(request.getRequestURL().toString());

		if (null != request.getQueryString()) {
			sb.append("?");
			sb.append(request.getQueryString());
		}*/

		// log.info(sb.toString());
		return true;
	}

	/**
	 * dispatcher의 처리가 끝난 시점에 공통처리.
	 */
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		String url = request.getRequestURL().toString();
		url = url.substring(0, url.indexOf(request.getRequestURI()));

		String context = request.getContextPath();

		// EL로 접근하기 위한 기본적인 경로 지정
		// 서버명, URL, Context를 포함한 URL, 컨텍스트, 이미지 경로.
		request.setAttribute("SERVER", request.getServerName().toString());
		request.setAttribute("URL", url);
		request.setAttribute("HAF2", url + context);
		request.setAttribute("CTX", context);
		// request.setAttribute("IMAGES", context + "/web/images");
	}

	/**
	 * View렌더링까지 끝난 이후의 공통 처리 인터셉터.
	 */
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {

	}
}
