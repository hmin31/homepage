package com.frw.dto;

import java.util.List;
import java.util.Map;

public abstract interface IListData extends Map<Object, Object> {

	public static final String PARAM_KEY = "PARAM_MAP";
	public static final String VARIABLE_KEY = "VARIABLE_MAP";

	public abstract Map<String, Object> getDataListMap();

	public abstract List<Map<String, Object>> getDataList(String arg0);

	public abstract void setDataList(String arg0, List<Map<String, Object>> arg1);

	public abstract String getParameter(String arg0);

	public abstract void setParameterMap(Map<String, Object> arg0);

	public abstract Map<String, Object> getParameterMap();

	public abstract void setResult(String arg0);

	public abstract String getResult();

	public abstract String getLog();

	public abstract void addVariable(String arg0, String arg1);

	public abstract void setVariableMap(Map<String, Object> arg0);

	public abstract Map<String, Object> getVariableMap();

}
