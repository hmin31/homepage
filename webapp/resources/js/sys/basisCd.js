
app.controller('ctr_basisCd', function($scope, $http, $document, $window, $q) {
	
	var ctrUrl = '/basisCd.do';
	
	var hshelper_CdCtgrz;
	var hshelper_cd; 
	
	var use_yn_source;//A07
	
	var current_mastr_cd;//For detail_cd pagenation
	var readOnlyYn;
	
	$scope.pageInitiation = function() {
		//page code initiation
		console.log(">>>>>PageInit");
		$scope.page_CdCtgrz = {};
		$scope.page_CdCtgrz.currentPage = 1;
		$scope.page_CdCtgrz.perPage = 20;
		$scope.page_CdCtgrz.totalItems = 0;
		
		
		$scope.page_Cd = {};
		$scope.page_Cd.currentPage = 1;
		$scope.page_Cd.perPage = 20;
		$scope.page_Cd.totalItems = 0;
	}
	
	//Search Button 클릭시
	$scope.selectCdCtgrzList = function() {
		$scope.page_CdCtgrz.currentPage = 1; 
		$scope.page_Cd.currentPage = 1;
		
		console.log(">>>>>>>>>>>>>>>>>selectCdCtgrzList called");
		var dataObj = {};
		var paramDataObj = {};
		
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getCdCtgrzList");
		
		
		
		addDataObj(jQuery, paramDataObj, "searchCdCtgrz", $scope.input_CdCtgrz)
		
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "마스터코드", "N");

			var gridData = returnData.cdCtgrz_do;
			
			hshelper_CdCtgrz.setData(gridData);
			
			$scope.page_CdCtgrz.totalItems = returnData.VARIABLE_MAP.cdCtgrzCnt;
			
			if(returnData.VARIABLE_MAP.cdCtgrzCnt > 0){
				console.log(">>>>>>>>CdCtgrzCnt > 0 <<<<<<<<<<");
				hshelper_CdCtgrz.selectCell(0, 1);
				
			}else{
			/*	$scope.page_Cd.totalItems = 0;
				hshelper_cd.init();
				hshelper_cd.setData();*/
			}
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	
	//조건에 따라 코드 분류 리스트를 가져온다.  
	/*$scope.selectCdCtgrzList = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getCdCtgrzList");		//코드 분류 리스트를 가져온다.
		
		addDataObj(jQuery, paramDataObj, "searchCdCtgrz", $scope.input_CdCtgrz);
		
		
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);

		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "마스터코드", "N");
			
			var gridData= cdToNmOfGridData(returnData.do_masterCd);//Cd를 Name형식으로 변환
				
			var gridData = returnData.cdCtgrz_do;
			
			hshelper_CdCtgrz.setData(gridData);
			
			$scope.page_CdCtgrz.totalItems = returnData.VARIABLE_MAP.masterCnt;
			
			hshelper_CdCtgrz.selectCell(0, 1);
			
			//current_mastr_cd = returnData.do_masterCd[0].MASTR_CD;
			//$scope.selectDetailBasisCdList(current_mastr_cd);
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}*/
	
	$scope.selectCdList = function(cdCtgrz) {
		
		if(typeof(cdCtgrz)=='undefined') {
			cdCtgrz = $scope.input_cdCtgrz;
		}
		/**
		 * 161102
		 * For detail_cd pagenation
		 */
		if(typeof(cdCtgrz)=='undefined') {
			cdCtgrz = current_cdCtgrz;
		}
		
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getCdList");
		
		addDataObj(jQuery, paramDataObj, "searchCdCtgrz", cdCtgrz);
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "마스터코드", "N");
			
			var gridData= cdToNmOfGridData(returnData.do_detailCd);//Cd를 Name형식으로 변환
			hshelper_cd.setData(returnData.do_detailCd);
			$scope.page_Cd.totalItems = returnData.VARIABLE_MAP.detailCnt;
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	//코드 분류 그리드 설정  setCdCtgrzGrid -> setCdCtgrzGrid
	function setCdCtgrzGrid(use_yn_source){
		var do_codeObj = {};

		var hsc_ins = document.getElementById('hst_masterCd');
		
		var metaData = {};
		metaData.readonlyBool 		= false;
		metaData.colHeaders 		= ["No.",		"코드분류*",		"한글명*",	"영문명", "한글약어",
		                    		   "영문약어",	"사용여부*"];
		metaData.colWidths 			= [40, 		80, 	80,		80,		80,
		                   			   80,		80];
		metaData.columns 			= [
			   						   {data: "RNK",			type: "textCenter", readOnly: true},
		                 			   {data: "CD_CTGRZ",	 	type: "textCenter", readOnly: false, validator: /[a-zA-Z0-9]/g}, 
		                 			   {data: "CTGRZ_KRN_NM", 	type: "text",		readOnly: false}, 
		                 			   {data: "CTGRZ_ENG_NM",	type: "text",		readOnly: false},
		                 			   {data: "CTGRZ_KRN_ABRVN",type: "text",		readOnly: false},
		                 			   {data: "CTGRZ_ENG_ABRVN",type: "text",		readOnly: false},
		                 			   {data: "SEQ_USE_YN", 	type: 'autocompleteCenter',
	                 				    source: use_yn_source,
	                 				    strinct: false,
	                 				    filter: false,
	                 				    readOnly: false}
		                 			   ];
		metaData.pkColumns			= ["CD_CTGRZ"];
		metaData.heightVal			= 513;
		metaData.rowHeaders 		= false;
		
		//코드 분류 선택시 Callback
		metaData.afterSelectionEndCallback = function(hsi, row, column, erow, ecolumn) {
			if (hsi.getCellMeta(row, column).prop == "CD_CTGRZ" || 
				hsi.getCellMeta(row, column).prop == "CTGRZ_KRN_NM" || 
				hsi.getCellMeta(row, column).prop == "CTGRZ_ENG_NM") {
			
				//sort index
				var selRow = row;
				if(hsi.sortIndex != undefined &&
						hsi.sortIndex.length > 0) {
					if(hsi.sortIndex.length > selRow) {
						selRow = hsi.sortIndex[selRow][0];
					}
				}
				
				if(hshelper_CdCtgrz.getHsGridData()[selRow].ROW_STATUS != 'I') {
					//코드 분류 값 클릭시 코드 값을 조회한다.
					$scope.page_Cd.currentPage = 1;
					current_cdCtgrz=hshelper_CdCtgrz.getHsGridData()[selRow].CD_CTGRZ;
					$scope.selectCdList(current_cdCtgrz);
				} else {
					$scope.page_Cd.totalItems = 0;
					hshelper_cd.init();
					hshelper_cd.setData();
				}
			}
		}
		
		//테이블 생성 
		hshelper_CdCtgrz = new HandsontableHelper(hsc_ins, metaData);
		hshelper_CdCtgrz.init();
		hshelper_CdCtgrz.setData();
	}
	
	$scope.getFilteredDetail = function() {
		if(hshelper_CdCtgrz.getCurRow() == undefined) {
			bootbox.alert("마스터 코드를 먼저 선택해 주십시오.");
		}else{
			current_mastr_cd = hshelper_CdCtgrz.getHsGridData()[hshelper_CdCtgrz.getCurRow()].MASTR_CD;
			$scope.selectDetailBasisCdList(current_mastr_cd);
		}
	}
	//코드 그리드 셋팅 setCdGrid -> setCdGrid
	function setCdGrid(use_yn_source){
		var do_codeObj = {};
		
		var hsc_ins = document.getElementById('hst_detailCd');
		
		var metaData = {};
		metaData.readonlyBool 		= readOnlyYn;
		metaData.colHeaders 		= ["No.",	"코드", "한글명", "영문명", "한글약어", 
		                    		   "영문약어", "비고"];
		metaData.colWidths 			= [40,	 80,	240,	240,	80,  
		                   			   80,	 80];
		metaData.columns 			= [
			   						   {data: "RNK", type: "textCenter", readOnly: true},
		                 			   {data: "CD", type: "textCenter", readOnly: true}, 
		                 			   {data: "CD_KRN_NM", type: "textCenter", validator: /[a-zA-Z0-9]/g},
		                 			   {data: "CD_ENG_NM", type: "text"},
		                 			   {data: "CD_KRN_ABRVN", type: "text"},
		                 			   {data: "CD_ENG_ABRVN", type: "text"},
		                 			   {data: "RMK", type: "text"}
		                 			   ];
		metaData.pkColumns			= ["CD"];
		metaData.heightVal			= 513;
		metaData.rowHeaders 		= false;

		hshelper_cd = new HandsontableHelper(hsc_ins, metaData);
		hshelper_cd.init();
		hshelper_cd.setData();
	}
	
	$scope.addCdCtgrz = function() {
		console.log(">>>>>>>adCdCtgrz");
		if (hshelper_CdCtgrz == undefined) {
			bootbox.alert("추가할 테이블이 없습니다.");
			return false;
		}
		
		var addRow = hshelper_CdCtgrz.addData({}, true);
		hshelper_CdCtgrz.selectCell(addRow, 1);
	}
	
	$scope.saveCdCtgrz = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "saveCdCtgrz");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		
		addDataObj(jQuery, dataObj, "do_cdCtgrz_chg", hshelper_CdCtgrz.getHsChgData());
		//test
/*		var defaultValue = {};
		addDataObj(jQuery, defaultValue, "DLT_YN", "N");
		addDataObj(jQuery, dataObj, "do_cdCtgrz_chg", defaultValue);
*/		
		
		if(lengthCheck(dataObj.do_cdCtgrz_chg, 
				{CD_CTGRZ: 3,	CTGRZ_KRN_NM: 100,	CTGRZ_ENG_NM: 100, 	CTGRZ_KRN_ABRVN: 100,
				 CTGRZ_ENG_ABRVN: 100,		SEQ_USE_YN: 1}, 
				
				["코드분류",		"한글명",		"영문명",		"한글약어",		"영문약어",
				 "사용여부"])) return;
		if(mandantoryColumnCheck(dataObj.do_cdCtgrz_chg, 
				["CD_CTGRZ",	"CTGRZ_KRN_NM",		"CTGRZ_ENG_NM",		"CTGRZ_KRN_ABRVN",
				 "CTGRZ_ENG_ABRVN",		"SEQ_USE_YN"], 
				 ["코드분류",		"한글명",		"영문명",		"한글약어",		"영문약어",
				  "사용여부"])) return;
		
		if(alphabetNumCheck(dataObj.do_cdCtgrz_chg, ["CD_CTGRZ"], ["코드분류"])) return;
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "마스터코드 저장", "N");
			//저장후 재조회
			if(returnData.RESULT.ERRORCODE == "0") {
				//$scope.selectCdCtgrzList();
				$scope.getCdCtgrzList();
			}
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
		
	$scope.addCd = function() {
		var msg = "추가할 상세코드에 해당하는 마스터 코드가 없습니다."
			
		if (hshelper_CdCtgrz.getCurRow() == undefined ) {
			bootbox.alert(msg);
			return false;
		}
		
		var mastrCd = hshelper_CdCtgrz.getHsGridData()[hshelper_CdCtgrz.getCurRow() || 0].MASTR_CD;
		if (mastrCd == undefined) {
			bootbox.alert(msg);
			return false;
		}

		if (hshelper_CdCtgrz.getHsGridData()[hshelper_CdCtgrz.getCurRow()].ROW_STATUS == 'I') {
			bootbox.alert("마스터코드를 먼저 저장해 주십시오.");
			return false;
		}
		
		if (hshelper_cd == undefined) {
			bootbox.alert("추가할 테이블이 없습니다.");
			return false;
		}
		
		var addRow = hshelper_cd.addData({MASTR_CD: mastrCd}, true);
		hshelper_cd.selectCell(addRow, 2);
	}
	
	$scope.saveDetailCd = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "saveDetailCd");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		addDataObj(jQuery, dataObj, "do_detailCd_chg", hshelper_cd.getHsChgData());
		
		if(lengthCheck(dataObj.do_detailCd_chg, {MASTR_CD: 10, DETAIL_CD: 10, DETAIL_NM1: 300, DETAIL_NM2: 300, /*REFER_CD1: 20, REFER_CD2: 20, */SORT_ORDR: 3}, 
												["마스터코드", "상세코드", "상세코드명1", "상세코드명2", /*"참조코드명1", "참조코드명2",*/ "정렬순서"])) return;
		if(mandantoryColumnCheck(dataObj.do_detailCd_chg, ["MASTR_CD", "DETAIL_CD", "DETAIL_NM1", "USE_YN"], ["마스터코드", "상세코드", "상세코드명1", "사용여부"])) return;
		if(alphabetNumCheck(dataObj.do_detailCd_chg, ["MASTR_CD", "DETAIL_CD"], ["마스터코드", "상세코드"])) return;
		if(numCheck(dataObj.do_detailCd_chg, ["SORT_ORDR"], ["정렬순서"])) return;
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "상세코드 저장", "N");
			//저장후 재조회
			if(returnData.RESULT.ERRORCODE == "0") {
				$scope.selectDetailBasisCdList();
			}
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	
	//그리드 데이터 저장할때 코드 분류인지 코드인지 구분한다.
	$scope.saveBasisCd = function() {
		
		//코드 분류 부터.. 테스트
		console.log(">>>>SaveBasisCd");
		$scope.saveCdCtgrz();
		
	}
	
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
		for (i=0; i< obj.length; i++){
			for (var key in obj[i]){
				if(key =='USE_YN'){
					for (j=0; j< $scope.USE_YN.length; j++){
						var tmpStr = $scope.USE_YN[j].toString();
						if(obj[i][key] == tmpStr.split(":")[0]){
							obj[i][key] = tmpStr;						
						}//if(obj[i][key] == tmpStr.ssplit(":")[0]){
					}//for (j=0; j< $scope.USE_YN.length; j++)
				}//if(key =='USE_YN')
			}//for (var key in obj[i]){
		}//for (i=0; i< obj.length; i++){
		return obj;
	};
	
	/**
	 * <ul>
	 * <li>2017.02.17</li>
	 * <li>jjw</li>
	 * <li>function name: getCdCtgrzList</li>
	 * <li>function description: 코드분류를 가져온다.</li>
	 * </ul>
	 */
	$scope.getCdCtgrzList = function() {
		var dataObj = {};
		var paramDataObj = {};
		
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getCdCtgrzList");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);

		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "getSelectedCmbs", "N");
			setCdCtgrzList(returnData);

		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	/**
	 * <ul>
	 * <li>2016.09.29</li>
	 * <li>ckim</li>
	 * <li>function name: setCdCtgrzList</li>
	 * <li>function description: 건색조건을 selectbox로 만들어준다</li>
	 * </ul>
	 * 
	 * @param returnData
	 * @return: none
	 */
	function setCdCtgrzList(returnData){

		var resultData = returnData.cdCtgrz_do;
		$scope.page_CdCtgrz.totalItems = returnData.VARIABLE_MAP.cdCtgrzCnt; 
		
		setCdCtgrzGrid("Y");
		hshelper_CdCtgrz.setData(resultData);
		
	}	
	
	$document.ready(function() {
		
		$scope.pageInitiation();
		$scope.getCdCtgrzList();
		
	});	
	
});