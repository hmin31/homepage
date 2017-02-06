package com.hist.main.svc;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.svc.BizServiceImpl;

import com.hist.main.dao.TestDaoImpl;

@Service("testSvcImpl")
public class TestSvcImpl extends BizServiceImpl{
	
	private TestDaoImpl testDaoImpl;
	
	public IListData getSelectTest(Map paramMap) throws Exception {
		
		IListData resultListData = new ListDataImpl();
		List returnList = testDaoImpl.getSelectTest(paramMap);
		
		return resultListData;
	}
}
