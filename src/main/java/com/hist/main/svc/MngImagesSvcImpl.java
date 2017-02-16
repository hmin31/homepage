package com.hist.main.svc;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.exception.CustomedExceptionImpl;
import com.frw.svc.BizServiceImpl;
import com.frw.utl.PropertiesUtil;
import com.frw.utl.SecurityHolder;
import com.hist.main.dao.MngImagesDaoImpl;

@Service("mngImagesSvcImpl")
public class MngImagesSvcImpl extends BizServiceImpl {
	
	@Autowired
	private MngImagesDaoImpl mngImagesDaoImpl;
	
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public IListData getImageList(Map paramMap) throws Exception {
		
		IListData resultListData = new ListDataImpl();
		List<?> returnList = mngImagesDaoImpl.getImageList(paramMap);
		resultListData.setDataList("imageList_do", (List<Map<String, Object>>) returnList);
		
		return resultListData;
	}
	
	public Object getImageBytes(String imageId) throws Exception {
		
		Map<String, String> paramMap = new HashMap<String, String>();
//		paramMap.put("IMAGE_ID", "a800968d-81bd-49d5-a84c-d9050b1638a4");
		paramMap.put("IMAGE_ID", imageId);
		Map<String, Object> resultMap = mngImagesDaoImpl.getImageBlob(paramMap);
		
		return resultMap.get("IMAGE_BLOB");
	}
	
	public void imageUpload(MultipartHttpServletRequest request) throws Exception {
		log.debug(">>>>> >>>>> >>>>> MngImagesSvcImpl, imageUpload");

		Map<String, String> paramMap = new HashMap<String, String>();
		Iterator<String> itr = request.getFileNames();

		String fileName = "";
		MultipartFile file = null;

		while (itr.hasNext()) {
			fileName = itr.next();
			file = request.getFile(fileName);

			String file_id = UUID.randomUUID().toString();
			String orgFileName = file.getOriginalFilename();

			log.debug(">>>>> >>>>> >>>>> before encoding orgFileName: " + orgFileName);

			try {
				orgFileName = new String(orgFileName.getBytes("iso-8859-1"), "utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

			log.debug(">>>>> >>>>> >>>>> after encoding orgFileName: " + orgFileName);
			log.debug(">>>>> >>>>> >>>>> request.getRequestURL(): " + request.getRequestURL());

			String fileSize = String.valueOf(file.getSize());
			String fileExt = orgFileName.substring(orgFileName.lastIndexOf(".") + 1, orgFileName.length());

			paramMap.put("IMAGE_ID", file_id);
			paramMap.put("IMAGE_NM", orgFileName);
			paramMap.put("IMAGE_EXT", fileExt);
			paramMap.put("IMAGE_SIZE", fileSize);

			Map<String, Object> imageUploadMap = new HashMap<String, Object>();
			imageUploadMap.putAll(paramMap);
			imageUploadMap.put("IMAGE_BLOB", request.getFile(fileName).getBytes());
			
			mngImagesDaoImpl.insertImages(imageUploadMap);
			
		}

	}


	public void fileUpload(MultipartHttpServletRequest request) throws Exception {
		log.debug(">>>>> >>>>> >>>>> FileService, fileUpload");

		Map<String, String> paramMap = new HashMap<String, String>();
		Iterator<String> itr = request.getFileNames();

		String fileName = "";
		MultipartFile file = null;

		while (itr.hasNext()) {
			fileName = itr.next();
			file = request.getFile(fileName);

			String file_id = UUID.randomUUID().toString();
			String orgFileName = file.getOriginalFilename();

			log.debug(">>>>> >>>>> >>>>> before encoding orgFileName: " + orgFileName);

			try {
				orgFileName = new String(orgFileName.getBytes("iso-8859-1"), "utf-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}

			log.debug(">>>>> >>>>> >>>>> after encoding orgFileName: " + orgFileName);
			log.debug(">>>>> >>>>> >>>>> request.getRequestURL(): " + request.getRequestURL());

			String fileSize = String.valueOf(file.getSize());
			String fileExt = orgFileName.substring(orgFileName.lastIndexOf(".") + 1, orgFileName.length());
			String filePathStr = PropertiesUtil.getString("file.path") + "ATTACH_FILES"
					+ PropertiesUtil.getString("file.delimiter") + request.getParameter("BLTNS_FLG_CD")
					+ PropertiesUtil.getString("file.delimiter") + file_id;
			File filePath = new File(filePathStr);

			/*
			 * paramMap.put("OWN_ENTITY", request.getParameter("ownEntity"));
			 * paramMap.put("OWN_ENTITY_PK",
			 * request.getParameter("ownEntityPk"));
			 * paramMap.put("OWN_ENTITY_COLM",
			 * request.getParameter("ownEntityColm"));
			 * 
			 * paramMap.put("FILE_ID", file_id); paramMap.put("FILE_ORG_NM",
			 * orgFileName); paramMap.put("FILE_EXT", fileExt);
			 * paramMap.put("FILE_PATH", filePathStr); paramMap.put("FILE_SIZE",
			 * fileSize);
			 */
			/*
			 * TB_BBS_BD110, TB_BBS_BD200 테이블 변경으로 인한 컬럼 수정
			 */
			
			paramMap.put("BLTNS_SEQ_NO", request.getParameter("BLTNS_SEQ_NO"));

			paramMap.put("FILE_ID", file_id);
			paramMap.put("FILE_NM", orgFileName);
			paramMap.put("FILE_EXT", fileExt);
			paramMap.put("FILE_PATH", filePathStr);
			paramMap.put("FILE_SIZE", fileSize);

			String sesId = SecurityHolder.getUserId(request);
			paramMap.put("SES_ID", sesId);

			try {
				file.transferTo(filePath);
			} catch (IllegalStateException e) {
				log.error("<<<<< <<<<< <<<<< FileSSvc - fileUpload - IllegalStateException: " + e.getMessage());
				throw new CustomedExceptionImpl(604, "IllegalStateException");
			} catch (IOException e) {
				log.error("<<<<< <<<<< <<<<< FileSSvc - fileUpload - IOException: " + e.getMessage());
				throw new CustomedExceptionImpl(604, "IOException");
			}
			// fileDaoImpl.insertFileListInfo(paramMap);
			// fileDaoImpl.insertFileMapInfo(paramMap);
		}

	}

}
