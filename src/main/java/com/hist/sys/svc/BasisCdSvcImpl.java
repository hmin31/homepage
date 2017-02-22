package com.hist.sys.svc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.exception.CustomedExceptionImpl;
import com.frw.svc.BizServiceImpl;
import com.hist.sys.dao.BasisCdDaoImpl;


/**
 * <B>@Package : </B>skt.tmall.air.bof.sys.svc<br/>
 * <B>@TypeName : </B>BasisCdSvcImpl<br/>
 * <B>@Date : </B>2016. 12. 16.<br/>
 * <B>@Author : </B>ckim<br/>
 * <B>Description</B>
 * <ul> 
 * <li>기초코드정보 서비스
 * </ul>
 */
@Service("basisCdSvcImpl")
public class BasisCdSvcImpl extends BizServiceImpl {

	@Autowired
	private BasisCdDaoImpl basisCdDaoImpl;

	/**
	 * <B>@Method Name : getCdCtgrzList</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description:  코드 리스트와 검색된 수 를 가져온다.
	 * </ul>
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public IListData getCdCtgrzList(Map paramMap) throws Exception{
		
		IListData resultListData = new ListDataImpl();
		List returnList = basisCdDaoImpl.getCdCtgrzList(paramMap);

		//쿼리 결과 값을 저장한다.
		resultListData.setDataList("cdCtgrz_do", returnList);
		String masterCnt = basisCdDaoImpl.getCdCtgrzCnt(paramMap);
		resultListData.addVariable("cdCtgrzCnt", masterCnt);
		return resultListData;
	}
	/**
	 * <B>@Method Name : getDetailCdList</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 코드 리스트와 검색된 수 를 가져온다.
	 * </ul>
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public IListData getCdList(Map paramMap) throws Exception {
		IListData resultListData = new ListDataImpl();
		List returnList = basisCdDaoImpl.getCdList(paramMap);
		resultListData.setDataList("do_cd", returnList);
		String detailCnt = basisCdDaoImpl.getCdCnt(paramMap);
		resultListData.addVariable("cdCnt", detailCnt);
		return resultListData;
	}
	
	
	/**
	 * <B>@Method Name : saveCdCtgrz</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 코드 분류 수정 및 삽입
	 * </ul>
	 * @param listData
	 * @throws Exception
	 */
	public void saveCdCtgrz(IListData listData) throws Exception {
		
		IListData resultListData = new ListDataImpl();
		
		Map<?, ?> paramMap = listData.getParameterMap();
		
		//코드 분류에 대한 코드의 개수를 가져온다. ??
		//basisCdDaoImpl.getCdCnt(paramMap);
		//코드 분류 그리드에서 변경된 그리드의 값 리스트를 가져온다.
		List list = listData.getDataList("do_cdCtgrz_chg");
		HashMap rowData = null;	
		String rowStatus = "";
		
		for (int i = 0, j = list.size(); i < j; i++) {
			rowData = (HashMap) list.get(i);
			rowStatus = String.valueOf(rowData.get("ROW_STATUS"));
			rowData.put("REG_USR_ID", listData.getParameter("REG_USR_ID"));
			log.debug(">>>>>>>saveCdCtgrz - User ID : " + listData.getParameter("REG_USR_ID"));
			if ("I".equals(rowStatus)) {
				//키 값이 존재 하는지 체크 
				String avail_yn = basisCdDaoImpl.getCdCtgrzAvail(rowData);
				if ("N".equals(avail_yn)) {
					throw new CustomedExceptionImpl(4, String.valueOf(rowData.get("CD_CTGRZ")) + " 코드 분류 값이 이미 존재합니다. 저장할 수 없습니다.");
				}
				//Insert Logic
				basisCdDaoImpl.insertCdCtgrz(rowData);
				
			} else if ("U".equals(rowStatus)) {
				basisCdDaoImpl.updateCdCtgrz(rowData);
			}
		}
		
	}

	/**
	 * <B>@Method Name : saveCd</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 코드 수정 및 삽입
	 * </ul>
	 * @param listData
	 * @throws Exception
	 */
	public void saveCd(IListData listData) throws Exception {
		
//		IListData resultListData = new ListDataImpl();
		Map<?, ?> paramMap = listData.getParameterMap();
		//basisCdDaoImpl.getCdCnt(paramMap);
		List list = listData.getDataList("do_cd_chg");
		HashMap rowData = null;	
		String rowStatus = "";
		
		for (int i = 0, j = list.size(); i < j; i++) {
			rowData = (HashMap) list.get(i);
			rowStatus = String.valueOf(rowData.get("ROW_STATUS"));
			rowData.put("REG_USR_ID", listData.getParameter("REG_USR_ID"));
			
			if ("I".equals(rowStatus)) {
				
				//코드 Key 값 체크 
				String avail_yn = basisCdDaoImpl.getCdAvail(rowData);
				if ("N".equals(avail_yn)) {
					throw new CustomedExceptionImpl(4, String.valueOf(rowData.get("CD_CTGRZ")) + " - " +
							String.valueOf(rowData.get("CD")) + " 코드가 이미 존재합니다. 저장할 수 없습니다.");
				}
				basisCdDaoImpl.insertCd(rowData);
				
			} else if ("U".equals(rowStatus)) { 
				basisCdDaoImpl.updateCd(rowData);
			} else if ("D".equals(rowStatus)) {
				basisCdDaoImpl.deleteCd(rowData);
			}
		}
		
	}
	

	
}
