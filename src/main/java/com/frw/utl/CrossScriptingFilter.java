package com.frw.utl;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class CrossScriptingFilter implements Filter { 
	
	protected final Logger log = LoggerFactory.getLogger(CrossScriptingFilter.class);
	
	public FilterConfig filterConfig;

	@Override
    public void init(FilterConfig filterConfig) throws ServletException { 
        this.filterConfig = filterConfig; 
    } 
  
    public void destroy() { 
        this.filterConfig = null; 
    } 
  
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException { 
  
    	//HTML XSS Filter
        chain.doFilter(new RequestWrapper4Html((HttpServletRequest) request), response); 
        
        
        //JSON XSS Filter   -- JSON 에서 Filter 사용시 JSON 문법이 깨짐, JSON에 영향없는 문자열 필터링만 사용가능
//        RequestWrapper4JSON wrappedRequest = new RequestWrapper4JSON((HttpServletRequest) request);
//        String body = IOUtils.toString(wrappedRequest.getReader());
//
//        if(!"".equals(body)) {
//            JsonObject oldJsonObject = new JsonParser().parse(body).getAsJsonObject();;
//            JsonObject newJsonObject = new JsonObject();
//
//            Iterator<Entry<String, JsonElement>> it = oldJsonObject.entrySet().iterator();
//            Entry<String, JsonElement> entry;
//            while(it.hasNext()) {
//            	entry = it.next();
//            	newJsonObject.addProperty(entry.getKey(), XSSFilter.cleanString(entry.getValue()));
//            }
//            wrappedRequest.resetInputStream(newJsonObject.toString().getBytes());
//            log.debug(">>>>>>>>>>>JSON MESSAGE IS {}" ,newJsonObject.toString());
//        }
//        chain.doFilter(wrappedRequest, response);
    }
} 
