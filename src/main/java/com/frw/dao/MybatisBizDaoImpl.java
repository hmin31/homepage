package com.frw.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class MybatisBizDaoImpl implements BizDao {

	protected Logger log = LoggerFactory.getLogger(MybatisBizDaoImpl.class);

	protected final String nameSpace;
	protected String statementSelect;
	protected String statementInsert;
	protected String statementUpdate;
	protected String statementDelete;

	@Autowired
	protected SqlSession query;

	public MybatisBizDaoImpl() {
		super();
		this.nameSpace = "";
	}

	public MybatisBizDaoImpl(String nameSpace) {
		super();
		this.nameSpace = nameSpace;
		this.statementSelect = stmt("select");
		this.statementInsert = stmt("insert");
		this.statementUpdate = stmt("update");
		this.statementDelete = stmt("delete");
	}

	protected String stmt(String name) {
		return this.nameSpace + "." + name;
	}

	public List<?> queryForList(String sqlId, Map<?, ?> rowData) throws Exception {
		log.info(">>>>> QUERY_FOR_LIST::: " + sqlId);
		return query.selectList(sqlId, rowData);
	}

	public Map<?, ?> queryForMap(String sqlId, Map<?, ?> rowData, String mapKey) throws Exception {
		log.info(">>>>> QUERY_FOR_MAP::: " + sqlId);
		return query.selectMap(sqlId, rowData, mapKey);
	}

	public String queryForStr(String sqlId, Map<?, ?> rowData)  {
		log.info(">>>>> QUERY_FOR_STR::: " + sqlId);
		return (String) query.selectOne(sqlId, rowData);
	}

	public int queryForInt(String sqlId, Map<?, ?> rowData) throws Exception {
		log.info(">>>>> QUERY_FOR_INT::: " + sqlId);
		Integer intVal = (Integer) query.selectOne(sqlId, rowData);
		return intVal.intValue();
	}

	public int insert(String sqlId, Map<?, ?> rowData) throws Exception {
		log.info(">>>>> QUERY_FOR_INSERT::: " + sqlId);
		return query.insert(sqlId, rowData);
	}

	public int update(String sqlId, Map<?, ?> rowData) throws Exception {
		log.info(">>>>> QUERY_FOR_UPDATE::: " + sqlId);
		return query.update(sqlId, rowData);
	}

	public int delete(String sqlId, Map<?, ?> rowData) throws Exception {
		log.info(">>>>> QUERY_FOR_DELETE::: " + sqlId);
		return query.delete(sqlId, rowData);
	}

}
