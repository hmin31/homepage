
app.controller('ctr_mngMenu', function($scope, $http, $document, $window, $q) {
	var ctrUrl = '/mngMenu.do';


	//전체 메뉴와 전체 메뉴의 하위 메뉴 HSHelper 
	var hshelper_lowerMenu, hshelper_masterCd;
	
	var use_yn_source;
	var readOnlyYn;
	
	var user_id;
	

	$scope.pageInitiation = function() {
		
		//페이지 설정 
		$scope.page_menu = {};
		$scope.page_menu.currentPage = 1;
		$scope.page_menu.perPage = 20;
		$scope.page_menu.totalItems = 0;
		
		$scope.page_lowerMenu = {};
		$scope.page_lowerMenu.currentPage = 1;
		$scope.page_lowerMenu.perPage = 20;
		$scope.page_lowerMenu.totalItems = 0;
			
	};
	

	//전체 메뉴 그리드 설정 
	function setAllMenuGrid(use_yn_source){
		var do_codeObj = {};

		var hsc_ins = document.getElementById('hst_all_menu');
		
		var metaData = {};
		metaData.readonlyBool 		= readOnlyYn;
		metaData.colHeaders 		= ["순번", "메뉴"];
		metaData.colWidths 			= [40, 100];
		metaData.columns 			= [
			   						   {data: "MENU_SEQ", type: "textCenter", readOnly: true},
		                 			   {data: "MENU_TREE", type: "text"},
		                 			  
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
				
/*				var menuSeq = hshelper_masterCd.getHsGridData()[selRow].MENU_SEQ;
				if(menuSeq == 30) {
					
					hshelper_lowerMenu.init();
					hshelper_lowerMenu.setData();
					return false;
				}*/
				
				
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
		metaData.colHeaders 		= ["순번",	"Menu 코드*",	"메뉴구분*",		"Menu 영문명",	"Menu 한글명*",	"URL",
		                    		   "순서*",	"사용여부*",		"상위 코드",		"카테고리*",		"등록자*"];
		metaData.colWidths 			= [40,		80,		80,		80,		80,		80, 
		                   			   100,		80,		80,		80,		80
		                   			  ]; 
		metaData.columns 			= [
		                 			   {data: "RNK",		type: "textCenter", readOnly: true},
		                 			   {data: "MENU_CD", 	type: "textCenter", readOnly: false},
		                 			   {data: "MENU_CATE",	type: "text",		readOnly: false},
		                 			   {data: "MENU_ENG_NM",type: "text", 		readOnly: false},
		                 			   {data: "MENU_KRN_NM",type: "text" , 		readOnly: false},
		                 			   {data: "MENU_URL",	type: "text",		readOnly: false},
		                 			   {data: "MENU_SEQ",	type: "numeric",	readOnly: false},
		                 			   {data: "USE_YN",		type: 'dropdown',
		                 				    source: use_yn_source,
		                 				    strinct: false,
		                 				    filter: false,
		                 				    readOnly: false},
		                 			   {data: "HI_MENU_CD", type: "textCenter",	readOnly: true},
		                 			   {data: "SYS_CTGRZ_CD",	type: "text",	readOnly: false},
		                 			   {data: "RGST_EMP_NUM", 	type: "text",	readOnly: false}
		                 			   ];
		metaData.heightVal			= 490;
		metaData.pkColumns			= ["MENU_CD", "MENU_CATE"]; 
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
		addDataObj(jQuery, paramDataObj, "MENU_CATE", $scope.selectedMenuKnd);
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);			
		
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
		addDataObj(jQuery, paramDataObj, "MENU_CATE", $scope.selectedMenuKnd);
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
		
		setLowerMenuGrid("Y");
		var resultData = returnData.all_main_menu;
		user_id = returnData.VARIABLE_MAP.USER_ID;
		$scope.page_menu.totalItems = returnData.VARIABLE_MAP.menuCnt; 	
		//모든 메뉴..
		setAllMenuGrid("Y");
		
		hshelper_masterCd.setData(resultData);
	};
	
	function setSelectedLowerMenuList(returnData){
		var resultData = returnData.lower_menu;
		
		//total item
		$scope.page_lowerMenu.totalItems = returnData.VARIABLE_MAP.lowerMenuCnt; 
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
		
		//상위 메뉴 코드 
		var hiMenuCd = hshelper_masterCd.getHsGridData()[hshelper_masterCd.getCurRow() || 0].MENU_CD;
		if (hiMenuCd == undefined) {
			bootbox.alert(msg);
			return false;
		}
		//상위 메뉴 레벨
/*		var hiMenuSeq = hshelper_masterCd.getHsGridData()[hshelper_masterCd.getCurRow() || 0].MENU_SEQ;
		if (hiMenuSeq == 30) {
			bootbox.alert("하위 메뉴를 생성할 수 없습니다");
			return false;
		}*/
		
		if (hshelper_lowerMenu == undefined) {
			bootbox.alert("추가할 테이블이 없습니다.");
			return false;
		}
		
		//메뉴 레벨 체크 
		//var addMenuSeq = hiMenuSeq + 10;
		var addRow = hshelper_lowerMenu.addData(
				{HI_MENU_CD: hiMenuCd, MENU_CATE: $scope.selectedMenuKnd, DLT_YN:'N', RGST_EMP_NUM:user_id, USE_YN:'Y'}, true);
		
		hshelper_lowerMenu.selectCell(addRow, 1);
	}
	
	//하위 메뉴 목록 그리드 행 추가 
	$scope.deleteLowerMenu = function() {

		var msg = "삭제할 메뉴에 해당하는 상위 메뉴를 선택하지 않았습니다."
			
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
			bootbox.alert("삭제할 테이블이 없습니다.");
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
		
		if(lengthCheck(dataObj.do_lowerMenu_chg, 
				{MENU_CD: 9, HI_MENU_CD: 9, MENU_ENG_NM: 30, MENU_KRN_NM: 100, 
				 MENU_URL: 500, MENU_SEQ: 3, USE_YN: 1, SYS_CTGRZ_CD: 4, RGST_EMP_NUM:8,	MENU_CATE:9},
				["메뉴코드", "상위메뉴코드", "영문명", "국문명", "메뉴URL", 
				 "메뉴순서", "사용여부", "분류코드", "등록직원번호", "메뉴구분"])) {
			return;
		}
		
		if(mandantoryColumnCheck(dataObj.do_lowerMenu_chg,
				["MENU_CD", "MENU_ENG_NM", "MENU_KRN_NM", "MENU_SEQ",
				 "USE_YN", "SYS_CTGRZ_CD", "RGST_EMP_NUM",	"MENU_CATE"], 
				["메뉴코드", "영문명", "국문명", "메뉴순서",
				 "사용여부", "분류코드", "등록직원번호", "메뉴구분"])){
			
			//console.log("Validation Failed");
		
			return;
		}
		if(alphabetNumCheck(dataObj.do_lowerMenu_chg, 
				["MENU_CD"], ["메뉴코드"])) return;
		
		if(numCheck(dataObj.do_lowerMenu_chg, 
				["MENU_SEQ"], ["메뉴순서"])) return;
		
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
		
		$scope.pageInitiation();
 		 		
		$scope.menuKnd_do = [{CODE: 'F', NAME: '프론트'}, {CODE: 'B', NAME: '백오피스'}];

		window.setTimeout(function() {
			console.log(">>>>Set TimeOut<<<<");
			$scope.selectedMenuKnd = 'B';
			$scope.getSelectedMenuList();

		}, 50);

	});
});
