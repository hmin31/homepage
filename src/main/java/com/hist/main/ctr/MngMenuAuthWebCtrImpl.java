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

import com.hist.main.svc.MngMenuAuthSvcImpl;


	/**
	 * <B>Package Name : </B>com.hist.main.ctr<br/>
	 * <B>File Name : </B>MenuAuthWebCtrImpl<br/>
	 * <B>Description</B>
	 * <ul> 
	 * <li>메뉴권한관리 화면 컨트롤러
	 * </ul>
	 * 
	 * @author hist
	 * @since 2016. 11. 17.
	 */ 
@Controller
public class MngMenuAuthWebCtrImpl {

	private final Logger log = LoggerFactory.getLogger(MngMenuAuthWebCtrImpl.class);
	
	@Resource private MngMenuAuthSvcImpl mngMenuAuthSvcImpl;
	@Resource private JsonDataHandlerImpl jsonDataHandlerImpl;

	/**
	 * <B>@Method Name : getMngMenuAuthView</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴권한관리 화면 호출
	 * </ul>
	 * @param modelMap
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/bo/mngMenuAuth.do", method = RequestMethod.GET)
	public ModelAndView getMngMenuAuthView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		return new ModelAndView("main/MngMenuAuth");
	}
	
	/**
	 * <B>@Method Name : postMngMenuAuth</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴권한관리 CRUD를 SVC_ID로 구분하여 동작
	 * </ul>
	 * @param reqBodyMap
	 * @param req
	 * @param res
	 * @param bindingResult
	 * @throws Exception
	 */
	@RequestMapping(value = "/mngMenuAuth.do", method = RequestMethod.POST)
	public void postMngMenuAuth(@RequestBody(required=false) HashMap<String, Object> reqBodyMap, HttpServletRequest req, HttpServletResponse res, BindingResult bindingResult) throws Exception { 
		
		IListData listData = jsonDataHandlerImpl.convertToIListData(reqBodyMap, req);
		Map<?, ?> paramMap = listData.getParameterMap();
		IListData resultListData = new ListDataImpl();
		
		String svc_id = (String) paramMap.get("SVC_ID");
		if ("selectCdList".equals(svc_id)) {
			resultListData = mngMenuAuthSvcImpl.getCdList(paramMap);
			
		}  else if ("saveCd".equals(svc_id)) {
			mngMenuAuthSvcImpl.saveCd(listData);
		}
		
		resultListData = jsonDataHandlerImpl.setSessionMenuDataToIListData(req, resultListData);	
		
		jsonDataHandlerImpl.flushSuccessJSONResponse(res, jsonDataHandlerImpl.convertToJSONObject(resultListData));
	}	
}