package com.hist.cmm.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.frw.dao.MybatisBizDaoImpl;

/**
 * <B>@Package : </B>skt.tmall.air.bof.main.dao<br/>
 * <B>@TypeName : </B>MngMenuDaoImpl<br/>
 * <B>@Date : </B>2016. 12. 16.<br/>
 * <B>@Author : </B>ckim<br/>
 * <B>Description</B>
 * <ul> 
 * <li>硫?? 愿?━ DAO
 * </ul>
 */
@Repository("mngMenuDaoImpl")
public class MngMenuDaoImpl extends MybatisBizDaoImpl {

	public MngMenuDaoImpl() {
		super("mngMenuDao");
	}

	public String getMenuCnt(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getMenuCnt", parameterMap);
	}
	
	public String getMenuAuthCnt(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getMenuAuthCnt", parameterMap);
	}
	public List<?> getMenuList(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getMenuList", parameterMap);
	}

	//20170213 - JJW - 하위 메뉴를 가져온다.
	public List<?> getLowerMenuList(Map<?, ?> parameterMap) throws Exception{
		// TODO Auto-generated method stub
		return queryForList(nameSpace + ".getLowerMenuList", parameterMap);
	}
	//20170213 - JJW - 하위 메뉴 저장한다.
	public void insertLowerMenu(Map<?, ?> parameterMap) throws Exception{
		// TODO Auto-generated method stub
		insert(nameSpace + ".insertLowerMenu", parameterMap);
	}
	//20170213 - JJW - 하위 메뉴 수정한다.
	public void updateLowerMenu(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".updateLowerMenu", parameterMap);
	}
	//20170213 - JJW - 하위 메뉴 삭제한다.
	public void deleteLowerMenu(Map<?, ?> parameterMap) throws Exception{
		// TODO Auto-generated method stub
		delete(nameSpace + ".deleteLowerMenu", parameterMap);
	}
	
}
