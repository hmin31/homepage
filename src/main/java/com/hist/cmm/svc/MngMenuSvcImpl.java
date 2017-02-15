package com.hist.cmm.svc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.frw.dto.IListData;
import com.frw.dto.ListDataImpl;
import com.frw.exception.CustomedExceptionImpl;
import com.frw.svc.BizServiceImpl;
import com.hist.cmm.dao.MngMenuDaoImpl;

@Service("mngMenuSvcImpl")
public class MngMenuSvcImpl extends BizServiceImpl {

	@Autowired
	private MngMenuDaoImpl mngMenuDaoImpl;
	@SuppressWarnings("rawtypes")
	public IListData getMenuList(Map paramMap) throws Exception {
		
		IListData resultListData = new ListDataImpl();
		log.debug("getMenuList...");
		
		List allMenuList = mngMenuDaoImpl.getMenuList(paramMap);
		resultListData.setDataList("all_main_menu", allMenuList);
		
/*		String cdCnt = mngMenuDaoImpl.getMenuCnt(paramMap);
		resultListData.addVariable("cdCnt", cdCnt);*/
		
		
		return resultListData;
	}
	
	@SuppressWarnings("rawtypes")
	public IListData getLowerMenuList(Map<?, ?> paramMap) throws Exception {
		// TODO Auto-generated method stub
		IListData resultListData = new ListDataImpl();
		
		List lowerMenuList = mngMenuDaoImpl.getLowerMenuList(paramMap);
		resultListData.setDataList("lower_menu", lowerMenuList);
		
		return resultListData;
	}	
	
	
	public void saveCd(IListData listData) throws Exception {
		
//		IListData resultListData = new ListDataImpl();
		/*Map<?, ?> paramMap = listData.getParameterMap();
		mngMenuDaoImpl.getMenuCnt(paramMap);
		List list = listData.getDataList("layer_input");
		HashMap rowData = null;	
		String rowStatus = "";
		
		for (int i = 0, j = list.size(); i < j; i++) {
			rowData = (HashMap) list.get(i);
			rowStatus = String.valueOf(rowData.get("ROW_STATUS"));
			rowData.put("REG_USR_ID", listData.getParameter("REG_USR_ID"));
			
			if ("I".equals(rowStatus)) {
				String avail_yn = mngMenuDaoImpl.getMenuAvail(rowData);
				if ("N".equals(avail_yn)) {
					throw new CustomedExceptionImpl(4, String.valueOf(rowData.get("MENU_CD")) + " (硫?? 肄??) 媛??대? 議댁??⑸??? ?????????????.");
				}
				mngMenuDaoImpl.insertMenu(rowData);

			} else if ("U".equals(rowStatus)) {
				mngMenuDaoImpl.updateMenu(rowData);	
			}
		}*/

	}

	public void delCd(Map paramMap) throws Exception {
		
/*		String avail_yn = mngMenuDaoImpl.getMenuAvail(paramMap);
		if ("Y".equals(avail_yn)) {
			throw new CustomedExceptionImpl(4, String.valueOf(paramMap.get("MENU_CD")) + " (硫?? 肄??) 媛?議댁???? ??????. ?????????????.");
		} 
		mngMenuDaoImpl.delMenu(paramMap);*/
	}

	public void saveLowerMenu(IListData listData) throws Exception {
		// TODO Auto-generated method stub
		/*IListData resultListData = new ListDataImpl();
		Map<?, ?> paramMap = listData.getParameterMap();
		//mngMenuDaoImpl.getMenuCnt(paramMap);
		List list = listData.getDataList("layer_input");
		HashMap rowData = null;	
		String rowStatus = "";
		log.debug(">>>>>saveLowerMenu is called.. listsize : " + list.size());
		for (int i = 0, j = list.size(); i < j; i++) {
			rowData = (HashMap) list.get(i);
			log.debug("rowData : " + rowData);
			rowStatus = String.valueOf(rowData.get("ROW_STATUS"));
			rowData.put("REG_USR_ID", listData.getParameter("REG_USR_ID"));
			
			//Insert
			if ("I".equals(rowStatus)) {
				String avail_yn = mngMenuDaoImpl.getMenuAvail(rowData);
				if ("N".equals(avail_yn)) {
					throw new CustomedExceptionImpl(4, String.valueOf(rowData.get("MENU_CD")) + " (硫?? 肄??) 媛??대? 議댁??⑸??? ?????????????.");
				}
				mngMenuDaoImpl.insertLowerMenu(rowData);

			} else if ("U".equals(rowStatus)) {
				mngMenuDaoImpl.updateLowerMenu(rowData);	
			}
		}*/
		
		
		
		Map<?, ?> paramMap = listData.getParameterMap();
		//mngMenuDaoImpl.getDetailCdCnt(paramMap);
		List list = listData.getDataList("do_lowerMenu_chg");
		HashMap rowData = null;	
		String rowStatus = "";
		
		log.debug(">>>>>saveLowerMenu is called.. listsize : " + list.size());
		
		for (int i = 0, j = list.size(); i < j; i++) {
			rowData = (HashMap) list.get(i);
			log.debug(">>>>>row Data : " + list.get(i));
			rowStatus = String.valueOf(rowData.get("ROW_STATUS"));
			rowData.put("REG_USR_ID", listData.getParameter("REG_USR_ID"));
			
			
			
			if ("I".equals(rowStatus)) {
				/*String avail_yn = basisCdDaoImpl.getDetailCdAvail(rowData);
				if ("N".equals(avail_yn)) {
					throw new CustomedExceptionImpl(4, String.valueOf(rowData.get("MASTR_CD")) + " - " +
							String.valueOf(rowData.get("DETAIL_CD")) + " ��� 肄��媛��대� 議댁��⑸��� �������������.");
				}*/
				log.debug("InsertLowerMenu process");
				mngMenuDaoImpl.insertLowerMenu(rowData);
				
			} else if ("U".equals(rowStatus)) { 
				log.debug("updateLowerMenu process");
				mngMenuDaoImpl.updateLowerMenu(rowData);	
			} else if ("D".equals(rowStatus)) {
				log.debug("deleteLowerMenu process");
				mngMenuDaoImpl.deleteLowerMenu(rowData);
			}
		}
	}
	


}
