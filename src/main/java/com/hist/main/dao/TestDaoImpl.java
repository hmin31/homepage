package com.hist.main.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.frw.dao.MybatisBizDaoImpl;

@Repository("testDaoImpl")
public class TestDaoImpl extends MybatisBizDaoImpl {
	
	public TestDaoImpl() {
		super("testDao");
	}
	
	public List<?> getSelectTest(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getSelectTest", parameterMap);
	}
}
