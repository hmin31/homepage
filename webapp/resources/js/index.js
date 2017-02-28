var app = angular.module('app_index', ['ngRoute']);

app.config(function($httpProvider) {
	$httpProvider.responseInterceptors.push('httpInterceptorForLoading');
	var spinnerFunction = function(data, headersGetter) {
		$('#loading').show();
		return data;
	};
	$httpProvider.defaults.transformRequest.push(spinnerFunction);
});

app.factory('httpInterceptorForLoading', function($q, $window) {
	return function(promise) {
		return promise.then(function(response) {
			$('#loading').hide();
			return response;

		}, function(response) {
			$('#loading').hide();
			return $q.reject(response);
		});
	};
});

app.controller('ctr_index', ['$scope', '$http', '$document', '$window', '$q', '$sce',
	function($scope, $http, $document, $window, $q, $sce) {
	
	var ctrUrl = '/frontPage.do';
	
	$scope.getMenuList = function() {

		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getMenuList");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "", "N");
			$scope.hi_menu_cd_do = returnData.hi_menu_cd_do;
			$scope.menu_cd_do = returnData.menu_cd_do;
		};
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);

	}

	$document.ready(function() {
		$scope.getMenuList();
	});

}]);

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'frontMain.do',
		controller: 'ctr_frontMain'
	}).when('/frontSub.do', {
		templateUrl : 'frontSub.do',
		controller: 'ctr_frontSub'
	}).otherwise({
		
	})
	
} ]);
