package com.frw.utl;

import java.nio.charset.StandardCharsets;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import com.frw.svc.BizServiceImpl;

@Service("aPIkeyHandler")
public class APIkeyHandler extends BizServiceImpl {

	public String getRandomString(int keyLength) {
		return RandomStringUtils.randomAlphanumeric(keyLength);
	}

	public String getBase64EncodedValue(String id, String password) {
		return Base64.encodeBase64String((id + ":" + password).getBytes(StandardCharsets.UTF_8));
	} 

}
