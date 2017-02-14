package com.hist.cmm.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.frw.dao.MybatisBizDaoImpl;

/**
 * <B>@Package : </B>skt.tmall.air.bof.cmm.dao<br/>
 * <B>@TypeName : </B>MenuDaoImpl<br/>
 * <B>@Date : </B>2016. 12. 16.<br/>
 * <B>@Author : </B>ckim<br/>
 * <B>Description</B>
 * <ul> 
 * <li>硫�� DAO
 * </ul>
 */
@Repository("menuDaoImpl")
public class MenuDaoImpl extends MybatisBizDaoImpl {
	
	public MenuDaoImpl() {
		super("menuDao");
	}
	

	public List getMenuSeq10(Map<?, ?> parameterMap) throws Exception {
		// TODO Auto-generated method stub
		return queryForList(nameSpace + ".getMenuSeq10", parameterMap);
	}
	
	public List getMenuSeq20(Map<?, ?> parameterMap) throws Exception {
		// TODO Auto-generated method stub
		return queryForList(nameSpace + ".getMenuSeq20", parameterMap);
	}
	
	public List getMenuSeq30(Map<?, ?> parameterMap) throws Exception {
		// TODO Auto-generated method stub
		return queryForList(nameSpace + ".getMenuSeq30", parameterMap);
	}
	
}
