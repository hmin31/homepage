package com.hist.cmm.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.frw.dao.MybatisBizDaoImpl;

/**
 * <B>@Package : </B>skt.tmall.air.bof.agt.dao<br/>
 * <B>@TypeName : </B>MainDaoImpl<br/>
 * <B>@Date : </B>2017. 02. 12<br/>
 * <B>@Author : </B>hist<br/>
 * <B>Description</B>
 * <ul> 
 * <li>메인화면 DAO
 * </ul>
 */
@Repository("mainDaoImpl")
public class MainDaoImpl extends MybatisBizDaoImpl {

	public MainDaoImpl() {
		super("mainDao");
	}
	
	/**
	 * <B>@Method Name : getUsrInfo</B>
	 * <ul>
	 * <li>Date : 2017. 02. 12
	 * <li>Developer : hist
	 * <li>Description: 
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public List<?> getUsrInfo(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getUsrInfo", parameterMap);
	}

	/**
	 * <B>@Method Name : updateAcnt</B>
	 * <ul>
	 * <li>Date : 2017. 02. 12
	 * <li>Developer : hist
	 * <li>Description: 계정 수정
	 * </ul>
	 * @param parameterMap
	 * @throws Exception
	 */
	public void updateAcnt(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".updateAcnt", parameterMap);
	}

}
