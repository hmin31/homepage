package com.hist.main.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.frw.dao.MybatisBizDaoImpl;

@Repository("frontPageDaoImpl")
public class FrontPageDaoImpl extends MybatisBizDaoImpl {

	public FrontPageDaoImpl() {
		super("frontPage");
	}

	public List<?> getMenuList(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getMenuList", parameterMap);
	}
	
}
