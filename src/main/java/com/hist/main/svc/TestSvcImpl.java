package com.hist.main.svc;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.svc.BizServiceImpl;
import com.hist.main.dao.TestDaoImpl;

@Service("testSvcImpl")
public class TestSvcImpl extends BizServiceImpl{
	
//	@Qualifier("memberServiceImpl")
	@Autowired
	private TestDaoImpl testDaoImpl;
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public IListData getSelectTest(Map paramMap) throws Exception {
		
		IListData resultListData = new ListDataImpl();
		List<?> returnList = testDaoImpl.getSelectTest(paramMap);
		resultListData.setDataList("returnList", (List<Map<String, Object>>) returnList);
		
		return resultListData;
	}

	public String getTextInConsole(String inputStr) {
		log.debug(">>>>> >>>>> >>>>> input text is " + inputStr);
		return inputStr;
	}

}
