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
import com.hist.cmm.svc.MenuServiceImpl;


@Controller
public class MainCtrImpl {

private final Logger log = LoggerFactory.getLogger(MainCtrImpl.class);
	
	@Resource private MenuServiceImpl	menuServiceImpl;
	@Resource private JsonDataHandlerImpl jsonDataHandlerImpl;
	

	@RequestMapping(value = "/main.do", method = RequestMethod.GET)
	public ModelAndView getMainView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		
		return new ModelAndView("main");
	}
	

	@RequestMapping(value = "/main.do", method = RequestMethod.POST)
	public void postMain(@RequestBody(required=false) HashMap<String, Object> reqBodyMap, HttpServletRequest req, HttpServletResponse res, BindingResult bindingResult) throws Exception { 
		
		IListData listData = jsonDataHandlerImpl.convertToIListData(reqBodyMap, req);
		Map<?, ?> paramMap = listData.getParameterMap();

		IListData resultListData = new ListDataImpl();

		String svc_id = (String) paramMap.get("SVC_ID");
		System.out.println("main.do svc_id : " + svc_id);
		if ("getMenu".equals(svc_id)) {
			resultListData = menuServiceImpl.getMenuList(listData.getParameter("REG_USR_ID"));
			resultListData.addVariable("USER_ID", listData.getParameter("REG_USR_ID"));
			resultListData.addVariable("USER_NM", listData.getParameter("SES_USR_NM"));
			log.debug(">>>>> >>>>> >>>>> USER_ID: " + resultListData.getVariableMap().get("USER_ID"));
		} /*else if("getFileList".equals(svc_id)) {
			resultListData = commonServiceImpl.getFileList(paramMap);
		} else if("getUsrAcnt".equals(svc_id)) {
			resultListData = reqAcntServiceImpl.getUsrAcnt(paramMap);
		} else if("updateUsrAcnt".equals(svc_id)) {
//			resultListData.addVariable("USR_ID", reqAcntServiceImpl.updateUsrAcnt(listData));
			reqAcntServiceImpl.updateUsrAcnt(paramMap);
		} else if ("getSelectedCmbs".equals(svc_id)) {
			resultListData = cdListServiceImpl.getSelectedCmbs(paramMap);
		} else if ("chkInitedPwd".equals(svc_id)) {
			resultListData = reqAcntServiceImpl.chkInitedPassword(paramMap);
		}*/
		resultListData = jsonDataHandlerImpl.setSessionMenuDataToIListData(req, resultListData);	
		
		jsonDataHandlerImpl.flushSuccessJSONResponse(res, jsonDataHandlerImpl.convertToJSONObject(resultListData));
	}
}
