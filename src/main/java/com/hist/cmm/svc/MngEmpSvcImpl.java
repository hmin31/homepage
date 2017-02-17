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
import com.hist.cmm.dao.MngEmpDaoImpl;

@Service("mngEmpSvcImpl")
public class MngEmpSvcImpl extends BizServiceImpl {

	@Autowired
	private MngEmpDaoImpl mngEmpDaoImpl;
	@SuppressWarnings("rawtypes")
	public IListData getEmpList(Map paramMap) throws Exception {
		
		IListData resultListData = new ListDataImpl();
		log.debug("getEmpList...");
		
		List allEmpList = mngEmpDaoImpl.getEmpList(paramMap);
		resultListData.setDataList("all_main_emp", allEmpList);
		
/*		String cdCnt = mngEmpDaoImpl.getEmpCnt(paramMap);
		resultListData.addVariable("cdCnt", cdCnt);*/
		
		
		return resultListData;
	}
	
	public void saveCd(IListData listData) throws Exception {
		
//		IListData resultListData = new ListDataImpl();
		/*Map<?, ?> paramMap = listData.getParameterMap();
		mngEmpDaoImpl.getEmpCnt(paramMap);
		List list = listData.getDataList("layer_input");
		HashMap rowData = null;	
		String rowStatus = "";
		
		for (int i = 0, j = list.size(); i < j; i++) {
			rowData = (HashMap) list.get(i);
			rowStatus = String.valueOf(rowData.get("ROW_STATUS"));
			rowData.put("REG_USR_ID", listData.getParameter("REG_USR_ID"));
			
			if ("I".equals(rowStatus)) {
				String avail_yn = mngEmpDaoImpl.getEmpAvail(rowData);
				if ("N".equals(avail_yn)) {
					throw new CustomedExceptionImpl(4, String.valueOf(rowData.get("MENU_CD")) + " (硫?? 肄??) 媛??대? 議댁??⑸??? ?????????????.");
				}
				mngEmpDaoImpl.insertEmp(rowData);

			} else if ("U".equals(rowStatus)) {
				mngEmpDaoImpl.updateEmp(rowData);	
			}
		}*/

	}

	public void delCd(Map paramMap) throws Exception {
		
/*		String avail_yn = mngEmpDaoImpl.getEmpAvail(paramMap);
		if ("Y".equals(avail_yn)) {
			throw new CustomedExceptionImpl(4, String.valueOf(paramMap.get("MENU_CD")) + " (硫?? 肄??) 媛?議댁???? ??????. ?????????????.");
		} 
		mngEmpDaoImpl.delEmp(paramMap);*/
	}

	@SuppressWarnings("rawtypes")
	public void saveEmp(IListData listData) throws Exception {
		
		Map<?, ?> paramMap = listData.getParameterMap();
		List list = listData.getDataList("ds_emp");
		HashMap rowData = null;	
		String rowStatus = "";
		
		log.debug(">>>>>saveEmp is called.. listsize : " + list.size());
		
		for (int i = 0, j = list.size(); i < j; i++) {
			rowData = (HashMap) list.get(i);
			log.debug(">>>>>row Data : " + list.get(i));
			rowStatus = String.valueOf(rowData.get("ROW_STATUS"));
			rowData.put("REG_USR_ID", listData.getParameter("REG_USR_ID"));
			
			if ("I".equals(rowStatus)) {
				log.debug("InsertEmp process");
				mngEmpDaoImpl.insertEmp(rowData);
			} else if ("U".equals(rowStatus)) { 
				log.debug("updateEmp process");
				mngEmpDaoImpl.updateEmp(rowData);	
			} else if ("D".equals(rowStatus)) {
				log.debug("deleteEmp process");
				mngEmpDaoImpl.deleteEmp(rowData);
			}
		}
	}
	


}
