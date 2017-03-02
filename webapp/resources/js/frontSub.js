app.controller('ctr_frontSub', [ '$scope', '$http', '$document', '$window', '$q', '$sce', '$routeParams', 
	function($scope, $http, $document, $window, $q, $sce, $routeParams) {

	var ctrUrl = '/frontPage.do';
	
	$scope.getParams = $routeParams;
	$scope.CONTENTS_BOOL = false;
	
	$scope.renderHtml = function(htmlCode) {
		return $sce.trustAsHtml(htmlCode);
	};
	
	$scope.backClick = function() {
		$scope.CONTENTS_BOOL = false;
	};
	
	$scope.boardClick = function(bltnNum) {
		
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "selectNtceContents");
		addDataObj(jQuery, paramDataObj, "MENU_CD", $scope.getParams.MENU_CD);
		addDataObj(jQuery, paramDataObj, "BLTN_NUM", bltnNum);
		
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "", "N");
			$scope.ntceContents = returnData.VARIABLE_MAP.ntceContents || '';
			$scope.CONTENTS_BOOL = true;
			
		};
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
		
	};
	
	
	$scope.getAllFrontPageContents = function() {

		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getFrontSubTitleContents");
		addDataObj(jQuery, paramDataObj, "MENU_CD", $scope.getParams.MENU_CD);
		
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "", "N");
			$scope.subTitleContents = returnData.VARIABLE_MAP.mainContents || '';
			$scope.grid_title = returnData.VARIABLE_MAP.MENU_KRN_NM || '';
			$scope.BLTN_CRET_YN = returnData.VARIABLE_MAP.BLTN_CRET_YN;
			$scope.CNT_CRET_YN = returnData.VARIABLE_MAP.CNT_CRET_YN;
			
			if($scope.BLTN_CRET_YN === 'Y') {
				$scope.ntce_do = returnData.ntce_do;
			}
			if($scope.CNT_CRET_YN === 'Y') {
				$scope.subContents = returnData.VARIABLE_MAP.subContents || '';
			}
			
		};
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);

	}
	
	$document.ready(function() {
	
	});
	
	$scope.init = function () {
		$scope.getAllFrontPageContents();
		
	};
	
} ]);