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
	
	public String getSubTitleMenuCd(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getSubTitleMenuCd", parameterMap);
	}
	
	public List<?> getMenuCotain(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getMenuCotain", parameterMap);
	}
	
	public List<?> getContentsDtlsHstList(Map<?, ?> parameterMap) throws Exception {
		return queryForList(nameSpace + ".getContentsDtlsHstList", parameterMap);
	}
	
	public void insertContentsDtls(Map<?, ?> parameterMap) throws Exception {
		insert(nameSpace + ".insertContentsDtls", parameterMap);
	}
	
	public String getContentsDtlsHst(Map<?, ?> parameterMap) throws Exception {
		return queryForStr(nameSpace + ".getContentsDtlsHst", parameterMap);
	}
	
	public void insertContentsDtlsHst(Map<?, ?> parameterMap) throws Exception {
		insert(nameSpace + ".insertContentsDtlsHst", parameterMap);
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
