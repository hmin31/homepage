
app.controller('ctr_mngMenu', function($scope, $http, $document, $window, $q) {
	var ctrUrl = 'mngMenu.do';

	var hshelper_cd;
	
	var use_yn_source;
	var readOnlyYn;
	
	$scope.MENUL1 = [
	                 {"code" : "test"},
	                 {"code" : "test1"}
	                 
	                 ];
	
	
	
	$scope.pageInitiation = function() {
		$scope.page_cd = {};
		$scope.page_cd.currentPage = 1;
		$scope.page_cd.perPage = 20;
		$scope.page_cd.totalItems = 0;
			
	};
	
	$scope.selectCdList = function() {
		
		console.log("scope.selectedCdList is called..");
	
		var gridData = [{"MENU_ENG_NM":"Login","USE_YN":"N","MENU_KOR_NM":"로그인","UPPER_MENU_CD":"AIRBO","REG_USR_ID":"admin","MENU_CD":"BOP01","REG_DTM":"2016-10-04 14:00:00","MENU_LEVEL":1,"RNK":1},{"MENU_ENG_NM":"Main","USE_YN":"Y","MENU_KOR_NM":"메인","UPPER_MENU_CD":"AIRBO","REG_USR_ID":"admin","MENU_CD":"BOP02","REG_DTM":"2016-10-04 14:00:00","MENU_LEVEL":1,"RNK":2},{"MENU_ENG_NM":"System","USE_YN":"Y","MENU_KOR_NM":"시스템관리","UPPER_MENU_CD":"AIRBO","REG_USR_ID":"admin","MENU_CD":"BOP03","REG_DTM":"2016-10-04 14:00:00","MENU_LEVEL":1,"RNK":3}];
		hshelper_cd.init();
		hshelper_cd.setData(gridData);
	};
	
	function setCdGrid(use_yn_source){
		
		console.log("setCdGrid");

		var hsc_ins = document.getElementById('hst_cd');
		
			
		//HandDataHelper용 Meta Data 설정 
		var metaData = {};
		metaData.readonlyBool 		= readOnlyYn;
		metaData.colHeaders 		= ["No.",
		                    		   "메뉴 코드", "메뉴 한글 명", "메뉴 영문 명", "사용 여부", "상위 메뉴 코드",
		                    		   "메뉴 레벨", "메뉴 URL"];
		metaData.colWidths 			= [40,
		                   			   100, 250, 250, 80, 100,
		                   			   80, 370]; 
		metaData.columns 			= [
		                 			   {data: "RNK", type: "textCenter", readOnly:true},
		                 			   {data: "MENU_CD", type: "textCenter"},
		                 			   {data: "MENU_KOR_NM", type: "text"},
		                 			   {data: "MENU_ENG_NM", type: "text"},
		                 			   {data: "USE_YN", type: 'autocompleteCenter',
			                 				source: use_yn_source,
		                 				    strinct: false,
		                 				    filter: false,
		                 				    readOnly: false},
	                 				   {data: "UPPER_MENU_CD", type: "textCenter"},  
		                 			   {data: "MENU_LEVEL", type: "textCenter"},
	                 				   {data: "MENU_URL", type: "text"}  
		                 			   ];
		metaData.heightVal			= 490;
		metaData.rowHeaders 		= false;
		
		/*
		 * 모달 Layer
		 */
		metaData.afterOnCellMouseDownCallback = function(hsi, row, column, erow, ecolumn) {
			//sort index
			var selRow = row;
			if(hsi.sortIndex != undefined && hsi.sortIndex.length > 0) {
				if(hsi.sortIndex.length > selRow) {
					selRow = hsi.sortIndex[selRow][0];
				}
			}
			
			if(hshelper_cd.getHsGridData()[selRow].ROW_STATUS != 'I') {

				$("#modal-content,#modal-background").toggleClass("active");
				$("#modal-content,#modal-background").draggable();
				
				$scope.$apply(function() {

					$("input[name=inp_MENU_CD]").attr("readonly",true);
//					$("#delCd").hide();//메뉴권한관리용
					
					var tempValue = hshelper_cd.getHsGridData()[selRow];
//					$scope.mydisabled = true;//For ng-disabled Set 메뉴권한관리용
					$scope.layer_input = {};
					$scope.layer_input.ROW_STATUS="U";//Update
					addDataMapObj(jQuery, $scope.layer_input, tempValue);

					$scope.layer_input.USE_YN = $scope.codeSplit($scope.layer_input.USE_YN, 0);
				});
			}
		}
		
		hshelper_cd = new HandsontableHelper(hsc_ins, metaData);
		hshelper_cd.init();
		hshelper_cd.setData();
	};
	
	$scope.addCd = function() {

		$("input[name=inp_MENU_CD]").attr("readonly", false);
		
		$scope.layer_input = {};
		$scope.layer_input.ROW_STATUS="I";//Insert
		
		$("#modal-content,#modal-background").toggleClass("active");
		$("#modal-content,#modal-background").draggable();
	};
	
	$scope.saveCd = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "saveCd");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		
		var layerInputObj = [];
		layerInputObj[0] = $scope.layer_input;
		addDataObj(jQuery, dataObj, "layer_input", layerInputObj);
		
		if(fixedlengthCheck(dataObj.layer_input, 
				{MENU_CD: 5, UPPER_MENU_CD: 5}, 
				["메뉴 코드", "상위 메뉴"])) return;
		if(lengthCheck(dataObj.layer_input, 
				{MENU_KOR_NM: 50, MENU_ENG_NM: 50, MENU_URL: 500},
				["메뉴 한글 명", "메뉴 영문 명", "메뉴 URL"])) return;
		if(mandantoryColumnCheck(dataObj.layer_input, 
				["MENU_CD", "UPPER_MENU_CD", "USE_YN", "MENU_LEVEL", "MENU_KOR_NM"], 
				["메뉴 코드", "상위 메뉴", "사용 여부", "메뉴 레벨", "메뉴 한글 명"])) return;
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "저장", "Y");
			$("#modal-content, #modal-background").toggleClass("active");
			$scope.selectCdList();
		};
		
		bootbox.confirm({
			message:"해당 메뉴를 저장 하시겠습니까? <br /><br /> " +
			"※ 주의 : 해당 메뉴가 백오피스 화면에 노출됩니다.", 
			callback: function(result){ 
					if(result == false) {return;} 
					else{
						commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
					}
				}
		});

	};
	
	$scope.delCd = function() {

		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "delCd");
		addDataObj(jQuery, paramDataObj, "MENU_CD", MENU_CD);
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		
		var afterSuccessFunc = function(returnData) {
//			exceptionHandler(returnData.RESULT, returnData.VARIABLE_MAP.delCnt + "건 삭제", "Y");
			$scope.selectCdList();
		};
		
		bootbox.confirm({
			message:"해당 메뉴를 삭제하시겠습니까? <br /><br /> " +
			"※ 주의 : 해당 메뉴가 영구 삭제됩니다.", 
			callback: function(result){ 
					if(result == false) {return;} 
					else{
						commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
					}
				}
		});
		
	};
	
	$("#modal-background, #modal-close, #modal-close2").click(function () {
		$("#modal-content,#modal-background").toggleClass("active");
	});
	
	/**
	 * <ul>
	 * <li>2016.10.13</li>
	 * <li>ckim</li>
	 * <li>function name: CdtoNmOfGridData</li>
	 * <li>function description: 그리드 데이터를 기존에 불러온 selectedCmbs의 Name으로 변환</li>
	 * </ul>
	 * 
	 * @param obj
	 * @return: obj
	 */
	function cdToNmOfGridData(obj)
	{
//		alert(obj.length);
		for (i=0; i< obj.length; i++){
			for (var key in obj[i]){
				if(key =='USE_YN'){
					for (j=0; j< $scope.USE_YN.length; j++){
						var tmpStr = $scope.USE_YN[j].toString();
						if(obj[i][key] == tmpStr.split(":")[0]){
//							alert(key + " --- " + obj[i][key] + " --- "+ $scope.GDS_FLAG[j]);
							obj[i][key] = tmpStr;
						}
					}
				}//if(key =='NTCE_YN'){
			}//for (var key in obj[i]){
		}//for (i=0; i< obj.length; i++){
		
		return obj;
	};
	
	/**
	 * <ul>
	 * <li>2016.09.29</li>
	 * <li>ckim</li>
	 * <li>function name: setSelectedCmbs</li>
	 * <li>function description: 건색조건을 selectbox로 만들어준다</li>
	 * </ul>
	 */
	$scope.getSelectedCmbs = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getSelectedCmbs");
		
		addDataObj(jQuery, paramDataObj, "A07", "A07");
		addDataObj(jQuery, paramDataObj, "MENUL1", "MENUL1");
		
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);

		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "getSelectedCmbs", "N");
			setSelectedCmbs(returnData);
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	};
	
	/**
	 * <ul>
	 * <li>2016.09.29</li>
	 * <li>ckim</li>
	 * <li>function name: setSelectedCmbs</li>
	 * <li>function description: 건색조건을 selectbox로 만들어준다</li>
	 * </ul>
	 * 
	 * @param returnData
	 * @return: none
	 */
	function setSelectedCmbs(returnData){

		var MENUL1Arr = [];//MENU 콘텐츠 관리 타입  
		var A07Arr = [];//A07 사용여부  
		var B03Arr = [];//B03 사용여부  
		
		MENUL1Arr = makeObjToJsonArr(returnData.MENUL1, MENUL1Arr);
		A07Arr = makeObjToJsonArr(returnData.A07, A07Arr);
		B03Arr = makeObjToJsonArr(returnData.B03, B03Arr);
		
		$scope.MENUL1 = MENUL1Arr;
		$scope.A07 = A07Arr;
//		$scope.B03 = B03Arr;
		
//		$scope.GRP_AUTH_CD = returnData.B03;
		$scope.USE_YN = returnData.A07;
		
		//권한에 따른 입력 및 저장버튼 컨트롤
		readOnlyYn = !(authHandling(returnData));
		
		setCdGrid(returnData.A07);
	};
	
	$scope.modalModelInit = function() {
		$scope.layer_input = {
			MENU_CD:""
			,MENU_KOR_NM:""
			,MENU_ENG_NM:""
			,USE_YN:""
			,UPPER_MENU_CD:""
			,MENU_LEVEL:""
			,MENU_URL:""
		    ,REG_USR_ID:""
			,REG_DTM:""		
			,UPD_USR_ID:""
			,UPD_DTM:""
			,RNK:""
			,ROW_STATUS:""
			,uid:""
		};
		
	};
	
	$scope.codeSplit = function(codeValue, idx) {
		var tmpRet = "";
		if (codeValue != undefined && codeValue != null) {
			tmpRet = codeValue.split(":")[idx];
		}
		return tmpRet;
	};
	
	$document.ready(function() {
		
		setCdGrid("Y");
		$scope.selectCdList();
		
/*		
		$scope.pageInitiation();
 		
 		$scope.modalModelInit();
 		
		$scope.getSelectedCmbs();*/
		
	});
});
