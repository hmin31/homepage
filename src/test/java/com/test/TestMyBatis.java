package com.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.frw.dto.IListData;
import com.hist.main.svc.TestSvcImpl;

import junit.framework.TestCase;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/config/*config.xml" })
public class TestMyBatis extends TestCase {

	@Test
	@SuppressWarnings("resource")
	public void testCase() throws Exception {
		ApplicationContext context = new ClassPathXmlApplicationContext("config/*-config.xml");

		TestSvcImpl testSvcImpl = (TestSvcImpl) context.getBean("testSvcImpl");
		IListData returnList = testSvcImpl.getSelectTest(null);
		assertNotNull(returnList);
	}

	@Test
	@SuppressWarnings("resource")
	public void testCaseOfService() {
		ApplicationContext context = new ClassPathXmlApplicationContext("config/*-config.xml");
		TestSvcImpl testSvcImpl = (TestSvcImpl) context.getBean("testSvcImpl");
		
		String inputStr = "AAA";
		assertEquals(inputStr, testSvcImpl.getTextInConsole(inputStr));
	}
	
}
