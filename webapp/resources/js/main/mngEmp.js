app.controller('ctr_mngEmp', ['$scope', '$http', '$document', '$window', '$q', '$sce',
	function($scope, $http, $document, $window, $q, $sce) {

	var ctrUrl = '/mngEmp.do';
	var hshelper_emp;
	var userId;
	
	$document.ready(function() {
		
		setEmpGrid();
		
	});
	
	//직원 목록 그리드 설정
	function setEmpGrid(){

		var hsc_ins = document.getElementById('empList');

		//HandDataHelper용 Meta Data 설정 
		var metaData = {};
		metaData.readonlyBool 		= false;
		metaData.colHeaders 		= ["순번",	"*직원번호",	"직원명",	"직원 영문명",	"*사용자ID",
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
		                 			   {data: "JOB_RK_CD",	type: "text",		readOnly: false},
		                 			   {data: "FON_NUM", 	type: "textCenter",	readOnly: false},
		                 			   {data: "MBLFON_NUM",	type: "text",		readOnly: false},
		                 			   {data: "FAX",		type: "text",		readOnly: false},
		                 			   {data: "EM",			type: "text",		readOnly: false},
		                 			   {data: "CTC_WRK_CTN",type: "text",		readOnly: false},
		                 			   {data: "DTY_STTS_CD",type: "text",		readOnly: false},
		                 			   {data: "DLT_CAU",	type: "text",		readOnly: false}
		                 			   ];
		metaData.heightVal			= 490;
		metaData.pkColumns			= ["EMP_NUM"]; 
		metaData.rowHeaders 		= false;
	
		
		hshelper_emp = new HandsontableHelper(hsc_ins, metaData);
		hshelper_emp.init();
		hshelper_emp.setData();
	};
	
	//조회
	$scope.getEmpList = function() {
		
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getEmpList");		//getMenuList 서비스 호출 
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);			//PARAM_MAP 추가
		
		var afterSuccessFunc = function(returnData) {
			
			user_id = returnData.VARIABLE_MAP.USER_ID;
			
			exceptionHandler(returnData.RESULT, "", "N");
			hshelper_emp.setData(returnData.all_main_emp);
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	};
	
	//행 추가 
	$scope.addEmp = function() {

		//메뉴 레벨 체크 
		var addRow = hshelper_emp.addData(
				{DLT_YN:'N', RGST_EMP_NUM:user_id, USE_YN:'Y'}, true);
		
		hshelper_emp.selectCell(addRow, 1);
	}
	
	//행 삭제 
	$scope.delEmp = function() {

		if (hshelper_emp == undefined) {
			bootbox.alert("삭제할 테이블이 없습니다.");
			return false;
		}
		
		//행 선택되지 않은경우 어떻게 처리할것인가??
		
		var delRow = hshelper_emp.delrow();
		console.log("delRow : " + delRow);
		//hshelper_emp.selectCell(delRow);
	}
	
	//행 저장 
	$scope.saveEmp = function() {

		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "saveEmp");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		addDataObj(jQuery, dataObj, "ds_emp", hshelper_emp.getHsChgData());
		
		console.log("change Data : " + hshelper_emp.getHsChgData());
		
		if(lengthCheck(dataObj.ds_emp, 
				{
				  EMP_NUM:8
				 ,EMP_NM:30
				 ,EMP_ENG_NM:30
				 ,USR_ID:10
				 ,JOB_RK_CD:6
				 ,FON_NUM:30
				 ,MBLFON_NUM:30
				 ,FAX:30
				 ,EM:60
				 ,CTC_WRK_CTN:100
				 ,DTY_STTS_CD:6
				 ,DLT_CAU:100
				},
				[  "직원번호"
				  ,"직원명"
				  ,"직원영문 명"
				  ,"사용자ID"
				  ,"직급코드"
				  ,"전화번호"
				  ,"휴대전화번호"
				  ,"Fax"
				  ,"Email"
				  ,"담당업무내용"
				  ,"근무상태코드"
				  ,"삭제사유"])) {
			return;
		}
		
		if(mandantoryColumnCheck(dataObj.ds_emp,
				["EMP_NUM", "USR_ID"], 
				["직원번호", "사용자ID"])){
			
			//console.log("Validation Failed");
		
			return;
		}
		if(alphabetNumCheck(dataObj.ds_emp, 
				["USR_ID"], ["사용자ID"])) return;
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "직원정보 저장", "N");
			//저장후 재 조회를 어떤식으로 할것인가.. 
			if(returnData.RESULT.ERRORCODE == "0") {
				//우선 메뉴 전체 목록을 가져오는 방법으로..
				$scope.getEmpList();
			}
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
}]);