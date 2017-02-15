var app = angular.module('app_main', [ 'ngRoute', 'ui.bootstrap' ]);

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

app.controller('ctr_main', function($scope, $http, $document, $window) {
	
	var ctrUrl = 'main.do';
	var menuBool = true;

	$scope.menuTogle = function() {
		if (menuBool) {
			$scope.openNav();
			menuBool = false;
		} else {
			$scope.closeNav();
			menuBool = true;
		}
	}

	$scope.openNav = function() {
		menuBool = false;
		document.getElementById("mySidenav").style.width = "250px";
		document.getElementById("main").style.marginLeft = "250px";
	}

	$scope.closeNav = function() {
		menuBool = true;
		document.getElementById("mySidenav").style.width = "0";
		document.getElementById("main").style.marginLeft = "0";
	}

	var commonHttpPostSender = function($http, ctrUrl, dataObj,
			afterSuccessFunc, afterErrorFunc) {

		if (typeof (afterSuccessFunc) == 'undefined') {
			var afterSuccessFunc = function(returnData) {
				exceptionHandler(returnData.RESULT);
			};
		}

		if (typeof (afterErrorFunc) == 'undefined') {
			var afterErrorFunc = function(data, status, headers, config) {
				alert('error: ' + status);
			};
		}

		$http.post(ctrUrl, dataObj).success(afterSuccessFunc).error(
				afterErrorFunc);
	};

	$scope.selectMenuList = function(mstCd) {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getMenu");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "", "N");
			$scope.main_menu_do = returnData.main_menu_do;
			$scope.sub_menu_do = returnData.sub_menu_do;
			$scope.user_id = returnData.VARIABLE_MAP.USER_ID;
		};
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}

	$scope.logOutBtn = function() {
		logOutFunc($http);
	};

	$document.ready(function() {
		$scope.selectMenuList();
	});	
	
});

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/basisCd.do', {
		templateUrl : 'basisCd.do',
		controller: 'ctr_basisCd'
	}).when('/airCd.do', {
		templateUrl : 'airCd.do',
		controller: 'ctr_airCd'
	}).when('/airportCd.do', {
		templateUrl : 'airportCd.do',
		controller: 'ctr_airportCd'
	}).when('/cityCd.do', {
		templateUrl : 'cityCd.do',
		controller: 'ctr_cityCd'
	}).when('/naCd.do', {
		templateUrl : 'naCd.do',
		controller: 'ctr_naCd'
	}).when('/areaCd.do', {
		templateUrl : 'areaCd.do',
		controller: 'ctr_areaCd'
	}).when('/agt.do', {
		templateUrl : 'agt.do',
		controller: 'ctr_agt'
	}).when('/acnt.do', {
		templateUrl : 'acnt.do',
		controller: 'ctr_acnt'
	}).when('/ntce.do', {
		templateUrl : 'ntce.do',
		controller: 'ctr_ntce'
	}).when('/faq.do', {
		templateUrl : 'faq.do',
		controller: 'ctr_faq'
	}).when('/rsvStatus.do', {
		templateUrl : 'rsvStatus.do',
		controller: 'ctr_rsvStatus'
	}).when('/stats.do', {
		templateUrl : 'stats.do',
		controller: 'ctr_stats'
	}).when('/adjust.do', {
		templateUrl : 'adjust.do',
		controller: 'ctr_adjust'
	}).when('/event.do', {
		templateUrl : 'event.do',
		controller: 'ctr_event'
	}).when('/cpn.do', {
		templateUrl : 'cpn.do',
		controller: 'ctr_cpn'
	}).when('/apiMng.do', {
		templateUrl : 'apiMng.do',
		controller: 'ctr_apiMng'
	}).when('/apiHst.do', {
		templateUrl : 'apiHst.do',
		controller: 'ctr_apiHst'
	}).otherwise({
		redirectTo : '/'
	});
	
} ]);