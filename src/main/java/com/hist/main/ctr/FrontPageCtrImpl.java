package com.hist.main.ctr;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.utl.JsonDataHandlerImpl;
import com.hist.main.svc.FrontPageSvcImpl;

@Controller
public class FrontPageCtrImpl {

	private final Logger log = LoggerFactory.getLogger(FrontPageCtrImpl.class);

	@Autowired
	private FrontPageSvcImpl frontPageSvcImpl;
	
	@Resource
	private JsonDataHandlerImpl jsonDataHandlerImpl;

	@RequestMapping(value = "/frontMain.do", method = RequestMethod.GET)
	public ModelAndView getFrontMainView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		return new ModelAndView("frontMain");
	}
	
	@RequestMapping(value = "/frontSub.do", method = RequestMethod.GET)
	public ModelAndView getFrontSubView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		log.debug("view parameter is ");
		return new ModelAndView("frontSub");
	}	
	
	@RequestMapping(value = "/frontPage.do", method = RequestMethod.POST)
	public void doPost(@RequestBody(required = false) HashMap<String, Object> reqBodyMap, HttpServletRequest req,
			HttpServletResponse res, BindingResult bindingResult) throws Exception {

		log.debug(">>>>> post mngImages request");

		IListData listData = jsonDataHandlerImpl.convertToIListData(reqBodyMap, req);
		Map<?, ?> paramMap = listData.getParameterMap();
		IListData resultListData = new ListDataImpl();

		String svc_id = (String) paramMap.get("SVC_ID");
		if ("getMenuList".equals(svc_id)) {
			resultListData = frontPageSvcImpl.getMenuList(paramMap);
		} else if ("getAllFrontPageContents".equals(svc_id)) {
			resultListData = frontPageSvcImpl.getAllFrontPageContents(paramMap);
		} else if ("getFrontSubTitleContents".equals(svc_id)) {
			resultListData = frontPageSvcImpl.getFrontSubTitleContents(paramMap);
			
		}
		
		resultListData = jsonDataHandlerImpl.setSessionMenuDataToIListData(req, resultListData);

		jsonDataHandlerImpl.flushSuccessJSONResponse(res, jsonDataHandlerImpl.convertToJSONObject(resultListData));
	}

}