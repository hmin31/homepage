package com.hist.sys.ctr;

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
import com.hist.sys.svc.BasisCdSvcImpl;


@Controller
public class BasisCdWebCtrImpl {

	private final Logger log = LoggerFactory.getLogger(BasisCdWebCtrImpl.class);
	
	@Resource private BasisCdSvcImpl basisCdSvcImpl;
	/*@Resource private CdListServiceImpl cdListServiceImpl;*/
	@Resource private JsonDataHandlerImpl jsonDataHandlerImpl;
	
	@RequestMapping(value = "/bo/basisCd.do", method = RequestMethod.GET)
	public ModelAndView getBasisCdView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		System.out.println("BasisCd GET");
		return new ModelAndView("sys/BasisCd");
	}
	
	
	@RequestMapping(value = "/basisCd.do", method = RequestMethod.POST)
	public void postBasisCd(@RequestBody(required=false) HashMap<String, Object> reqBodyMap, HttpServletRequest req, HttpServletResponse res, BindingResult bindingResult) throws Exception { 
		System.out.println("BasisCd POST");
		IListData listData = jsonDataHandlerImpl.convertToIListData(reqBodyMap, req);
//		Map<?, ?> variableMap = listData.getVariableMap();
		Map<?, ?> paramMap = listData.getParameterMap();
		IListData resultListData = new ListDataImpl();
		
		String svc_id = (String) paramMap.get("SVC_ID");
		
		if ("getCdCtgrzList".equals(svc_id)) {
			resultListData = basisCdSvcImpl.getCdCtgrzList(paramMap);
		}else if("selectCdCtgrzList".equals(svc_id)){
			resultListData = basisCdSvcImpl.getCdCtgrzList(paramMap);
		}else if ("saveCdCtgrz".equals(svc_id)) {
			//코드 분류 저장 시 등록자 처리 
			basisCdSvcImpl.saveCdCtgrz(listData);
		}
		//코드 부분
		else if ("getCdList".equals(svc_id)) {
			resultListData = basisCdSvcImpl.getCdList(paramMap);
		}
		else if ("saveCd".equals(svc_id)) {
			//코드 분류 저장 시 등록자 처리 
			basisCdSvcImpl.saveCd(listData);
		}
		
		
		
		/*String svc_id = (String) paramMap.get("SVC_ID");
		if ("selectBasisCdList".equals(svc_id)) {
			resultListData = basisCdSvcImpl.getCdsList(paramMap);
		} else if ("getMasterCdList".equals(svc_id)) {
			resultListData = basisCdSvcImpl.getMasterCdList(paramMap);
		} else if ("getDetailCdList".equals(svc_id)) {
			resultListData = basisCdSvcImpl.getDetailCdList(paramMap);
		} else if ("saveMasterCd".equals(svc_id)) {
			basisCdSvcImpl.saveMasterCd(listData);
		} else if ("saveDetailCd".equals(svc_id)) {
			basisCdSvcImpl.saveDetailCd(listData);
		} else if ("getSelectedCmbs".equals(svc_id)) {
			resultListData = cdListServiceImpl.getSelectedCmbs(paramMap);
		}*/
		resultListData = jsonDataHandlerImpl.setSessionMenuDataToIListData(req, resultListData);	
		
		jsonDataHandlerImpl.flushSuccessJSONResponse(res, jsonDataHandlerImpl.convertToJSONObject(resultListData));
	}
}
