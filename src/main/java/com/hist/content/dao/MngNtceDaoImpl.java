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
	
	public String selectNtceCnt(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".selectNtceCnt", parameterMap);
	}
	
	public void insertNtce(Map<?, ?> parameterMap) throws Exception {
		insert(nameSpace + ".insertNtce", parameterMap);
	}
	
	public void updateNtce(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".updateNtce", parameterMap);
	}
	
	public void deleteNtce(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".deleteNtce", parameterMap);
	}
}
