package com.hist.content.svc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.svc.BizServiceImpl;
import com.hist.content.dao.MngNtceDaoImpl;

@Service("mngNtceSvcImpl")
public class MngNtceSvcImpl extends BizServiceImpl{
	
	@Autowired
	private MngNtceDaoImpl mngNtceDaoImpl;
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public IListData getNtceMenu(Map paramMap) throws Exception {
		IListData resultListData = new ListDataImpl();
		
		List  returnList = mngNtceDaoImpl.getNtceMenu(paramMap);
		resultListData.setDataList("ntceMenu_do", returnList);
		
		return resultListData;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public IListData selectNtceList(Map paramMap) throws Exception {
		IListData resultListData = new ListDataImpl();
		
		//게시판 목록
		List returnList = mngNtceDaoImpl.selectNtceList(paramMap);
		resultListData.setDataList("ntce_do", returnList);
		
		//게시판 갯수
		String strCnt = mngNtceDaoImpl.selectNtceCnt(paramMap);
		resultListData.addVariable("ntce_cnt", strCnt);
		
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
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public void saveNtce(IListData listData) throws Exception {
		List list = listData.getDataList("layer_input");
		HashMap rowData = null;	
		String rowStatus = "";
		
		for (int i = 0, j = list.size(); i < j; i++) {
			rowData = (HashMap) list.get(i);
			rowStatus = String.valueOf(rowData.get("ROW_STATUS"));
			rowData.put("REG_USR_ID", listData.getParameter("REG_USR_ID"));
			
			if ("I".equals(rowStatus)) {
				mngNtceDaoImpl.insertNtce(rowData);
				
			} else if ("U".equals(rowStatus)) {
				mngNtceDaoImpl.updateNtce(rowData);	
			
			} else if ("D".equals(rowStatus)) {
				mngNtceDaoImpl.deleteNtce(rowData);	
			}
		}
	}
}