package com.frw.dto;

public class UserInfo implements java.io.Serializable {

	private static final long serialVersionUID = -484594251504809188L;
	
	private String userId 		= "";
	private String grpAuthCd	= "";
	
	private String usrNm		= "";
	private String agtCd		= "";
	private String deptNm		= "";
	private String posiNm		= "";
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getGrpAuthCd() {
		return grpAuthCd;
	}

	public void setGrpAuthCd(String grpAuthCd) {
		this.grpAuthCd = grpAuthCd;
	}

	public UserInfo() {
		super();
	}

	public String getUsrNm() {
		return usrNm;
	}

	public void setUsrNm(String usrNm) {
		this.usrNm = usrNm;
	}

	public String getAgtCd() {
		return agtCd;
	}

	public void setAgtCd(String agtCd) {
		this.agtCd = agtCd;
	}

	public String getDeptNm() {
		return deptNm;
	}

	public void setDeptNm(String deptNm) {
		this.deptNm = deptNm;
	}

	public String getPosiNm() {
		return posiNm;
	}

	public void setPosiNm(String posiNm) {
		this.posiNm = posiNm;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
