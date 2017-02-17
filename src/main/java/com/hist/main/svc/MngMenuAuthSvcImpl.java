package com.hist.main.svc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.exception.CustomedExceptionImpl;
import com.frw.svc.BizServiceImpl;

import com.hist.main.dao.MngMenuAuthDaoImpl;


/**
* <B>Package Name : </B>com.hist.main.svc<br/>
* <B>File Name : </B>MngMenuSvcImpl<br/>
* <B>Description</B>
* <ul> 
* <li>메뉴 권한 관리 서비스
* </ul>
* 
* @author hist
* @since 2017. 02. 14
*/ 
@Service("mngMenuAuthSvcImpl")
public class MngMenuAuthSvcImpl extends BizServiceImpl {

	@Autowired
	private MngMenuAuthDaoImpl mngMenuDaoImpl;
	
	/**
	* <B>History</B>
	* <ul>
	* <li>Date : 2017. 02. 14
	* <li>Developer : hist
	* <li>파라미터로 검색하고  리스트 형태로 데이터와 검색된 수를 리턴한다.
	* </ul>
	*  
	* @param paramMap
	* @return
	* @throws Exception
	*/
	public IListData getCdList(Map paramMap) throws Exception {
		IListData resultListData = new ListDataImpl();
		List returnList = mngMenuDaoImpl.getMenuAuthList(paramMap);
		resultListData.setDataList("do_cd", returnList);
		String cdCnt = mngMenuDaoImpl.getMenuAuthCnt(paramMap);
		resultListData.addVariable("cdCnt", cdCnt);
		return resultListData;
	}

	/**
	* <B>History</B>
	* <ul>
	* <li>Date : 2017. 02. 14
	* <li>Developer : hist
	* <li>리스트 형태로 데이터를 받아와서 I, U, D(삭제 추가 됨) 형태에 따라 저장한다. 
	* </ul>
	*  
	* @param listData
	* @throws Exception
	*/
	public void saveCd(IListData listData) throws Exception {
		
//		IListData resultListData = new ListDataImpl();
		Map<?, ?> paramMap = listData.getParameterMap();
		mngMenuDaoImpl.getMenuAuthCnt(paramMap);
		List list = listData.getDataList("do_cd_chg");
		HashMap rowData = null;	
		String rowStatus = "";
		
		for (int i = 0, j = list.size(); i < j; i++) {
			rowData = (HashMap) list.get(i);
			rowStatus = String.valueOf(rowData.get("ROW_STATUS"));
			rowData.put("REG_USR_ID", listData.getParameter("REG_USR_ID"));
			
			if ("I".equals(rowStatus)) {
				String avail_yn = mngMenuDaoImpl.getMenuAuthAvail(rowData);
				
				if ("N".equals(avail_yn)) {
					throw new CustomedExceptionImpl(4, String.valueOf(rowData.get("GRP_AUTH_CD")) 
							+ ", " + String.valueOf(rowData.get("MENU_CD")) 
							+ " (그룹권한코드, 메뉴코드)가 이미 존재합니다. 저장할 수 없습니다.");
				}
				mngMenuDaoImpl.insertMenuAuth(rowData);

			} else if ("U".equals(rowStatus)) {
				mngMenuDaoImpl.updateMenuAuth(rowData);	
				
			} else if ("D".equals(rowStatus)) {
				mngMenuDaoImpl.delMenuAuth(rowData);
			}
		}
		
	}
}
