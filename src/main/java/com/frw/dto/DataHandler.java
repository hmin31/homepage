package com.frw.dto;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

public interface DataHandler {

	public static final String PARAM_KEY = "PARAM_MAP";

	public IListData convertToIListData(HashMap<String, Object> obj, HttpServletRequest request) throws Exception;

}
