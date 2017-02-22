package com.hist.sys.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.frw.dao.MybatisBizDaoImpl;

/**
 * <B>@Package : </B>skt.tmall.air.bof.sys.dao<br/>
 * <B>@TypeName : </B>BasisCdDaoImpl<br/>
 * <B>@Date : </B>2016. 12. 16.<br/>
 * <B>@Author : </B>ckim<br/>
 * <B>Description</B>
 * <ul> 
 * <li>기초코드 DAO.
 * </ul>
 */
@Repository("basisCdDaoImpl")
public class BasisCdDaoImpl extends MybatisBizDaoImpl {

	public BasisCdDaoImpl() {
		super("basisCdDao");
	}

	/**
	 * <B>@Method Name : getCdCtgrzList</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 코드 분류 가져오기
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public List<?> getCdCtgrzList(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getCdCtgrzList", parameterMap);
	}
	
	/**
	 * <B>@Method Name : getCdCtgrzListCnt</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 코드 분류 리스트 검색된 수 가져오기
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public String getCdCtgrzCnt(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getCdCtgrzCnt", parameterMap);
	}
	
	/**
	 * <B>@Method Name : getCdList</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 코드 리스트 가져오기
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public List<?> getCdList(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getCdList", parameterMap);
	}
	
	/**
	 * <B>@Method Name : getCdListCnt</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 코드 리스트 검색된 수 가져오기
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public String getCdCnt(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getCdCnt", parameterMap);
	}
	
	
	/**
	 * <B>@Method Name : getMasterCdAvail</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 마스터코드 사용가능 여부(AVAIL_YN) 가져오기 , 코드가 존재하면 Y, 반대면  N
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public String getCdCtgrzAvail(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getCdCtgrzAvail", parameterMap);
	}
	
	/**
	 * <B>@Method Name : insertMasterCd</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 코드 분류 삽입
	 * </ul>
	 * @param parameterMap
	 * @throws Exception
	 */
	public void insertCdCtgrz(Map<?, ?> parameterMap) throws Exception {
		insert(nameSpace + ".insertCdCtgrz", parameterMap);
	}
	
	/**
	 * <B>@Method Name : updateMasterCdAvailYn</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 코드 분류 수정
	 * </ul>
	 * @param parameterMap
	 * @throws Exception
	 */
	public void updateCdCtgrz(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".updateCdCtgrz", parameterMap);
	}
	
	/**
	 * <B>@Method Name : getDetailCdAvail</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 코드 사용가능 여부(AVAIL_YN) 가져오기 , 코드가 존재하면 Y, 반대면  N (키 값 체크)
	 * </ul>
	 * @param parameterMap
	 * @return
	 * @throws Exception
	 */
	public String getCdAvail(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getCdAvail", parameterMap);
	}
	
	/**
	 * <B>@Method Name : insertDetailCd</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 코드 삽입
	 * </ul>
	 * @param parameterMap
	 * @throws Exception
	 */
	public void insertCd(Map<?, ?> parameterMap) throws Exception {
		insert(nameSpace + ".insertCd", parameterMap);
	}
	
	/**
	 * <B>@Method Name : updateDetailCdAvailYn</B>
	 * <ul>
	 * <li>Date : 2017. 2. 18.
	 * <li>Developer : jjw
	 * <li>Description: 코드 수정
	 * </ul>
	 * @param parameterMap
	 * @throws Exception
	 */
	public void updateCd(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".updateCd", parameterMap);
	}

	public void deleteCd(Map<?, ?> parameterMap) throws Exception {
		// TODO Auto-generated method stub
		delete(nameSpace + ".deleteCd", parameterMap);
	}

	
}
