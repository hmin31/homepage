app.controller('ctr_mngMenuAuth', function($scope, $http, $document, $window, $q) {
	var ctrUrl = '/mngMenuAuth.do';

	var hshelper_cd;
	
	var use_yn_source;
	var grp_auth_cd_source;
	var upper_menu_cd_source;
	var menu_cd_source;
	var readOnlyYn;
	
	$scope.pageInitiation = function() {
		$scope.page_cd = {};
		$scope.page_cd.currentPage = 1;
		$scope.page_cd.perPage = 20;
		$scope.page_cd.totalItems = 0;
	};
	
	$scope.selectCdList = function() {
		
		var dataObj = {};
		var paramDataObj = {};
		
		addDataObj(jQuery, paramDataObj, "SVC_ID", "selectCdList");
		
		addDataObj(jQuery, paramDataObj, "searchGrpAuthCd", $scope.selectedGrpAuthCd);
		addDataObj(jQuery, paramDataObj, "searchMenuCd", $scope.selectedMenuLevel1);
		addDataObj(jQuery, paramDataObj, "searchEnableWriteYn", $scope.selectedCmbEnableWriteYn);	
		
		addDataObj(jQuery, paramDataObj, "CD_PER_PAGE", $scope.page_cd.perPage);
		addDataObj(jQuery, paramDataObj, "CD_CUR_PAGE", $scope.page_cd.currentPage);
		
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);

		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "코드", "N");
			
			var gridData= cdToNmOfGridData(returnData.do_cd);//Cd를 Name형식으로 변환
			hshelper_cd.init();
			hshelper_cd.setData(gridData);
			$scope.page_cd.totalItems = returnData.VARIABLE_MAP.cdCnt;

		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	};
	
	function setCdGrid(use_yn_source, grp_auth_cd_source, upper_menu_cd_source, menu_cd_source){

		var hsc_ins = document.getElementById('hst_cd');
		
		var metaData = {};
		metaData.readonlyBool 	= readOnlyYn;
		metaData.colHeaders 	= ["", "No.",
		                    		"권한 코드 *", "권한명 *", "읽기 권한 여부 *", "쓰기 권한 여부 *", "삭제 권한 여부 *", 
		                    		"등록 직원번호", "등록 일시", "수정 직원번호", "수정 일시"];
		metaData.colWidths 		= [42, 40,
		                   			150, 155, 150, 130,
		                   			140, 160, 140, 160]; 
		metaData.columns 		= [
		                 			{data: "CHK", type: "checkbox", readOnly:false},
		                 			{data: "RNK", type: "textCenter", readOnly:true},
		                 			{data: "RL_CD", type: "text"},
		                 			{data: "RL_NM", type: "text"},
		                 			
	                 				   {data: "UPPER_MENU_CD", type: 'autocomplete',
			                 				source: upper_menu_cd_source,
		                 				    strinct: false,
		                 				    filter: false,
		                 				    readOnly: true},
		                 			   {data: "ENABLE_WRITE_YN", type: 'autocompleteCenter',
				                 			source: use_yn_source,
			                 				strinct: false,
			                 				filter: false,
			                 				readOnly: false},
		                 			   {data: "REG_USR_ID", type: "textCenter", readOnly:true},
		                 			   {data: "REG_DTM", type: "textCenter", readOnly:true},
		                 			   {data: "UPD_USR_ID", type: "textCenter", readOnly:true},
		                 			   {data: "UPD_DTM", type: "textCenter", readOnly:true}
		                 			   ];
		metaData.heightVal			= 516;
		metaData.rowHeaders 		= false;
		metaData.chkAllColumnYn 	= true;
		metaData.pkColumns			= ["GRP_AUTH_CD", "MENU_CD"];
		
		hshelper_cd = new HandsontableHelper(hsc_ins, metaData);
		hshelper_cd.init();
		hshelper_cd.setData();
	};
	
	$scope.addCd = function() {
		var addRow = hshelper_cd.addData({}, true);
		hshelper_cd.selectCell(addRow, 2);
	};

	$scope.delCd = function() {
		var chkCnt = cfn_chkCount(hshelper_cd.getHsGridData());
		
		if(chkCnt == 0) {
			bootbox.alert("삭제할 항목을 체크해 주십시오.");
			return;
		}
		
		if(hshelper_cd.delChkedRow()) {
			bootbox.alert("저장버튼을 누르면 삭제됩니다.");
		}
	};
	
	$scope.saveCd = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "saveCd");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		addDataObj(jQuery, dataObj, "do_cd_chg", hshelper_cd.getHsChgData());
		
		if(mandantoryColumnCheck(dataObj.do_cd_chg, ["GRP_AUTH_CD", "MENU_CD", "ENABLE_WRITE_YN"], 
													["그룹 권한", "메뉴명", "데이터수정 가능 여부"])) return;
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "저장", "N");
			//저장후 재조회
			if(returnData.RESULT.ERRORCODE == "0") $scope.selectCdList();
		};
		
		bootbox.confirm({
			message:"해당 메뉴 권한를 저장 하시겠습니까? <br /><br /> " +
			"※ 주의 : 해당 메뉴 권한이 백오피스 화면에 적용됩니다.", 
			callback: function(result){ 
					if(result == false) {return;} 
					else{
						commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
					}
				}
		});
	};
	
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
				
				if(key =='ENABLE_WRITE_YN'){
					for (j=0; j< $scope.ENABLE_WRITE_YN.length; j++){
						var tmpStr = $scope.ENABLE_WRITE_YN[j].toString();
						if(obj[i][key] == tmpStr.split(":")[0]){
							obj[i][key] = tmpStr;
						}
					}
				}//if(key =='ENABLE_WRITE_YN'){
				
				if(key =='GRP_AUTH_CD'){
					for (j=0; j< $scope.GRP_AUTH_CD.length; j++){
						var tmpStr = $scope.GRP_AUTH_CD[j].toString();
						if(obj[i][key] == tmpStr.split(":")[0]){
							obj[i][key] = tmpStr;
						}
					}
				}//if(key =='GRP_AUTH_CD'){
				
				if(key =='UPPER_MENU_CD'){
					for (j=0; j< $scope.UPPER_MENU_CD.length; j++){
						var tmpStr = $scope.UPPER_MENU_CD[j].toString();
						if(obj[i][key] == tmpStr.split(":")[0]){
							obj[i][key] = tmpStr;
						}
					}
				}//if(key =='UPPER_MENU_CD'){
				
				if(key =='MENU_CD'){
					for (j=0; j< $scope.MENU_CD.length; j++){
						var tmpStr = $scope.MENU_CD[j].toString();
						if(obj[i][key] == tmpStr.split(":")[0]){
							obj[i][key] = tmpStr;
						}
					}
				}//if(key =='UPPER_MENU_CD'){
				
			}//for (var key in obj[i]){
		}//for (i=0; i< obj.length; i++){
		
		return obj;
	};
	
	/**
	 * <ul>
	 * <li>2016.09.29</li>
	 * <li>ckim</li>
	 * <li>function name: setSelectedCmbs</li>
	 * <li>function description: 검색조건을 selectbox로 만들어준다</li>
	 * </ul>
	 */
	$scope.getSelectedCmbs = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getSelectedCmbs");
		
		addDataObj(jQuery, paramDataObj, "A08", "A08");
		addDataObj(jQuery, paramDataObj, "B03", "B03");
		addDataObj(jQuery, paramDataObj, "MENUL1", "MENUL1");
		addDataObj(jQuery, paramDataObj, "MENU", "MENU");
		
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
	 * <li>function description: 검색조건을 selectbox로 만들어준다</li>
	 * </ul>
	 * 
	 * @param returnData
	 * @return: none
	 */
	function setSelectedCmbs(returnData){
		
		var MENUL1Arr = [];	//MENU 상위 타입 
		var MENUArr = [];	//MENU 타입 
		var A08Arr = [];	//A08 해당여부  
		var B03Arr = [];	//B03 그룹권한코드
		
		MENUL1Arr = makeObjToJsonArr(returnData.MENUL1, MENUL1Arr);
		MENUArr = makeObjToJsonArr(returnData.MENU, MENUArr);
		A08Arr = makeObjToJsonArr(returnData.A08, A08Arr);
		B03Arr = makeObjToJsonArr(returnData.B03, B03Arr);
		
		$scope.MENUL1 = MENUL1Arr;
		$scope.MENU = MENUArr;
		$scope.A08 = A08Arr;
		$scope.B03 = B03Arr;
		
		$scope.GRP_AUTH_CD = returnData.B03;
		$scope.ENABLE_WRITE_YN = returnData.A08;
		$scope.UPPER_MENU_CD = returnData.MENUL1;
		$scope.MENU_CD = returnData.MENU;
		
		//권한에 따른 입력 및 저장버튼 컨트롤
		readOnlyYn = !(authHandling(returnData));
		
		setCdGrid(returnData.A08, returnData.B03, returnData.MENUL1, returnData.MENU);
	};
	
	$document.ready(function() {
		
		//$scope.pageInitiation();
 		
		//$scope.getSelectedCmbs();
		
		readOnlyYn = "Y";
		setCdGrid();
	});
});