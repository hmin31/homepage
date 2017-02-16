package com.hist.main.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.frw.dao.MybatisBizDaoImpl;

/**
 * <B>@Package : </B>com.hist.main.dao<br/>
 * <B>@TypeName : </B>MngMenuDaoImpl<br/>
 * <B>@Date : </B>2017. 02. 14<br/>
 * <B>@Author : </B>hist<br/>
 * <B>Description</B>
 * <ul> 
 * <li>메뉴 관리 DAO
 * </ul>
 */
@Repository("mngMenuAuthDaoImpl")
public class MngMenuAuthDaoImpl extends MybatisBizDaoImpl {

	public MngMenuAuthDaoImpl() {
		super("mngMenuDao");
	}

	/**
	 * <B>@Method Name : getMenuCnt</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴 검색된 수 가져오기
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public String getMenuCnt(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getMenuCnt", parameterMap);
	}
	
	/**
	 * <B>@Method Name : getMenuAuthCnt</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴 권한 검색된 수 가져오기
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public String getMenuAuthCnt(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getMenuAuthCnt", parameterMap);
	}
	
	/**
	 * <B>@Method Name : getMenuList</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴 리스트 가져오기
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public List<?> getMenuList(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getMenuList", parameterMap);
	}
	
	/**
	 * <B>@Method Name : getMenuAuthList</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴 권한 리스트 가져오기
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public List<?> getMenuAuthList(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getMenuAuthList", parameterMap);
	}
	
	/**
	 * <B>@Method Name : getMenuAvail</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴  사용가능 여부(AVAIL_YN) 가져오기 , 코드가 존재하면 Y, 반대면  N
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public String getMenuAvail(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getMenuAvail", parameterMap);
	}
	
	/**
	 * <B>@Method Name : getMenuAuthAvail</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴  권한 사용가능 여부(AVAIL_YN) 가져오기 , 코드가 존재하면 Y, 반대면  N
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public String getMenuAuthAvail(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getMenuAuthAvail", parameterMap);
	}
	
	/**
	 * <B>@Method Name : insertMenu</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴 삽입
	 * </ul>
	 * @param parameterMap
	 * @throws Exception
	 */
	public void insertMenu(Map<?, ?> parameterMap) throws Exception {
		insert(nameSpace + ".insertMenu", parameterMap);
	}
	
	/**
	 * <B>@Method Name : insertMenuAuth</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴 권한 삽입
	 * </ul>
	 * @param parameterMap
	 * @throws Exception
	 */
	public void insertMenuAuth(Map<?, ?> parameterMap) throws Exception {
		insert(nameSpace + ".insertMenuAuth", parameterMap);
	}
	
	/**
	 * <B>@Method Name : updateMenu</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴 수정
	 * </ul>
	 * @param parameterMap
	 * @throws Exception
	 */
	public void updateMenu(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".updateMenu", parameterMap);
	}
	
	/**
	 * <B>@Method Name : updateMenuAuth</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴 권한 수정
	 * </ul>
	 * @param parameterMap
	 * @throws Exception
	 */
	public void updateMenuAuth(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".updateMenuAuth", parameterMap);
	}
	
	/**
	 * <B>@Method Name : delMenu</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴 삭제
	 * </ul>
	 * @param parameterMap
	 * @throws Exception
	 */
	public void delMenu(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".delMenu", parameterMap);
	}
	
	/**
	 * <B>@Method Name : delMenuAuth</B>
	 * <ul>
	 * <li>Date : 2017. 02. 14
	 * <li>Developer : hist
	 * <li>Description: 메뉴 권한 삭제
	 * </ul>
	 * @param parameterMap
	 * @throws Exception
	 */
	public void delMenuAuth(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".delMenuAuth", parameterMap);
	}
}