package com.hist.cmm.svc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
//import javax.security.auth.login.LoginException;
import com.frw.exception.LoginExceptionImpl;
import com.frw.svc.BizServiceImpl;

import com.hist.cmm.svc.MainSvcImpl;
import com.hist.cmm.dao.MainDaoImpl;

/**
 * <B>@Package : </B>skt.tmall.air.bof.cmm.svc<br/>
 * <B>@TypeName : </B>ReqAcntServiceImpl<br/>
 * <B>@Date : </B>2016. 12. 16.<br/>
 * <B>@Author : </B>ckim<br/>
 * <B>Description</B>
 * <ul> 
 * <li>계정요청 서비스
 * </ul>
 */
@Service("mainSvcImpl")
public class MainSvcImpl extends BizServiceImpl {
	
	@Autowired
	private MainDaoImpl mainDaoImpl;
	
	/**
	* <B>History</B>
	* <ul>
	* <li>Date : 2017. 02. 12
	* <li>Developer : hist
	* <li>메인화면 회원정보 조회 
	* </ul>
	*  
	* @param paramMap
	* @return
	 * @throws Exception 
	*/
	public IListData getUsrInfo(Map paramMap) throws Exception {
		IListData resultListData = new ListDataImpl();
		
		List returnList = mainDaoImpl.getUsrInfo(paramMap);
		resultListData.setDataList("usrInfo", returnList);
		
		return resultListData;
	}
}
