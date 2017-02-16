package com.hist.main.ctr;

import java.io.IOException;
import java.sql.Blob;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.utl.JsonDataHandlerImpl;
import com.hist.main.svc.MngImagesSvcImpl;

@Controller
public class MngImagesCtrImpl {

	private final Logger log = LoggerFactory.getLogger(MngImagesCtrImpl.class);

	@Resource
	private JsonDataHandlerImpl jsonDataHandlerImpl;

	@Resource
	private MngImagesSvcImpl mngImagesSvcImpl;
	
	@RequestMapping(value = "/mngImages.do", method = RequestMethod.GET)
	public ModelAndView getTestView(HashMap<String, Object> modelMap, HttpServletRequest req) throws Exception {
		log.debug(">>>>> get mngImages request");
		return new ModelAndView("main/MngImages");
	}
	
	@RequestMapping(value = "/mngImages.do", method = RequestMethod.POST)
	public void doPost(@RequestBody(required = false) HashMap<String, Object> reqBodyMap, HttpServletRequest req,
			HttpServletResponse res, BindingResult bindingResult) throws Exception {

		log.debug(">>>>> post mngImages request");
		
		IListData listData = jsonDataHandlerImpl.convertToIListData(reqBodyMap, req);
		Map<?, ?> paramMap = listData.getParameterMap();
		IListData resultListData = new ListDataImpl();

		String svc_id = (String) paramMap.get("SVC_ID");
		if ("getImageList".equals(svc_id)) {
			resultListData = mngImagesSvcImpl.getImageList(paramMap);
		}

		resultListData = jsonDataHandlerImpl.setSessionMenuDataToIListData(req, resultListData);

		jsonDataHandlerImpl.flushSuccessJSONResponse(res, jsonDataHandlerImpl.convertToJSONObject(resultListData));
	}

	@RequestMapping(value = "/imageUpload.do", method = RequestMethod.POST)
	public void doFileUpload(HttpServletRequest request) throws Exception {

		log.debug(">>>>> >>>>> >>>>> imageUpload");
		MultipartHttpServletRequest multiPartRequest = (MultipartHttpServletRequest) request;
		mngImagesSvcImpl.imageUpload(multiPartRequest);

	}
	
	@RequestMapping(value="/imageDisplaySample.do")
	public ResponseEntity<byte[]> getByteImageSample(@RequestParam("id") String imageId) {
		try {
			Blob blob = (Blob) mngImagesSvcImpl.getImageBytes(imageId);
			int blobLength = (int) blob.length(); 
			byte[] itemImage = blob.getBytes(1, blobLength);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.IMAGE_PNG);
			return new ResponseEntity<byte[]>(itemImage, headers, HttpStatus.OK);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			return null;
		}
		
	}

	@RequestMapping(value = "/imageDisplay.do", method = RequestMethod.GET)
	public void doImageDisplay(@RequestParam("id") String imageId, HttpServletResponse response,
			HttpServletRequest request) throws ServletException, IOException {

		log.debug(">>>>> >>>>> >>>>> imageDisplay");
		//<img src="imageDisplay.do?id=a800968d-81bd-49d5-a84c-d9050b1638a4">

		try {
			Blob blob = (Blob) mngImagesSvcImpl.getImageBytes(imageId);
			int blobLength = (int) blob.length(); 
			byte[] itemImage = blob.getBytes(1, blobLength);
			
			response.setContentType("image/jpeg, image/jpg, image/png, image/gif");
			response.getOutputStream().write(itemImage);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			log.error(">>>>> >>>>> >>>>> doImageDisplay error");
		}

	}

}
