package com.hist.content.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.frw.dao.MybatisBizDaoImpl;

@Repository("mngNtceDaoImpl")
public class MngNtceDaoImpl extends MybatisBizDaoImpl {
	
	public MngNtceDaoImpl() {
		super("mngNtce");
	}
	
	public List<?> getNtceMenu(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getNtceMenu", parameterMap);
	}
	
	public List<?> selectNtceList(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".selectNtceList", parameterMap);
	}
	
	public String getNtceDtls(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getNtceDtls", parameterMap);
	}
	
	public void insertNtceDtls(Map<?, ?> parameterMap) throws Exception {
		insert(nameSpace + ".insertNtceDtls", parameterMap);
	}
	
	public void updateNtceDtls(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".updateNtceDtls", parameterMap);
	}
	
	public void mergeNtceDtls(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".mergeNtceDtls", parameterMap);
	}
	
	public String getIsMenuCdInsertable(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getIsMenuCdInsertable", parameterMap);
	}
}
