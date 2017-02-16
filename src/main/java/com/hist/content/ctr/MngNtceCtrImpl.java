package com.hist.content.ctr;

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
import com.hist.content.svc.MngNtceSvcImpl;

@Controller
public class MngNtceCtrImpl {

	private final Logger log = LoggerFactory.getLogger(MngNtceCtrImpl.class);

	@Resource
	private MngNtceSvcImpl mngNtceSvcImpl;
	
	@Resource
	private JsonDataHandlerImpl jsonDataHandlerImpl;

	@RequestMapping(value = "/bo/mngNtce.do", method = RequestMethod.GET)
	public ModelAndView getTestView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		log.debug(">>>>> get mngNtce request");
		return new ModelAndView("content/MngNtce");
	}

	@RequestMapping(value = "/mngNtce.do", method = RequestMethod.POST)
	public void postTest(@RequestBody(required = false) HashMap<String, Object> reqBodyMap, HttpServletRequest req,
			HttpServletResponse res, BindingResult bindingResult) throws Exception {

		log.debug(">>>>> post mngNtce request");
		
		IListData listData = jsonDataHandlerImpl.convertToIListData(reqBodyMap, req);
		Map<?, ?> paramMap = listData.getParameterMap();
		IListData resultListData = new ListDataImpl();
		
		String svc_id = (String) paramMap.get("SVC_ID");
		if ("getNtceMenu".equals(svc_id)) {
			resultListData = mngNtceSvcImpl.getNtceMenu(paramMap);
			
		} else if ("getNtceDtls".equals(svc_id)) {
			resultListData = mngNtceSvcImpl.getNtceDtls(paramMap);
			
		} else if ("insertNtceDtls".equals(svc_id)) {
			mngNtceSvcImpl.insertNtceDtls(paramMap);
			
		} else if ("updateNtceDtls".equals(svc_id)) {
			mngNtceSvcImpl.updateNtceDtls(paramMap);
			
		} else if ("mergeNtceDtls".equals(svc_id)) {
			mngNtceSvcImpl.mergeNtceDtls(paramMap);
		}
		
		resultListData = jsonDataHandlerImpl.setSessionMenuDataToIListData(req, resultListData);
		
		jsonDataHandlerImpl.flushSuccessJSONResponse(res, jsonDataHandlerImpl.convertToJSONObject(resultListData));
	}
}