package com.hist.cmm.ctr;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.frw.dto.UserInfo;
import com.frw.exception.LoginExceptionImpl;
import com.frw.utl.CommonMessage;
import com.frw.utl.JsonDataHandlerImpl;
import com.frw.utl.SecurityHolder;

import net.sf.json.JSONObject;
import com.hist.cmm.svc.LoginServiceImpl;

/**
 * <B>@Package : </B>com.hist.cmm.ctr<br/>
 * <B>@TypeName : </B>LoginController<br/>
 * <B>@Date : </B>2017. 02. 07<br/>
 * <B>@Author : </B>hist<br/>
 * <B>Description</B>
 * <ul> 
 * <li>로그인 컨트롤러
 * </ul>
 */
@Controller
public class LoginController {
	
	private final Logger log = LoggerFactory.getLogger(LoginController.class);
	
	private static final String SUCCESS = "S";
	private static final String FAILED = "F";

	@Resource private LoginServiceImpl loginServiceImpl;
	@Resource private JsonDataHandlerImpl jsonDataHandlerImpl;

	/**
	 * <B>@Method Name : loginHandler</B>
	 * <ul>
	 * <li>Date : 2017. 02. 07
	 * <li>Developer : hist
	 * <li>Description: 로그인 요청 처리
	 * </ul>
	 * @param obj
	 * @param req
	 * @param res
	 * @return
	 * @throws Exception
	 */
	@PostMapping(value = "/login.do")
	public @ResponseBody JSONObject loginHandler(@RequestBody HashMap<String, Object> obj, HttpServletRequest req, HttpServletResponse res) throws Exception {
		
		Map<String,Object> paramDataMap = (Map<String, Object>)obj.get("paramDataObj");
		
		String userId = String.valueOf(paramDataMap.get("USR_ID"));
		String password = String.valueOf(paramDataMap.get("USR_PWD"));
		
		if(!StringUtils.hasLength(userId) || !StringUtils.hasLength(password)) {
			log.warn("LoginController throw LoginException, LoginException Message is {}", CommonMessage.ERRORMSG_LOGIN_ERROR );
			throw new LoginExceptionImpl(CommonMessage.CODE_LOGIN_ERROR, CommonMessage.ERRORMSG_LOGIN_ERROR);
		}
		
		// User ID 체크
		if("N".equals(loginServiceImpl.getIsUserIDAvail(paramDataMap))) {
			// 로그인 실패 로그 삽입
			//loginServiceImpl.userLoginHstData(req, userId, FAILED);
			log.warn("LoginController throw LoginException, LoginException Message is {}", CommonMessage.ERRORMSG_UNRESISTED_ID );
			throw new LoginExceptionImpl(CommonMessage.CODE_UNRESISTED_ID, CommonMessage.ERRORMSG_UNRESISTED_ID);
		}
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String storedPassword = loginServiceImpl.getIsUserHashedPassword(paramDataMap);
		
		// Password 체크
		//if(!passwordEncoder.matches(password, storedPassword)) {
		if(!storedPassword.equalsIgnoreCase(password)) {
			// 로그인 실패 로그 삽입
			//loginServiceImpl.userLoginHstData(req, userId, FAILED);
			log.warn("LoginController throw LoginException, LoginException Message is {}", CommonMessage.ERRORMSG_INCORRECT_PASSWORD );
			throw new LoginExceptionImpl(CommonMessage.CODE_INCORRECT_PASSWORD, CommonMessage.ERRORMSG_INCORRECT_PASSWORD);
		}
		
		List<?> resultList = loginServiceImpl.getUserInfo(paramDataMap);
		Map<String, String> resultMap = (Map<String, String>)resultList.get(0);
		
		String empNm = 	String.valueOf(resultMap.get("EMP_NM"));
		
		UserInfo user = new UserInfo();
		user.setUserId(userId);
		user.setUsrNm(empNm);
		
		SecurityHolder.setUserId(req, userId);
		SecurityHolder.setUserInfo(req, user);
		
		// 로그인 성공 로그 삽입
		//loginServiceImpl.userLoginHstData(req, userId, SUCCESS);
		
		JSONObject resultJsonMap = new JSONObject();
		resultJsonMap.put("RESULT", "{ERRORCODE:" + CommonMessage.CODE_NO_ERROR + ", ERRORMSG:'" + CommonMessage.MSG_OK + "'}");
		
		return resultJsonMap;
	}
	
	/**
	 * <B>@Method Name : logOut</B>
	 * <ul>
	 * <li>Date : 2017. 02. 07
	 * <li>Developer : hist
	 * <li>Description: 로그아웃 처리
	 * </ul>
	 * @param model
	 * @param req
	 * @param res
	 * @return
	 */
	@RequestMapping(value = "/logout.do", method = RequestMethod.POST)
	public String logOut(Model model, HttpServletRequest req, HttpServletResponse res) {
		String loginUrl = "login";
		log.debug(">>>>> >>>>> >>>>> Log out before | USR_ID: [" + SecurityHolder.getUserId(req) + "]");
		SecurityHolder.invalidate(req);
		log.debug(">>>>> >>>>> >>>>> Log out after | USR_ID: [" + SecurityHolder.getUserId(req) + "]");
		
		return loginUrl;
	}
}