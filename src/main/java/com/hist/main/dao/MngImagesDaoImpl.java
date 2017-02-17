package com.hist.main.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.frw.dao.MybatisBizDaoImpl;

@Repository("mngImagesDaoImpl")
public class MngImagesDaoImpl extends MybatisBizDaoImpl {

	public MngImagesDaoImpl() {
		super("mngImages");
	}

	public void insertImages(Map<?, ?> parameterMap) throws Exception {
		insert(nameSpace + ".insertImages", parameterMap);
	}

	public Map<String, Object> getImageBlob(Map<?, ?> parameterMap) {
		return query.selectOne(nameSpace + ".getImageBlob", parameterMap);
	}

	public List<?> getImageList(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getImageList", parameterMap);
	}
	
}
