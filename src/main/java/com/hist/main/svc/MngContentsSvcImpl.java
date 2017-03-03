package com.hist.main.svc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.svc.BizServiceImpl;
import com.hist.main.dao.MngContentsDaoImpl;

@Service("mngContentsSvcImpl")
public class MngContentsSvcImpl extends BizServiceImpl{
	
	@Autowired
	private MngContentsDaoImpl mngContentsDaoImpl;
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public IListData getContentsMenu(Map paramMap) throws Exception {
		
		IListData resultListData = new ListDataImpl();
		List<?> returnList = mngContentsDaoImpl.getContentsMenu(paramMap);
		resultListData.setDataList("contentsMenu_do", (List<Map<String, Object>>) returnList);
		
		return resultListData;
	}
	
	@SuppressWarnings("unchecked")
	public IListData getContentsDtls(Map<?, ?> paramMap) throws Exception {
		
		IListData resultListData = new ListDataImpl();
		String contetnsDtls = mngContentsDaoImpl.getContentsDtls(paramMap);
		resultListData.addVariable("contetnsDtls", contetnsDtls);
		
		List<?> returnList = mngContentsDaoImpl.getContentsDtlsHstList(paramMap);
		resultListData.setDataList("contentsMenuHstList_do", (List<Map<String, Object>>) returnList);
		
		return resultListData;
	}
	
	public IListData getContentsDtlsHst(Map<?, ?> paramMap) throws Exception {
		
		IListData resultListData = new ListDataImpl();
		String contetnsDtls = mngContentsDaoImpl.getContentsDtlsHst(paramMap);
		resultListData.addVariable("contetnsDtls", contetnsDtls);
		
		return resultListData;
	}
	
	public void insertContentsDtls(Map<?, ?> paramMap) throws Exception {
		mngContentsDaoImpl.insertContentsDtls(paramMap);
		mngContentsDaoImpl.insertContentsDtlsHst(paramMap);
		
	}
	
	public void updateContentsDtls(Map<?, ?> paramMap) throws Exception {
		mngContentsDaoImpl.updateContentsDtls(paramMap);
		mngContentsDaoImpl.insertContentsDtlsHst(paramMap);
	}
	
	public void mergeContentsDtls(Map<?, ?> paramMap) throws Exception {
		
		// CLOB column이 1,000 을 넘을 때 insert의 경우 update로 인식 오류 merge into 사용하지 못함
		if("N".equals(mngContentsDaoImpl.getIsMenuCdInsertable(paramMap))) {
			mngContentsDaoImpl.insertContentsDtls(paramMap);
		} else {
			mngContentsDaoImpl.updateContentsDtls(paramMap);
		}
		mngContentsDaoImpl.insertContentsDtlsHst(paramMap);
//		mngContentsDaoImpl.mergeContentsDtls(paramMap);
		
	}

}
