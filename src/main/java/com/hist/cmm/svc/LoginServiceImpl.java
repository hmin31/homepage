package com.hist.cmm.svc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.frw.svc.BizServiceImpl;

import com.hist.cmm.dao.LoginDaoImpl;

/**
 * <B>@Package : </B>com.hist.cmm.svc<br/>
 * <B>@TypeName : </B>LoginServiceImpl<br/>
 * <B>@Date : </B>2017. 02. 07<br/>
 * <B>@Author : </B>hist<br/>
 * <B>Description</B>
 * <ul> 
 * <li>로그인 서비스
 * </ul>
 */
@Service("loginServiceImpl")
public class LoginServiceImpl extends BizServiceImpl {
	
	protected final Logger log = LoggerFactory.getLogger(LoginServiceImpl.class);
	
	@Resource private LoginDaoImpl loginDaoImpl;
	
	/**
	 * <B>@Method Name : getIsUserIDAvail</B>
	 * <ul>
	 * <li>Date : 2017. 02. 07
	 * <li>Developer : hist
	 * <li>Description: 로그인 가능 확인
	 * </ul>
	 * @param paramDataMap
	 * @return
	 */
	public String getIsUserIDAvail(Map<String,Object> paramDataMap) {
		return loginDaoImpl.getIsUserIDAvail(paramDataMap);
	}
	
	/**
	 * <B>@Method Name : getIsUserHashedPassword</B>
	 * <ul>
	 * <li>Date : 2017. 02. 07
	 * <li>Developer : hist
	 * <li>Description: 암호화된 패스워드 가져오기
	 * </ul>
	 * @param paramDataMap
	 * @return
	 */
	public String getIsUserHashedPassword(Map<String,Object> paramDataMap) {
		return loginDaoImpl.getIsUserHashedPassword(paramDataMap);
	}
	
	/**
	 * <B>@Method Name : getUsrStatCd</B>
	 * <ul>
	 * <li>Date : 2017. 02. 07
	 * <li>Developer : hist
	 * <li>Description: 사용자 정보 가져오기
	 * </ul>
	 * @param paramDataMap
	 * @return
	 * @throws Exception
	 */
	public List<?> getUserInfo(Map<String,Object> paramDataMap) throws Exception {
		return loginDaoImpl.getUserInfo(paramDataMap);
	}
	
	/**
	 * <B>@Method Name : userLoginHstData</B>
	 * <ul>
	 * <li>Date : 2017. 02. 07
	 * <li>Developer : hist
	 * <li>Description: 사용자 로그인 로그 삽입
	 * </ul>
	 * @param req
	 * @param userId
	 * @param result
	 */
	public void userLoginHstData(HttpServletRequest req, String userId, String result) {
		Map<String, String> history = new HashMap<String, String>();
		try {
			history.put("USR_ID", userId);
			history.put("LOG_RESULT_CD", result);
			history.put("CNCTS_IP", req.getRemoteAddr());
			
			loginDaoImpl.insertUserLoginLog(history);
			
		} catch (Exception e) {
			log.error("<<<<< <<<<< <<<<< LoginService - userLoginHstData - Exception: {} " , e.getMessage());
			log.error(e.getLocalizedMessage());
		}
	}
}