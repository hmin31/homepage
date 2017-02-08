package com.hist.cmm.dao;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.frw.dao.MybatisBizDaoImpl;

/**
 * <B>@Package : </B>com.hist.cmm.dao<br/>
 * <B>@TypeName : </B>LoginDaoImpl<br/>
 * <B>@Date : </B>2017. 02. 07<br/>
 * <B>@Author : </B>hist<br/>
 * <B>Description</B>
 * <ul> 
 * <li>로그인 DAO
 * </ul>
 */
@Repository("loginDaoImpl")
public class LoginDaoImpl extends MybatisBizDaoImpl {
	
	protected final Logger log = LoggerFactory.getLogger(LoginDaoImpl.class);
	
	public LoginDaoImpl() {
		super("loginDao");
	}
	
	/**
	 * <B>@Method Name : getIsUserIDAvail</B>
	 * <ul>
	 * <li>Date : 2017. 02. 07
	 * <li>Developer : hist
	 * <li>Description: User ID 체크 Y/N
	 * </ul>
	 * @param parameterMap
	 * @return
	 */
	public String getIsUserIDAvail(Map<?, ?> parameterMap) {
		return queryForStr(nameSpace + ".getIsUserIDAvail", parameterMap);
	}
	
	/**
	 * <B>@Method Name : getIsUserHashedPassword</B>
	 * <ul>
	 * <li>Date : 2017. 02. 07
	 * <li>Developer : hist
	 * <li>Description: 암호화된 패스워드 가져오기
	 * </ul>
	 * @param parameterMap
	 * @return
	 */
	public String getIsUserHashedPassword(Map<?, ?> parameterMap) {
		return queryForStr(nameSpace + ".getIsUserHashedPassword", parameterMap);
	}
	
	/**
	 * <B>History</B>
	 * <ul>
	 * <li>Date : 2016. 11. 18.
	 * <li>Developer : hist
	 * <li>사용자 정보(이름, 부서, 직책, 상태 등)를 조회한다. 
	 * </ul>
	 *  
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public List<?> getUserInfo(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getUserInfo", parameterMap);
	}
	
	/**
	 * <B>@Method Name : insertUserLoginLog</B>
	 * <ul>
	 * <li>Date : 2017. 02. 07
	 * <li>Developer : hist
	 * <li>Description: 사용자 로그인 로그 삽입
	 * </ul>
	 * @param parameterMap
	 * @throws Exception
	 */
	public void insertUserLoginLog(Map<?, ?> parameterMap) throws Exception {
		insert(nameSpace + ".insertUserLoginLog", parameterMap);
	}
}