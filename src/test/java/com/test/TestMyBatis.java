package com.test;

import java.util.List;

import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hist.main.dao.TestDaoImpl;

import junit.framework.TestCase;

@RunWith(SpringJUnit4ClassRunner.class) 
@ContextConfiguration(locations={"file:config/*-config.xml"})
public class TestMyBatis extends TestCase {
	
	public void testCase() throws Exception{
		//assertEquals(1, 1);
		
		ApplicationContext context = new ClassPathXmlApplicationContext("config/*-config.xml");
		
		TestDaoImpl testDaoImpl = (TestDaoImpl) context.getBean("testDaoImpl");
		List returnList = testDaoImpl.getSelectTest(null);
		
		assertNotNull(returnList);
	}
}
