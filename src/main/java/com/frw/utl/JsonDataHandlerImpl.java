package com.frw.utl;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.frw.dto.DataHandler;
import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.dto.UserInfo;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

@Component("jsonDataHandlerImpl")
public class JsonDataHandlerImpl implements DataHandler {

	protected final Logger log = LoggerFactory.getLogger(JsonDataHandlerImpl.class);
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public IListData convertToIListData(HashMap<String, Object> jObj, HttpServletRequest request) throws Exception {

		log.debug(">>>>> >>>>> >>>>> convertToIListData");

		IListData listData = new ListDataImpl();

		String sessionUserId = SecurityHolder.getUserId(request);
		UserInfo userInfo = SecurityHolder.getUserInfo(request);
		
//		Map paramMap = null;
//		if(jObj.get(PARAM_KEY) == null) {
//			paramMap = new HashMap();
//		} else {
//			paramMap = (Map) jObj.get(PARAM_KEY);
//		}
		
		Map paramMap = new HashMap();

		if(jObj.get(PARAM_KEY) != null) {
			paramMap = (Map) jObj.get(PARAM_KEY);
		} 
		
		if(sessionUserId != null) {
			paramMap.put("REG_USR_ID", sessionUserId);
		}
		
		if(userInfo != null) {
			paramMap.put("SES_AGT_CD", userInfo.getAgtCd());
			paramMap.put("SES_GRP_AUTH_CD", userInfo.getGrpAuthCd());
			paramMap.put("SES_USR_NM", userInfo.getUsrNm());
			paramMap.put("SES_DEPT_NM", userInfo.getDeptNm());
			paramMap.put("SES_POSI_NM", userInfo.getPosiNm());
		}
		
//		listData.setParameterMap((Map) jObj.get(PARAM_KEY));
		listData.setParameterMap(paramMap);

		Iterator iterator = jObj.entrySet().iterator();
		Entry entry = null;
		String keyName = "";
		List gridList = null;
		Map eachRowData;

		Gson gson = new GsonBuilder().create();
		
		
		while (iterator.hasNext()) {
			entry = (Entry) iterator.next();
			keyName = String.valueOf(entry.getKey());

			if (!PARAM_KEY.equals(keyName)) {

				// grid 변경 데이터가 아닐때(grid 변경은 화면에서 chg로 끝나는 형태로 넘겨야 한다)
				if (!"chg".equals(keyName.substring(keyName.length() - 3, keyName.length()))) {
					
					// Value 가 List 인 경우만 Type Casting 함 2016.11.22 bigzero
					if(jObj.get(keyName) instanceof List){						
						listData.setDataList(keyName, (List) jObj.get(keyName));
					}else{
						log.warn("jObj value object is not Type of List");
					}

				} else {
					if (!"{}".equals(String.valueOf(entry.getValue()))) {
						ObjectMapper om = new ObjectMapper();
						Map<String, Object> m2 = om.readValue(gson.toJson(entry.getValue()),
								new TypeReference<Map<String, Object>>() {
								});

						gridList = new ArrayList();

						int i = 0;
						for (String key : m2.keySet()) {
							eachRowData = (Map) m2.get(String.valueOf(key));
							gridList.add(i, eachRowData);
							i++;
						}

						listData.setDataList(keyName, gridList);

					} else {
						listData.setDataList(keyName, null);
					}
				}
			}
		}

		return listData;
	}

	@SuppressWarnings("static-access")
	public JSONObject convertToJSONObject(IListData listData) throws Exception {

		log.debug(">>>>> >>>>> >>>>> convertToJSONObject");

		JSONObject jsonObj = new JSONObject();

		if (null != listData) {
			Iterator<Entry<Object, Object>> entryIter = listData.entrySet().iterator();
			while (entryIter.hasNext()) {
				Entry<Object, Object> entry = entryIter.next();
				log.debug(">>>>> >>>>> >>>>> model.put [" + entry.getKey() + "]");
				JSONSerializer js = new JSONSerializer();
				if(js != null) {
					jsonObj.put(entry.getKey(), js.toJSON(entry.getValue()));
				}
			}
		}
		
		return jsonObj;
	}
	
	public void flushErrorJSONResponse(HttpServletResponse res, int msgNo, String msg) throws Exception {
		flushJSONResponse(res, null, msgNo, msg);
	}
	
	public void flushNoticeJSONResponse(HttpServletResponse res, int msgNo, String msg) throws Exception {
		flushJSONResponse(res, null, msgNo, msg);
	}
	
	public void flushSuccessJSONResponse(HttpServletResponse res, JSONObject jsonObj) throws Exception {
		flushJSONResponse(res, jsonObj, CommonMessage.CODE_NO_ERROR, CommonMessage.MSG_OK);
	}
	
	public void flushJSONResponse(HttpServletResponse res, int msgNo, String msg) throws Exception {
		flushJSONResponse(res, null, msgNo, msg);
	}
	
	public void flushJSONResponse(HttpServletResponse res, JSONObject jsonObj, int msgNo, String msg) throws Exception {
		JSONObject jObj = jsonObj;
		if(jObj == null) { jObj = new JSONObject(); } 		

		res.setContentType("text/html;charset=UTF-8");
		
		PrintWriter pw = res.getWriter();
		jObj.put("RESULT", "{ERRORCODE:" + msgNo + "; ERRORMSG:'" + msg + "';}");
		pw.print(jObj);
		pw.flush();
	}
	
	
	public IListData setSessionMenuDataToIListData(HttpServletRequest req, IListData returnListData) {
		UserInfo userInfo = SecurityHolder.getUserInfo(req);
		if(userInfo != null) {
			returnListData.addVariable("SES_AGT_CD", userInfo.getAgtCd());
			returnListData.addVariable("SES_DEPT_NM", userInfo.getDeptNm());
			returnListData.addVariable("SES_GRP_AUTH_CD", userInfo.getGrpAuthCd());
			returnListData.addVariable("SES_POSI_NM", userInfo.getPosiNm());
			returnListData.addVariable("SES_USR_ID", userInfo.getUserId());
			returnListData.addVariable("SES_USR_NM", userInfo.getUsrNm());
			
			Map<String, String> paramMap = new HashMap<String, String>();
			paramMap.put("USR_ID", userInfo.getUserId());
			paramMap.put("MENU_URL", req.getServletPath().replace("/", ""));
			//String writeYn = menuDaoImpl.getMenuPermission(paramMap);
			//returnListData.addVariable("MENU_WRITE_YN", writeYn);
		}
		
		return returnListData;
	}

//	private void addJsonErrorMsg(HttpServletResponse res, int errorNo, String errorMsg) throws IOException {
//
//		res.setContentType("text/html;charset=UTF-8");
//
//		JSONObject jsonObj = new JSONObject();
//		PrintWriter pw = res.getWriter();
//		jsonObj.put("RESULT", "{ERRORCODE:" + errorNo + "; ERRORMSG:'" + errorMsg + "';}");
//		pw.print(jsonObj);
//		pw.flush();
//
//	}
//
//	private void successReturnDataHandler(HttpServletResponse res, JSONObject jsonObj) throws IOException {
//
//		res.setContentType("text/html;charset=UTF-8");
//
//		PrintWriter pw = res.getWriter();
//		jsonObj.put("RESULT", "{ERRORCODE:" + CODE_NO_ERROR + "; ERRORMSG:" + MSG_OK + ";}");
//		pw.print(jsonObj);
//		pw.flush();
//	}

}
