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
 * <li>메뉴 DAO
 * </ul>
 */
@Repository("menuDaoImpl")
public class MenuDaoImpl extends MybatisBizDaoImpl {
	
	public MenuDaoImpl() {
		super("menuDao");
	}
	
	/**
	 * <B>@Method Name : getMenu</B>
	 * <ul>
	 * <li>Date : 2016. 12. 16.
	 * <li>Developer : ckim
	 * <li>Description: 사용중인 모든 메뉴 리스트를 가져온다.
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public List<?> getMenu(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getMenu", parameterMap);
	}
	
	/**
	 * <B>@Method Name : getMenuLv2</B>
	 * <ul>
	 * <li>Date : 2016. 12. 16.
	 * <li>Developer : ckim
	 * <li>Description: 사용중인 하위 메뉴 리스트를 가져온다.
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public List<?> getMenuLv2(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getMenuLv2", parameterMap);
	}
	
	/**
	 * <B>@Method Name : getMenuLv1</B>
	 * <ul>
	 * <li>Date : 2016. 12. 16.
	 * <li>Developer : ckim
	 * <li>Description: 사용중인 상위 메뉴 리스트를 가져온다.
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public List<?> getMenuLv1(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getMenuLv1", parameterMap);
	}
	
	/**
	 * <B>History</B>
	 * <ul>
	 * <li>Date : 2016. 11. 28.
	 * <li>Developer : hist
	 * <li>메뉴에 할당된 권한을 가져온다
	 * </ul>
	 *  
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public String getMenuPermission(Map<?, ?> parameterMap)  {
		return queryForStr(nameSpace + ".getMenuPermission", parameterMap);
	}
	
}
