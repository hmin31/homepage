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
	
	public List<?> getContentsMenu(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getContentsMenu", parameterMap);
	}
	
	public String getContentsDtls(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getContentsDtls", parameterMap);
	}
	
	public void insertContentsDtls(Map<?, ?> parameterMap) throws Exception {
		insert(nameSpace + ".insertContentsDtls", parameterMap);
	}
	
	public void updateContentsDtls(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".updateContentsDtls", parameterMap);
	}
	
	public void mergeContentsDtls(Map<?, ?> parameterMap) throws Exception {
		update(nameSpace + ".mergeContentsDtls", parameterMap);
	}
	
	public String getIsMenuCdInsertable(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getIsMenuCdInsertable", parameterMap);
	}
	
}
