app.controller('ctr_frontSub', [ '$scope', '$http', '$document', '$window', '$q', '$sce', '$routeParams', 
	function($scope, $http, $document, $window, $q, $sce, $routeParams) {

	var ctrUrl = '/frontPage.do';
	
	$scope.getParams = $routeParams;
	
	$scope.renderHtml = function(htmlCode) {
		return $sce.trustAsHtml(htmlCode);
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
		};
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);

	}
	
	$document.ready(function() {
	
	});
	
	$scope.init = function () {
		$scope.getAllFrontPageContents();
	};
	
} ]);