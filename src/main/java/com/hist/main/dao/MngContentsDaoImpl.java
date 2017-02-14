package com.hist.main.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.frw.dao.MybatisBizDaoImpl;

@Repository("mngContentsDaoImpl")
public class MngContentsDaoImpl extends MybatisBizDaoImpl {
	
	public MngContentsDaoImpl() {
		super("mngContents");
	}
	
	public List<?> getSelectTest(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getSelectTest", parameterMap);
	}
}
