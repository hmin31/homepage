package com.frw.utl;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import javax.servlet.ReadListener;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.apache.commons.io.IOUtils;

public final class RequestWrapper4JSON extends HttpServletRequestWrapper  {  
	
	private byte[] rawData;
	private HttpServletRequest request;
	private ResettableServletInputStream servletStream;
	
	public RequestWrapper4JSON(HttpServletRequest request) {
	    super(request);
	    this.request = request;
	    this.servletStream = new ResettableServletInputStream();
	}
	
	public String[] getParameterValues(String parameter) {  
		  
		String[] values = super.getParameterValues(parameter);  
	    if (values==null)  {  
	    	return null;  
	    }  
	    int count = values.length;  
	    String[] encodedValues = new String[count];  
	    for (int i = 0; i < count; i++) {  
	    	encodedValues[i] = XSSFilter.cleanString(values[i]);  
	    }    
	    return encodedValues;   
	}  
	      
    public String getParameter(String parameter) {  
    	String value = super.getParameter(parameter);  
    	if (value == null) {  
    		return null;   
    	}  
    	return XSSFilter.cleanString(value);  
    }  
      
    public String getHeader(String name) {  
        String value = super.getHeader(name);  
        if (value == null) return null;  
        return XSSFilter.cleanString(value);  
          
    } 
		
	public void resetInputStream(byte[] newRawData) {
	    servletStream.stream = new ByteArrayInputStream(newRawData);
	}
	
	@Override
	public ServletInputStream getInputStream() throws IOException {
	    if (rawData == null) {
	        rawData = IOUtils.toByteArray(this.request.getReader());
	        servletStream.stream = new ByteArrayInputStream(rawData);
	    }
	    return servletStream;
	}
	
	@Override
	public BufferedReader getReader() throws IOException {
	    if (rawData == null) {
	        rawData = IOUtils.toByteArray(this.request.getReader());
	        servletStream.stream = new ByteArrayInputStream(rawData);
	    }
	    return new BufferedReader(new InputStreamReader(servletStream, StandardCharsets.UTF_8));
	}
	
	private static class ResettableServletInputStream extends ServletInputStream {
	
	    private InputStream stream;
	
	    @Override
	    public int read() throws IOException {
	        return stream.read();
	     }

		@Override
		public boolean isFinished() {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public boolean isReady() {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public void setReadListener(ReadListener arg0) {
			// TODO Auto-generated method stub
			
		}
	}
  
   
}  
