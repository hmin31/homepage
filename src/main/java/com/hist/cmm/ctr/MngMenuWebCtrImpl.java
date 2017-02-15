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
import com.hist.cmm.svc.MngMenuSvcImpl;



@Controller
public class MngMenuWebCtrImpl {

	private final Logger log = LoggerFactory.getLogger(MngMenuWebCtrImpl.class);
	
	@Resource private MngMenuSvcImpl mngMenuSvcImpl;

	@Resource private JsonDataHandlerImpl jsonDataHandlerImpl;
	

	@RequestMapping(value = "/mngMenu.do", method = RequestMethod.GET)
	public ModelAndView getMngMenuView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		return new ModelAndView("main/MngMenu");
	}
	

	@RequestMapping(value = "/mngMenu.do", method = RequestMethod.POST)
	public void postMngMenu(@RequestBody(required=false) HashMap<String, Object> reqBodyMap, HttpServletRequest req, HttpServletResponse res, BindingResult bindingResult) throws Exception { 
		
		IListData listData = jsonDataHandlerImpl.convertToIListData(reqBodyMap, req);
		Map<?, ?> paramMap = listData.getParameterMap();
		IListData resultListData = new ListDataImpl();
		
		String svc_id = (String) paramMap.get("SVC_ID");
		
		if ("getMenuList".equals(svc_id)) {
			resultListData = mngMenuSvcImpl.getMenuList(paramMap);
			resultListData.addVariable("USER_ID", listData.getParameter("REG_USR_ID"));
		}else if("getLowerMenuList".equals(svc_id)){
			//상위 메뉴 클릭시 하위메뉴를 가져온다..
			resultListData = mngMenuSvcImpl.getLowerMenuList(paramMap);
		}else if("saveLowerMenu".equals(svc_id)){
			//항위 메뉴를 저장 한다..
			mngMenuSvcImpl.saveLowerMenu(listData);
		}
		
		resultListData = jsonDataHandlerImpl.setSessionMenuDataToIListData(req, resultListData);	
		
		jsonDataHandlerImpl.flushSuccessJSONResponse(res, jsonDataHandlerImpl.convertToJSONObject(resultListData));
	}
}
