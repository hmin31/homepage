package com.hist.content.svc;

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
		List<?> returnList = mngNtceDaoImpl.getNtceMenu(paramMap);
		resultListData.setDataList("ntceMenu_do", (List<Map<String, Object>>) returnList);
		
		return resultListData;
	}
	
	public IListData getNtceDtls(Map<?, ?> paramMap) throws Exception {
		
		IListData resultListData = new ListDataImpl();
		String ntceDtls = mngNtceDaoImpl.getNtceDtls(paramMap);
		
		resultListData.addVariable("ntceDtls", ntceDtls);
		
		return resultListData;
	}
	
	public void insertNtceDtls(Map<?, ?> paramMap) throws Exception {
		mngNtceDaoImpl.insertNtceDtls(paramMap);
		
	}
	
	public void updateNtceDtls(Map<?, ?> paramMap) throws Exception {
		mngNtceDaoImpl.updateNtceDtls(paramMap);
	}
	
	public void mergeNtceDtls(Map<?, ?> paramMap) throws Exception {
		
		// CLOB column이 1,000 을 넘을 때 insert의 경우 update로 인식 오류 merge into 사용하지 못함
		if("N".equals(mngNtceDaoImpl.getIsMenuCdInsertable(paramMap))) {
			mngNtceDaoImpl.insertNtceDtls(paramMap);
		} else {
			mngNtceDaoImpl.updateNtceDtls(paramMap);
		}
	}
}