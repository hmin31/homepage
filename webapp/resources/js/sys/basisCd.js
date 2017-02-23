
app.controller('ctr_basisCd', function($scope, $http, $document, $window, $q) {
	
	var ctrUrl = '/basisCd.do';
	
	var hshelper_CdCtgrz;
	var hshelper_cd; 
	
	var use_yn_source;//A07
	
	var current_mastr_cd;//For detail_cd pagenation
	var readOnlyYn;
	var currentGrid = {
			"CD_CTGRZ" : false,
			"CD" : false
	}
	
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
		
		currentGrid.CD_CTGRZ = false;
		currentGrid.CD = false;
				
	}
	
	//Search Button 클릭시
	$scope.selectCdCtgrzList = function() {
		$scope.page_CdCtgrz.currentPage = 1; 
		$scope.page_Cd.currentPage = 1;
		
		var dataObj = {};
		var paramDataObj = {};
		
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getCdCtgrzList");
		addDataObj(jQuery, paramDataObj, "searchCdCtgrz", $scope.input_CdCtgrz)
		
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "마스터코드", "N");

			var gridData = returnData.cdCtgrz_do;
			hshelper_CdCtgrz.init();
			hshelper_CdCtgrz.setData(gridData);
			
			$scope.page_CdCtgrz.totalItems = returnData.VARIABLE_MAP.cdCtgrzCnt;
			
			//우선 검색되었을때, 코드분류의 개수에 상관없이 코드의 테이블리셋하자..
			$scope.page_Cd.totalItems = 0;
			hshelper_cd.init();
			hshelper_cd.setData();
			//hshelper_CdCtgrz.selectCell(-1, 0)
			/*
			if(returnData.VARIABLE_MAP.cdCtgrzCnt > 0){
				console.log(">>>>>>>>CdCtgrzCnt > 0 <<<<<<<<<<");
				hshelper_CdCtgrz.selectCell(0, 1);
				
			}else{
				$scope.page_Cd.totalItems = 0;
				hshelper_cd.init();
				hshelper_cd.setData();
			}*/
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	
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
			
			hshelper_cd.setData(returnData.do_cd);
			$scope.page_Cd.totalItems = returnData.VARIABLE_MAP.cdCnt;
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	//코드 분류 그리드 설정  setCdCtgrzGrid -> setCdCtgrzGrid
	function setCdCtgrzGrid(use_yn_source){
		var do_codeObj = {};

		var hsc_ins = document.getElementById('hst_masterCd');
		
		var metaData = {};
		metaData.readonlyBool 		= false;
		metaData.colHeaders 		= ["선택", "No.",		"*코드분류",		"*한글명",	"*영문명", "*한글약어",
		                    		   "*영문약어",	"*사용여부"];
		metaData.colWidths 			= [42, 40, 		80, 	80,		80,		80,
		                   			   80,		80];
		metaData.columns 			= [
		                 			   {data: "CHK", type: "checkbox", readOnly:false},
			   						   {data: "RNK",			type: "textCenter", readOnly: true},
		                 			   {data: "CD_CTGRZ",	 	type: "textCenter", readOnly: false, validator: /[a-zA-Z0-9]/g}, 
		                 			   {data: "CTGRZ_KRN_NM", 	type: "text",		readOnly: false}, 
		                 			   {data: "CTGRZ_ENG_NM",	type: "text",		readOnly: false},
		                 			   {data: "CTGRZ_KRN_ABRVN",type: "text",		readOnly: false},
		                 			   {data: "CTGRZ_ENG_ABRVN",type: "text",		readOnly: false},
		                 			   {data: "SEQ_USE_YN", 	type: "autocomplete",
		                 				source: ['Y', 'N'], 
		                 				strict: false,
	                 				    readOnly: false}
		                 			   ];
		metaData.pkColumns			= ["CD_CTGRZ"];
		metaData.heightVal			= 513;
		metaData.rowHeaders 		= false;
		
		//코드 분류 선택시 Callback
		metaData.afterSelectionEndCallback = function(hsi, row, column, erow, ecolumn) {
/*			if (hsi.getCellMeta(row, column).prop == "CD_CTGRZ" || 
				hsi.getCellMeta(row, column).prop == "CTGRZ_KRN_NM" || 
				hsi.getCellMeta(row, column).prop == "CTGRZ_ENG_NM") {*/
			
				//sort index
				var selRow = row;
				if(hsi.sortIndex != undefined &&
						hsi.sortIndex.length > 0) {
					if(hsi.sortIndex.length > selRow) {
						selRow = hsi.sortIndex[selRow][0];
					}
				}
				
				//현재 선택된 행이 추가된 행이 아닐경우..
				if(hshelper_CdCtgrz.getHsGridData()[selRow].ROW_STATUS != 'I') {
					//코드 분류 값 클릭시 코드 값을 조회한다.
					console.log(">>>>>CdCtgrz selected... selRow : " + selRow);
					$scope.page_Cd.currentPage = 1;
					current_cdCtgrz = hshelper_CdCtgrz.getHsGridData()[selRow].CD_CTGRZ;
					$scope.selectCdList(current_cdCtgrz);
					//다른 행들의 CHK값을 없앤다.
					
					for(var i in hshelper_CdCtgrz.getHsGridData()){
						hshelper_CdCtgrz.getHsGridData()[i].CHK = false;
					}
					
					hshelper_CdCtgrz.getHsGridData()[selRow].CHK = true;
					
				} else {
					//현재 선택된 행이 추가된 행이면, 코드 리스트를 초기화 시킨다.
					$scope.page_Cd.totalItems = 0;
					hshelper_cd.init();
					hshelper_cd.setData();
				}
			}
			
		//}
		//cell selection process
/*		metaData.afterOnCellMouseDownCallback = function(hsi, row, column, erow, ecolumn) {
			setCurrentGrid("CD_CTGRZ");
		}*/
		
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
	
	
	//코드 그리드 셋팅 
	function setCdGrid(use_yn_source){
		var do_codeObj = {};
		
		var hsc_ins = document.getElementById('hst_detailCd');
		
		var metaData = {};
		metaData.readonlyBool 		= false;
		metaData.colHeaders 		= ["선택", "No.",	"*코드", "*한글명", "*영문명", "*한글약어", 
		                    		   "*영문약어", "비고"];
		metaData.colWidths 			= [42, 40,	 80,	240,	240,	80,  
		                   			   80,	 80];
		metaData.columns 			= [
		                 			   {data: "CHK", type: "checkbox", readOnly:false},
			   						   {data: "RNK", 			type: "textCenter", 		readOnly: true},
		                 			   {data: "CD", 			type: "textCenter",			readOnly: false}, 
		                 			   {data: "CD_KRN_NM", 		type: "textCenter", 		readOnly: false},
		                 			   {data: "CD_ENG_NM", 		type: "text",		   		readOnly: false},
		                 			   {data: "CD_KRN_ABRVN", 	type: "text",	   			readOnly: false},
		                 			   {data: "CD_ENG_ABRVN", 	type: "text",	   			readOnly: false},
		                 			   {data: "RMKS", 			type: "text",				readOnly: false}
		                 			   ];
		metaData.pkColumns			= ["CD"];
		metaData.heightVal			= 513;
		metaData.rowHeaders 		= false;
		
		metaData.afterSelectionEndCallback = function(hsi, row, column, erow, ecolumn) {
			for(var i in hshelper_cd.getHsGridData()){
				hshelper_cd.getHsGridData()[i].CHK = false;
			}
			
			hshelper_cd.getHsGridData()[row].CHK = true;
			setCurrentGrid("CD");
		}

		hshelper_cd = new HandsontableHelper(hsc_ins, metaData);
		hshelper_cd.init();
		hshelper_cd.setData();
	}
	
	$scope.addCdCtgrz = function() {
		if (hshelper_CdCtgrz == undefined) {
			bootbox.alert("추가할 테이블이 없습니다.");
			return false;
		}
		
		var addRow = hshelper_CdCtgrz.addData({}, true);
		hshelper_CdCtgrz.selectCell(addRow, 1);
		setCurrentGrid("CD_CTGRZ");
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
		var msg = "추가할 코드에 해당하는 코드분류가 없습니다."
			
		if (hshelper_CdCtgrz.getCurRow() == undefined ) {
			bootbox.alert(msg);
			return false;
		}
		
		var cdCtgrz = hshelper_CdCtgrz.getHsGridData()[hshelper_CdCtgrz.getCurRow() || 0].CD_CTGRZ;
		if (cdCtgrz == undefined) {
			bootbox.alert(msg);
			return false;
		}

		if (hshelper_CdCtgrz.getHsGridData()[hshelper_CdCtgrz.getCurRow()].ROW_STATUS == 'I') {
			bootbox.alert("코드 분류를 먼저 저장해 주십시오.");
			return false;
		}
		
		if (hshelper_cd == undefined) {
			bootbox.alert("추가할 테이블이 없습니다.");
			return false;
		}
		
		var addRow = hshelper_cd.addData({CD_CTGRZ: cdCtgrz}, true);
		hshelper_cd.selectCell(addRow, 2);
		
		setCurrentGrid("CD");
	}
	
	$scope.saveCd = function() {
		var msg = "추가할 코드에 해당하는 코드분류가 없습니다."
		var dataObj = {};
		var paramDataObj = {};
		
		addDataObj(jQuery, paramDataObj, "SVC_ID", "saveCd");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		//여기에 cdCtgrz 값을 저장하자.
		addDataObj(jQuery, dataObj, "do_cd_chg", hshelper_cd.getHsChgData());
		
		if(lengthCheck(dataObj.do_cd_chg, 
				{CD: 6, 	CD_KRN_NM: 100, 	CD_ENG_NM: 100, 	CD_KRN_ABRVN: 100, 	CD_ENG_ABRVN: 100,
				 RMKS: 100}, 
				 ["코드",	"코드 한글명",		"코드 영문명",		"코드 한글 약어",
				  "코드 영문 약어",	"비고"])) return;
		if(mandantoryColumnCheck(dataObj.do_cd_chg, 
				["CD", "CD_KRN_NM", "CD_ENG_NM", "CD_KRN_ABRVN", "CD_ENG_ABRVN"], 
				["코드", "코드 한글명", "코드 영문명", "코드 한글 약어", "코드 영문 약어"])) return;
		if(alphabetNumCheck(dataObj.do_cd_chg, 
				["CD"], 
				["코드"])) return;
/*		if(numCheck(dataObj.do_cd_chg, 
				["CD"], 
				["코드"])) return;*/
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "상세코드 저장", "N");
			//저장후 재조회
			if(returnData.RESULT.ERRORCODE == "0") {
				$scope.selectCdList();
			}
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	//하위 메뉴 목록 그리드 행 추가 
	$scope.delCd = function() {

		var msg = "삭제할 코드에 해당하는 선택된 코드분류가 아닙니다..";
			
		if (hshelper_CdCtgrz.getCurRow() == undefined ) {
			bootbox.alert(msg);
			return false;
		}
		
		//선택한 코드분류와 삭제하고자 하는 코드분류의 값을 비교한다.
		var cdCtgrz = hshelper_CdCtgrz.getHsGridData()[hshelper_CdCtgrz.getCurRow() || 0].CD_CTGRZ;
		if (cdCtgrz == undefined) {
			bootbox.alert(msg);
			return false;
		}
		
		var cdCtgrzInCdGrid = hshelper_cd.getHsGridData()[hshelper_cd.getCurRow() || 0].CD_CTGRZ;
		if (cdCtgrz != cdCtgrzInCdGrid) {
			bootbox.alert(msg);
			return false;
		}
		
		
		if (hshelper_cd == undefined) {
			bootbox.alert("삭제할 테이블이 없습니다.");
			return false;
		}
		
		var delRow = hshelper_cd.delrow();
		//hshelper_lowerMenu.selectCell(delRow);
	}
	
	
	//그리드 데이터 저장할때 코드 분류인지 코드인지 구분한다.
	$scope.saveBasisCd = function() {
		
		//코드 분류 부터.. 테스트
		if(currentGrid.CD_CTGRZ == true && currentGrid.CD == false){
			$scope.saveCdCtgrz();
		}else if(currentGrid.CD_CTGRZ == false && currentGrid.CD == true){		
			$scope.saveCd();
		}else{
			bootbox.alert("저장할 테이블이 잘못 지정되었습니다");
		}
		
	}
	
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
	

	function setCdCtgrzList(returnData){

		var resultData = returnData.cdCtgrz_do;
		$scope.page_CdCtgrz.totalItems = returnData.VARIABLE_MAP.cdCtgrzCnt; 
		
		var use_yn_source = ['Y', 'N'];
		
		setCdCtgrzGrid(use_yn_source);
		setCdGrid(use_yn_source);
		hshelper_CdCtgrz.setData(resultData);
		
	}	
	
	function setCurrentGrid(grid)
	{
		if(grid == "CD_CTGRZ"){
			currentGrid.CD_CTGRZ = true;
			currentGrid.CD = false;
		}else{
			currentGrid.CD_CTGRZ = false;
			currentGrid.CD = true;
		}
	}
	
	$document.ready(function() {
		
		$scope.pageInitiation();
		$scope.getCdCtgrzList();
		
	});	
	
});