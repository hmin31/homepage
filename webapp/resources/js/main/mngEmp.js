app.controller('ctr_mngEmp', ['$scope', '$http', '$document', '$window', '$q', '$sce',
	function($scope, $http, $document, $window, $q, $sce) {

	var ctrUrl = 'mngEmp.do';
	
	//메뉴 등록 페이지가 호출되었을 때, 최초 호출 된다.
	$scope.getEmpList = function() {
		
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getEmpList");		//getMenuList 서비스 호출 
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);			//PARAM_MAP 추가
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "직원 목록", "N");
			setSelectedMenuList(returnData);
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	};
	
	var hshelper_masterCd;
	function setSelectedMenuList(returnData){
		
		setLowerMenuGrid("Y");
		var resultData = returnData.all_emp;
		//user_id = returnData.VARIABLE_MAP.USER_ID;
				
		hshelper_masterCd.setData(resultData);
		
	};
	
	
	//하위 메뉴 목록 그리드 설정
	function setLowerMenuGrid(use_yn_source){
		
		var hsc_ins = document.getElementById('all_emp');
		g_hsc = hsc_ins;

		//HandDataHelper용 Meta Data 설정 
		var metaData = {};
		metaData.readonlyBool 		= false;
		metaData.colHeaders 		= ["순번",	"직원번호",	"직원명",	"직원 영문명",	"사용자ID",
		                    		   "직급",	"전화",	"휴대전화",		"Fax",		"Email",
		                    		   "담당업무",	"근무상태",	"삭제사유"
		                    		   ];
		metaData.colWidths 			= [40,		80,		80,		80,		80, 
		                   			   100,		80,		80,		80,		80,
		                   			   100,		80,		80
		                   			  ]; 
		metaData.columns 			= [
		                 			   {data: "NUM",		type: "textCenter", readOnly: true},
		                 			   {data: "EMP_NUM", 	type: "textCenter", readOnly: false},
		                 			   {data: "EMP_NM",		type: "text", 		readOnly: false},
		                 			   {data: "EMP_ENG_NM",	type: "text" , 		readOnly: false},
		                 			   {data: "USR_ID",		type: "text",		readOnly: false},
		                 			   
		                 			   {data: "JOB_RK_CD",	type: "text",	readOnly: false},
		                 			   {data: "FON_NUM", 	type: "textCenter",	readOnly: true},
		                 			   {data: "MBLFON_NUM",	type: "text",	readOnly: false},
		                 			   {data: "FAX",		type: "text",	readOnly: false},
		                 			   {data: "EM",			type: "text",	readOnly: false},
		                 			   
		                 			   {data: "CTC_WRK_CTN",type: "text",	readOnly: false},
		                 			   {data: "DTY_STTS_CD",type: "text",	readOnly: false},
		                 			   {data: "DLT_CAU",	type: "text",	readOnly: false}
		                 			   ];
		metaData.heightVal			= 490;
		metaData.pkColumns			= ["EMP_NUM"]; 
		metaData.rowHeaders 		= false;
	
		var hshelper_lowerMenu;
		hshelper_lowerMenu = new HandsontableHelper(hsc_ins, metaData);
		hshelper_lowerMenu.init();
		hshelper_lowerMenu.setData();
	};
	
	
}]);