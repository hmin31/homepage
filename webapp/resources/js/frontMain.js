app.controller('ctr_frontMain', [ '$scope', '$http', '$document', '$window', '$q', '$sce', function($scope, $http, $document, $window, $q, $sce) {

	var ctrUrl = '/frontPage.do';

	$scope.renderHtml = function(htmlCode) {
		return $sce.trustAsHtml(htmlCode);
	};

	$scope.getAllFrontPageContents = function() {

		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getAllFrontPageContents");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "", "N");
			$scope.hi_menu_cd_do = returnData.hi_menu_cd_do;
			$scope.menu_cd_do = returnData.menu_cd_do;
			$scope.mainContents = returnData.VARIABLE_MAP.mainContents || '';
		};
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);

	}

	$document.ready(function() {
		$scope.getAllFrontPageContents();
	});

} ]);