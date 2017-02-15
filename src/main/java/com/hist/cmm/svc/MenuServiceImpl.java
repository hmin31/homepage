package com.hist.cmm.svc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.svc.BizServiceImpl;
import com.hist.cmm.dao.MenuDaoImpl;


/**
 * <B>@Package : </B>skt.tmall.air.bof.cmm.svc<br/>
 * <B>@TypeName : </B>MenuServiceImpl<br/>
 * <B>@Date : </B>2016. 12. 16.<br/>
 * <B>@Author : </B>ckim<br/>
 * <B>Description</B>
 * <ul> 
 * <li>硫�� �����
 * </ul>
 */
@Service("menuServiceImpl")
public class MenuServiceImpl extends BizServiceImpl {
	
	
	@Autowired
	private MenuDaoImpl menuDaoImpl;
	
	/**
	 * <B>@Method Name : getMenuList</B>
	 * <ul>
	 * <li>Date : 2016. 12. 16.
	 * <li>Developer : ckim
	 * <li>Description: 硫�� 由ъ��몃� 媛����
	 * </ul>
	 * @param usrId
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	public IListData getMenuList(String usrId) throws Exception {
		
		Map<String, String> paramMap = new HashMap<String, String>();
		
		IListData resultListData = new ListDataImpl();
		
		paramMap.put("USR_ID", usrId);
		paramMap.put("MENU_SEQ", "10");

/*		List apiNmList = menuDaoImpl.getMenuLv2(paramMap);
		resultListData.setDataList("sub_menu_do", apiNmList);
		
		List agtNmList = menuDaoImpl.getMenuLv1(paramMap);
		resultListData.setDataList("main_menu_do", agtNmList);*/
		log.debug("getMenuList...");
		
		//Level 10
		List seq10List = menuDaoImpl.getMenuSeq10(paramMap);
		resultListData.setDataList("seq10_menu", seq10List);
		
		paramMap.put("MENU_SEQ", "20");
		//Level 20
		List seq20List = menuDaoImpl.getMenuSeq20(paramMap);
		resultListData.setDataList("seq20_menu", seq20List);

		//Level 30
		paramMap.put("MENU_SEQ", "30");
		List seq30List = menuDaoImpl.getMenuSeq30(paramMap);
		resultListData.setDataList("seq30_menu", seq30List);
		


		return resultListData;
		
	}
	
}
