package com.frw.utl;

import org.apache.commons.lang3.StringEscapeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class XSSFilter {

	final static Logger log = LoggerFactory.getLogger(XSSFilter.class);
	
	public static String cleanHTMLXSS(String value) {  
		
//		log.debug(">>>>>> Before XSS Filter : {}" ,value);
		String resultString = StringEscapeUtils.escapeHtml4(value); 
//		log.debug(">>>>>> Before XSS Filter : {}" ,resultString);

        return resultString;  
    }
	
	public static String cleanString(String value) {  
		
		//XSS Replace Sample
		String resultString = value;
		resultString = resultString.replaceAll("<", "&lt;").replaceAll(">", "&gt;");  
		resultString = resultString.replaceAll("\\(", "&#40;").replaceAll("\\)", "&#41;");  
		resultString = resultString.replaceAll("'", "&#39;");            
		resultString = resultString.replaceAll("eval\\((.*)\\)", "");  
		resultString = resultString.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");  
		resultString = resultString.replaceAll("script", "");  
		
        return resultString;  
    }  
}
