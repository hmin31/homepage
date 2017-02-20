package com.hist.cmm.ctr;

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
import com.hist.cmm.svc.MngEmpSvcImpl;



@Controller
public class MngEmpWebCtrImpl {

	private final Logger log = LoggerFactory.getLogger(MngEmpWebCtrImpl.class);
	
	@Resource private MngEmpSvcImpl mngEmpSvcImpl;

	@Resource private JsonDataHandlerImpl jsonDataHandlerImpl;
	

	@RequestMapping(value = "/bo/mngEmp.do", method = RequestMethod.GET)
	public ModelAndView getMngEmpView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		return new ModelAndView("main/MngEmp");
	}
	

	@RequestMapping(value = "/mngEmp.do", method = RequestMethod.POST)
	public void postMngEmp(@RequestBody(required=false) HashMap<String, Object> reqBodyMap, HttpServletRequest req, HttpServletResponse res, BindingResult bindingResult) throws Exception { 
		
		IListData listData = jsonDataHandlerImpl.convertToIListData(reqBodyMap, req);
		Map<?, ?> paramMap = listData.getParameterMap();
		IListData resultListData = new ListDataImpl();
		
		String svc_id = (String) paramMap.get("SVC_ID");
		log.debug("mngEmp.do SVC_ID : " + svc_id);
		if ("getEmpList".equals(svc_id)) {
			resultListData = mngEmpSvcImpl.getEmpList(paramMap);
		}else if("saveEmp".equals(svc_id)){
			mngEmpSvcImpl.saveEmp(listData);
		} 
		  
		resultListData = jsonDataHandlerImpl.setSessionMenuDataToIListData(req, resultListData);	
		
		jsonDataHandlerImpl.flushSuccessJSONResponse(res, jsonDataHandlerImpl.convertToJSONObject(resultListData));
		 	 
	}
}
