package com.hist.cmm.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.frw.dao.MybatisBizDaoImpl;

/**
 * <B>@Package : </B>com.hist.cmm.dao<br/>
 * <B>@TypeName : </B>MngEmpDaoImpl<br/>
 * <B>@Date : </B>2016. 2. 16.<br/>
 * <B>@Author : </B>eungsik<br/>
 * <B>Description</B>
 * <ul> 
 * <li>
 * </ul>
 */
@Repository("mngEmpDaoImpl")
public class MngEmpDaoImpl extends MybatisBizDaoImpl {

	public MngEmpDaoImpl() {
		super("mngEmpDao");
	}

	public String getEmpInfoCnt(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getEmpInfoCnt", parameterMap);
	}
	
	public List<?> getEmpList(Map<?, ?> parameterMap) throws Exception{
		return queryForList(nameSpace + ".getEmpList", parameterMap);
	}
	public void insertEmp(Map<?, ?> parameterMap) throws Exception{
		insert(nameSpace + ".insertEmp", parameterMap);
	}
	public void updateEmp(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".updateEmp", parameterMap);
	}
	public void deleteEmp(Map<?, ?> parameterMap) throws Exception{
		delete(nameSpace + ".deleteEmp", parameterMap);
	}
	
}
