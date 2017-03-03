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
import com.hist.main.svc.MngContentsSvcImpl;

@Controller
public class MngContentsCtrImpl {

	private final Logger log = LoggerFactory.getLogger(MngContentsCtrImpl.class);

	@Resource
	private MngContentsSvcImpl mngContentsSvcImpl;
	
	@Resource
	private JsonDataHandlerImpl jsonDataHandlerImpl;

	@RequestMapping(value = "/bo/mngContents.do", method = RequestMethod.GET)
	public ModelAndView getTestView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		log.debug(">>>>> get mngContents request");
		return new ModelAndView("main/MngContents");
	}

	@RequestMapping(value = "/mngContents.do", method = RequestMethod.POST)
	public void postTest(@RequestBody(required = false) HashMap<String, Object> reqBodyMap, HttpServletRequest req,
			HttpServletResponse res, BindingResult bindingResult) throws Exception {

		log.debug(">>>>> post mngContents request");
		
		IListData listData = jsonDataHandlerImpl.convertToIListData(reqBodyMap, req);
		Map<?, ?> paramMap = listData.getParameterMap();
		IListData resultListData = new ListDataImpl();

		String svc_id = (String) paramMap.get("SVC_ID");
		if ("getContentsMenu".equals(svc_id)) {
			resultListData = mngContentsSvcImpl.getContentsMenu(paramMap);
		} else if ("getContentsDtls".equals(svc_id)) {
			resultListData = mngContentsSvcImpl.getContentsDtls(paramMap);
			
		} else if ("insertContentsDtls".equals(svc_id)) {
			mngContentsSvcImpl.insertContentsDtls(paramMap);
		} else if ("updateContentsDtls".equals(svc_id)) {
			mngContentsSvcImpl.updateContentsDtls(paramMap);
		} else if ("mergeContentsDtls".equals(svc_id)) {
			mngContentsSvcImpl.mergeContentsDtls(paramMap);
		} else if ("getContentsDtlsHst".equals(svc_id)) {
			resultListData = mngContentsSvcImpl.getContentsDtlsHst(paramMap);
		}

		resultListData = jsonDataHandlerImpl.setSessionMenuDataToIListData(req, resultListData);

		jsonDataHandlerImpl.flushSuccessJSONResponse(res, jsonDataHandlerImpl.convertToJSONObject(resultListData));
	}

	
	
}
