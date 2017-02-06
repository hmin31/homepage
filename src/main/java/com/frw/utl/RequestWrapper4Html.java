package com.frw.utl;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

public final class RequestWrapper4Html extends HttpServletRequestWrapper  {  
	
    
    public RequestWrapper4Html(HttpServletRequest servletRequest) throws IOException {  
        super(servletRequest);  
    }  
    
    public String[] getParameterValues(String parameter) {  
    	String[] encodedValues = null;
    	String[] values = super.getParameterValues(parameter);  

    	if(values != null) {
    		encodedValues = new String[values.length];  
    		for (int i=0,j=values.length ; i < j ; i++) {  
    			encodedValues[i] = XSSFilter.cleanHTMLXSS(values[i]);  
    		}    
    	}
    	return encodedValues;   
    }  
      
    public String getParameter(String parameter) {  
    	String value = super.getParameter(parameter);  
    	return (value != null ? XSSFilter.cleanHTMLXSS(value) : null);
    }  
      
    public String getHeader(String name) {  
        String value = super.getHeader(name);  
        return (value != null ? XSSFilter.cleanHTMLXSS(value) : null);  
    }  
}  
