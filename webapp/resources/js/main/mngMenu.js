
app.controller('ctr_mngMenu', function($scope, $http, $document, $window, $q) {
	var ctrUrl = 'mngMenu.do';


	//전체 메뉴와 전체 메뉴의 하위 메뉴 HSHelper 
	var hshelper_lowerMenu, hshelper_masterCd;
	
	var use_yn_source;
	var readOnlyYn;
	
	var g_hsc;
	

	$scope.pageInitiation = function() {
		$scope.page_cd = {};
		$scope.page_cd.currentPage = 1;
		$scope.page_cd.perPage = 20;
		$scope.page_cd.totalItems = 0;
			
	};
	

	//전체 메뉴 그리드 설정 - 추후 메뉴코드 Hidden처리 예정
	function setAllMenuGrid(use_yn_source){
		var do_codeObj = {};

		var hsc_ins = document.getElementById('hst_all_menu');
		
		var metaData = {};
		metaData.readonlyBool 		= readOnlyYn;
		metaData.colHeaders 		= ["순번", "메뉴", "코드", "사용"];
		metaData.colWidths 			= [40, 200, 80, 80];
		metaData.columns 			= [
			   						   {data: "MENU_SEQ", type: "textCenter", readOnly: true},
		                 			   {data: "MENU_TREE", type: "text"}, 
		                 			   {data: "MENU_CD", type: "text"},
		                 			   {data: "USE_YN", type: 'autocompleteCenter',
	                 				    source: use_yn_source,
	                 				    strinct: false,
	                 				    filter: false,
	                 				    readOnly: false}
		                 			   ];
		//코드 Hidden 추후
		metaData.heightVal			= 513;
		metaData.rowHeaders 		= false;
		
		//그리드 선택시 이벤트 
		metaData.afterSelectionEndCallback = function(hsi, row, column, erow, ecolumn) {
			
			//현재 메뉴 목록만 선택시 하위 메뉴 그리드가 나오도록 설정되어 있음
			if (hsi.getCellMeta(row, column).prop == "MENU_TREE"){
				
				//sort index
				var selRow = row;		
				
				//var menuSeq = hsi.getHsGridData()[selRow].MENU_SEQ;
				var menuSeq = hshelper_masterCd.getHsGridData()[selRow].MENU_SEQ;
				if(menuSeq == 30) {
					
					hshelper_lowerMenu.init();
					hshelper_lowerMenu.setData();
					return false;
				}
				
				
				if(hsi.sortIndex != undefined &&
						hsi.sortIndex.length > 0) {
					if(hsi.sortIndex.length > selRow) {
						selRow = hsi.sortIndex[selRow][0];
					}
				}

	
				//ROW의 상태가 'INSERT'가 아닌 경우, 하위 메뉴 그리드를 호출 한다.
				if(hshelper_masterCd.getHsGridData()[selRow].ROW_STATUS != 'I') {
					//console.log("sel Row : " + row + ", ROW STATUS IS NOT I");
					//$scope.page_detailCd.currentPage = 1;	일단 삭제

					//메뉴 전체 목록 그리드에서 선택한 MENU_CD를 가져온다.
					current_menu_cd = hshelper_masterCd.getHsGridData()[selRow].MENU_CD;
					//선택한 MENU_CD로 하위 메뉴 목록을 호출 한다.
					$scope.selectLowerMenuList(current_menu_cd);

				} else {
					$scope.page_detailCd.totalItems = 0;
					hshelper_detailCd.init();
					hshelper_detailCd.setData();
				}
			}
		}
		
		hshelper_masterCd = new HandsontableHelper(hsc_ins, metaData);
		hshelper_masterCd.init();
		hshelper_masterCd.setData();
	}
	
	//하위 메뉴 목록 그리드 설정
	function setLowerMenuGrid(use_yn_source){
		
		var hsc_ins = document.getElementById('hst_upper_menu');
		g_hsc = hsc_ins;

		//HandDataHelper용 Meta Data 설정 
		var metaData = {};
		metaData.readonlyBool 		= false;
		metaData.colHeaders 		= ["순번",	"Menu 코드",	"Menu 영문명",	"Menu 한글명",	"URL",
		                    		   "순서",	"사용여부",	"상위 코드",		"카테고리",		"삭제유무",
		                    		   "등록자"];
		metaData.colWidths 			= [40,		80,		80,		80,		80, 
		                   			   100,		80,		80,		80,		80,
		                   			   80]; 
		metaData.columns 			= [
		                 			   {data: "RNK",		type: "textCenter", readOnly: true},
		                 			   {data: "MENU_CD", 	type: "textCenter", readOnly: true},
		                 			   {data: "MENU_ENG_NM",type: "text", 		readOnly: false},
		                 			   {data: "MENU_KRN_NM",type: "text" , 		readOnly: false},
		                 			   {data: "MENU_URL",	type: "text",		readOnly: false},
		                 			   {data: "MENU_SEQ",	type: "numeric",	readOnly: false},
		                 			   {data: "USE_YN",		type: 'autocompleteCenter',
		                 				    source: use_yn_source,
		                 				    strinct: false,
		                 				    filter: false,
		                 				    readOnly: false},
		                 			   {data: "HI_MENU_CD", type: "textCenter",	readOnly: true},
		                 			   //test
		                 			   {data: "SYS_CTGRZ_CD",	type: "text",	readOnly: false},
		                 			   {data: "DLT_YN", 		type: "text",	readOnly: false},
		                 			   {data: "RGST_EMP_NUM", 	type: "text",	readOnly: false}
		                 			   ];
		metaData.heightVal			= 490;
		metaData.rowHeaders 		= false;
	
		
		hshelper_lowerMenu = new HandsontableHelper(hsc_ins, metaData);
		hshelper_lowerMenu.init();
		hshelper_lowerMenu.setData();
	};
		
	
	
	//메뉴 등록 페이지가 호출되었을 때, 최초 호출 된다.
	$scope.getSelectedMenuList = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getMenuList");		//getMenuList 서비스 호출 
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);			//PARAM_MAP 추가
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "", "N");
			setSelectedMenuList(returnData);
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	};
	
	//상위 메뉴에 따른 하위 메뉴 리스트를 가져온다.
	$scope.selectLowerMenuList = function(current_menu_cd) {
		
		console.log("current_menu_cd : " + current_menu_cd);
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getLowerMenuList");		//getLowerMenuList 서비스 호출 
		//current_menu_cd를 파라미터로 넣자.. validation 체크 필요  
		
		addDataObj(jQuery, paramDataObj, "MENU_CD", current_menu_cd);
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);			//PARAM_MAP 추가
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "", "N");
			setSelectedLowerMenuList(returnData);
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	

	function setSelectedMenuList(returnData){

		/*var MENUL1Arr = [];//MENU 콘텐츠 관리 타입  
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
		readOnlyYn = !(authHandling(returnData));*/
		
		setLowerMenuGrid("Y");
		
		var resultData = returnData.all_main_menu;
		console.log("resultData : " + resultData);
		//모든 메뉴..
		setAllMenuGrid("Y");
		hshelper_masterCd.setData(resultData);
		//하위 메뉴..
		//hshelper_lowerMenu.setData(resultData);
	};
	
	function setSelectedLowerMenuList(returnData){
		var resultData = returnData.lower_menu;
		console.log("setSelectedLowerMenuList resultData : " + resultData);
		hshelper_lowerMenu.setData(resultData);
	}
	
	
	$scope.modalModelInit = function() {
		$scope.layer_input = {
			RNK:""
			,MENU_CD:""
			,MENU_KRN_NM:""
			,MENU_ENG_NM:""
			,USE_YN:""
			,MENU_SEQ:""
			,MENU_URL:""
			
		};
		
	};
	
	$scope.codeSplit = function(codeValue, idx) {
		var tmpRet = "";
		if (codeValue != undefined && codeValue != null) {
			tmpRet = codeValue.split(":")[idx];
		}
		return tmpRet;
	};
	
	//하위 메뉴 목록 그리드 행 추가 
	$scope.addLowerMenu = function() {

		var msg = "추가할 메뉴에 해당하는 상위 메뉴를 선택하지 않았습니다."
			
		//상위 메뉴를 선택했는지 여부 판단..
		if (hshelper_masterCd.getCurRow() == undefined ) {
			bootbox.alert(msg);
			return false;
		}
		
		var hiMenuCd = hshelper_masterCd.getHsGridData()[hshelper_masterCd.getCurRow() || 0].MENU_CD;
		if (hiMenuCd == undefined) {
			bootbox.alert(msg);
			return false;
		}

/*		if (hshelper_masterCd.getHsGridData()[hshelper_masterCd.getCurRow()].ROW_STATUS == 'I') {
			bootbox.alert("마스터코드를 먼저 저장해 주십시오.");
			return false;
		}*/
		
		if (hshelper_lowerMenu == undefined) {
			bootbox.alert("추가할 테이블이 없습니다.");
			return false;
		}
		
		//length, Menu 코드, 순서 자동 업데이트 필요
		//var menuCd =
		//test
		var curRow = hshelper_lowerMenu.getCurRow();
		var preRow = hshelper_lowerMenu.getPreRow();
		
		//hshelper_lowerMenu.getHsc().handsontable('alter', 'remove_row', Number(0));
		
		
		
		
		var addRow = hshelper_lowerMenu.addData({HI_MENU_CD: hiMenuCd}, true);
		hshelper_lowerMenu.selectCell(addRow, 2);
		hshelper_lowerMenu.getLastRow();
	}
	
	//하위 메뉴 목록 그리드 행 추가 
	$scope.deleteLowerMenu = function() {

		var msg = "추가할 메뉴에 해당하는 상위 메뉴를 선택하지 않았습니다."
			
		//상위 메뉴를 선택했는지 여부 판단..
		if (hshelper_masterCd.getCurRow() == undefined ) {
			bootbox.alert(msg);
			return false;
		}
		
		var hiMenuCd = hshelper_masterCd.getHsGridData()[hshelper_masterCd.getCurRow() || 0].MENU_CD;
		if (hiMenuCd == undefined) {
			bootbox.alert(msg);
			return false;
		}
		
		if (hshelper_lowerMenu == undefined) {
			bootbox.alert("추가할 테이블이 없습니다.");
			return false;
		}
		
		//행 선택되지 않은경우 어떻게 처리할것인가??
		
		//length, Menu 코드, 순서 자동 업데이트 필요
		
		var delRow = hshelper_lowerMenu.delrow();
		console.log("delRow : " + delRow);
		//hshelper_lowerMenu.selectCell(delRow);
	}
	
	//하위 메뉴를 저장 한다..
	$scope.saveLowerMenu = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "saveLowerMenu");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		addDataObj(jQuery, dataObj, "do_lowerMenu_chg", hshelper_lowerMenu.getHsChgData());
		
		
		
		console.log("change Data : " + hshelper_lowerMenu.getHsChgData());
		//Validation - 나중에 체크 
		
		/*if(lengthCheck(dataObj.do_detailCd_chg, {MASTR_CD: 10, DETAIL_CD: 10, DETAIL_NM1: 300, DETAIL_NM2: 300, REFER_CD1: 20, REFER_CD2: 20, SORT_ORDR: 3}, 
												["마스터코드", "상세코드", "상세코드명1", "상세코드명2", "참조코드명1", "참조코드명2", "정렬순서"])) return;
		if(mandantoryColumnCheck(dataObj.do_detailCd_chg, ["MASTR_CD", "DETAIL_CD", "DETAIL_NM1", "USE_YN"], ["마스터코드", "상세코드", "상세코드명1", "사용여부"])) return;
		if(alphabetNumCheck(dataObj.do_detailCd_chg, ["MASTR_CD", "DETAIL_CD"], ["마스터코드", "상세코드"])) return;
		if(numCheck(dataObj.do_detailCd_chg, ["SORT_ORDR"], ["정렬순서"])) return;
		*/
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "상세코드 저장", "N");
			//저장후 재 조회를 어떤식으로 할것인가.. 
			if(returnData.RESULT.ERRORCODE == "0") {
				//우선 메뉴 전체 목록을 가져오는 방법으로..
				$scope.getSelectedMenuList();
				//$scope.selectLowerMenuList();
			}
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	$document.ready(function() {
		
		//setCdGrid("Y");
		//$scope.selectCdList();
		
		$scope.pageInitiation();
 		 		
		$scope.getSelectedMenuList();
		
	});
});
