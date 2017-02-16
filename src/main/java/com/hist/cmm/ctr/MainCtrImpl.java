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

/**
 * <B>@Package : </B>skt.tmall.air.bof.cmm.ctr<br/>
 * <B>@TypeName : </B>MainCtrImpl<br/>
 * <B>@Date : </B>2017. 02. 09<br/>
 * <B>@Author : </B>hist<br/>
 * <B>Description</B>
 * <ul> 
 * <li>메인 화면 컨트롤러
 * </ul>
 */
@Controller
public class MainCtrImpl {

	private final Logger log = LoggerFactory.getLogger(MainCtrImpl.class);
	
	@Resource private MenuServiceImpl	menuServiceImpl;
	@Resource private JsonDataHandlerImpl jsonDataHandlerImpl;
	
	@RequestMapping(value = "/bo")
	public ModelAndView getBoMainView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		return new ModelAndView("login");
	}
	
	/**
	 * <B>@Method Name : getMainView</B>
	 * <ul>
	 * <li>Date : 2017. 02. 09
	 * <li>Developer : hist
	 * <li>Description: 메인화면 호출
	 * </ul>
	 * @param modelMap
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/bo/main.do", method = RequestMethod.GET)
	public ModelAndView getMainView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		return new ModelAndView("main");
	}
	
	/**
	 * <B>@Method Name : postMain</B>
	 * <ul>
	 * <li>Date : 2017. 02. 09
	 * <li>Developer : hist
	 * <li>Description: 메인화면 SVC_ID로 RU를 구분하여 동작
	 * </ul>
	 * @param reqBodyMap
	 * @param req
	 * @param res
	 * @param bindingResult
	 * @throws Exception
	 */
	@RequestMapping(value = "/main.do", method = RequestMethod.POST)
	public void postMain(@RequestBody(required=false) HashMap<String, Object> reqBodyMap, HttpServletRequest req, HttpServletResponse res, BindingResult bindingResult) throws Exception { 
		
		IListData listData = jsonDataHandlerImpl.convertToIListData(reqBodyMap, req);
		Map<?, ?> paramMap = listData.getParameterMap();
		
		IListData resultListData = new ListDataImpl();
		
		String svc_id = (String) paramMap.get("SVC_ID");
		
		if ("getMenu".equals(svc_id)) {
			resultListData = menuServiceImpl.getMenuList(listData.getParameter("REG_USR_ID"));
			
			resultListData.addVariable("USER_ID", listData.getParameter("REG_USR_ID"));
			resultListData.addVariable("USER_NM", listData.getParameter("SES_USR_NM"));
			
			log.debug(">>>>> >>>>> >>>>> USER_ID: " + resultListData.getVariableMap().get("USER_ID"));
		}
		
		resultListData = jsonDataHandlerImpl.setSessionMenuDataToIListData(req, resultListData);	
		
		jsonDataHandlerImpl.flushSuccessJSONResponse(res, jsonDataHandlerImpl.convertToJSONObject(resultListData));
	}
}
