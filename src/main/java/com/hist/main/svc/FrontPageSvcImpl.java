package com.hist.main.svc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.svc.BizServiceImpl;
import com.hist.content.dao.MngNtceDaoImpl;
import com.hist.main.dao.FrontPageDaoImpl;
import com.hist.main.dao.MngContentsDaoImpl;

@Service("frontPageSvcImpl")
public class FrontPageSvcImpl extends BizServiceImpl {

	@Autowired
	private FrontPageDaoImpl frontPageDaoImpl;

	@Autowired
	private MngNtceDaoImpl mngNtceDaoImpl;
	
	@Autowired
	private MngContentsDaoImpl mngContentsDaoImpl;
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public IListData getMenuList(Map paramMap) throws Exception {

		IListData resultListData = new ListDataImpl();

		ArrayList<String> hiMenuCds = new ArrayList<String>();
		hiMenuCds.add("AL0000000");
		paramMap.put("hi_menu_cds", hiMenuCds);

		List<?> returnList = frontPageDaoImpl.getMenuList(paramMap);
		resultListData.setDataList("hi_menu_cd_do", (List<Map<String, Object>>) returnList);
		
		Map rowMap = null;
		hiMenuCds = new ArrayList<String>();
		for (int i = 0, j = returnList.size(); i < j; i++) {
			rowMap = (Map) returnList.get(i);
			hiMenuCds.add((String) rowMap.get("MENU_CD"));
		}
		paramMap.put("hi_menu_cds", hiMenuCds);
		returnList = frontPageDaoImpl.getMenuList(paramMap);
		resultListData.setDataList("menu_cd_do", (List<Map<String, Object>>) returnList);
		
		return resultListData;
	}
	
	@SuppressWarnings("unchecked")
	public IListData getAllFrontPageContents(Map<?, ?> paramMap) throws Exception {

		Map<String, Object> customedParamMap = new HashMap<String, Object>();
		customedParamMap.putAll((Map<? extends String, ? extends Object>) paramMap);
		
		IListData resultListData = new ListDataImpl();
		
		String mainContents = mngContentsDaoImpl.getContentsDtls(customedParamMap);
		resultListData.addVariable("mainContents", mainContents);
		
		return resultListData;
	}
	
	
	@SuppressWarnings("unchecked")
	public IListData selectNtceContents(Map<?, ?> paramMap) throws Exception {

		Map<String, Object> customedParamMap = new HashMap<String, Object>();
		customedParamMap.putAll((Map<? extends String, ? extends Object>) paramMap);
		customedParamMap.put("srchMenuCd", customedParamMap.get("MENU_CD"));
		
		IListData resultListData = new ListDataImpl();

		String ntceContents = mngNtceDaoImpl.selectNtceContents(customedParamMap);
		resultListData.addVariable("ntceContents", ntceContents);
		
		return resultListData;
	}
	
	@SuppressWarnings("unchecked")
	public IListData getFrontSubTitleContents(Map<?, ?> paramMap) throws Exception {

		Map<String, Object> customedParamMap = new HashMap<String, Object>();
		customedParamMap.putAll((Map<? extends String, ? extends Object>) paramMap);
		
		IListData resultListData = new ListDataImpl();

		List returnList = mngContentsDaoImpl.getMenuCotain(customedParamMap);
		Map returnMap = (Map) returnList.get(0);
		resultListData.addVariable("BLTN_CRET_YN", String.valueOf(returnMap.get("BLTN_CRET_YN")));
		resultListData.addVariable("CNT_CRET_YN", String.valueOf(returnMap.get("CNT_CRET_YN")));
		resultListData.addVariable("MENU_KRN_NM", String.valueOf(returnMap.get("MENU_KRN_NM")));
		
		if("Y".equals(String.valueOf(returnMap.get("BLTN_CRET_YN")))) {
			customedParamMap.put("srchMenuCd", customedParamMap.get("MENU_CD"));
			List ntceList = mngNtceDaoImpl.selectNtceList(customedParamMap);
			resultListData.setDataList("ntce_do", ntceList);
		}
		if("Y".equals(String.valueOf(returnMap.get("CNT_CRET_YN")))) {
			String subContents = mngContentsDaoImpl.getContentsDtls(customedParamMap);
			resultListData.addVariable("subContents", subContents);
		}
		
		String subTitleMenuCd = mngContentsDaoImpl.getSubTitleMenuCd(customedParamMap);
		customedParamMap.put("MENU_CD", subTitleMenuCd);
		
		String mainContents = mngContentsDaoImpl.getContentsDtls(customedParamMap);
		resultListData.addVariable("mainContents", mainContents);
		
		return resultListData;
	}
	

}
