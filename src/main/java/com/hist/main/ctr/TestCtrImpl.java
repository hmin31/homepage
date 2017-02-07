package com.hist.main.ctr;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.utl.JsonDataHandlerImpl;

import com.hist.main.svc.TestSvcImpl;

@Controller
public class TestCtrImpl {

	private final Logger log = LoggerFactory.getLogger(TestCtrImpl.class);
	
	@Resource private TestSvcImpl testSvcImpl;
	@Resource private JsonDataHandlerImpl jsonDataHandlerImpl;
	
	@RequestMapping(value = "/test.do", method = RequestMethod.GET)
	public ModelAndView getTestView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		return new ModelAndView("main/Test");
	}
	
	@RequestMapping(value = "/test.do", method = RequestMethod.POST)
	public void postTest(@RequestBody(required=false) HashMap<String, Object> reqBodyMap, HttpServletRequest req, HttpServletResponse res, BindingResult bindingResult) throws Exception { 
		
		IListData listData = jsonDataHandlerImpl.convertToIListData(reqBodyMap, req);
		Map<?, ?> paramMap = listData.getParameterMap();
		IListData resultListData = new ListDataImpl();
		
		String svc_id = (String) paramMap.get("SVC_ID");
		if ("getSelectTest".equals(svc_id)) {
			resultListData = testSvcImpl.getSelectTest(paramMap);
		}
		
		resultListData = jsonDataHandlerImpl.setSessionMenuDataToIListData(req, resultListData);	
		
		jsonDataHandlerImpl.flushSuccessJSONResponse(res, jsonDataHandlerImpl.convertToJSONObject(resultListData));
	}
}
