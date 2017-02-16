//original
var app = angular.module('app_main', [ 'ngRoute', 'ui.bootstrap' ]);

var newUsrPwd="N";//사용자 암호 신규 입력 체크
app.config(function($httpProvider) {
	$httpProvider.responseInterceptors.push('httpInterceptorForLoading');
	var spinnerFunction = function(data, headersGetter) {
		$('#loading').show();
		return data;
	};
	$httpProvider.defaults.transformRequest.push(spinnerFunction);
});

app.config([ '$provide', function($provide) {
	$provide.decorator('$cacheFactory', function($delegate) {
		$delegate.removeAll = function() {
			angular.forEach($delegate.info(), function(ob, key) {
				$delegate.get(key).removeAll();
			});
		}

		$delegate.destroyAll = function() {
			angular.forEach($delegate.info(), function(ob, key) {
				$delegate.get(key).destroy();
			});
		}
		return $delegate;
	});
} ])

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);

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

app.config(['$compileProvider', function($compileProvider) {
	$compileProvider
			.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
} ]);

app.directive('format', ['$filter', function ($filter) {
	return {
		require: '?ngModel',
		link: function (scope, elem, attrs, ctrl) {
			if (!ctrl) return;
			
			ctrl.$formatters.unshift(function (a) {
				return $filter(attrs.format)(ctrl.$modelValue);
			});
			
			ctrl.$parsers.unshift(function (viewValue) {
				var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
				elem.val($filter('number')(plainNumber));
				return plainNumber;
			});
		}
	};
}]);

app.controller('ctr_main', function($scope, $http, $document, $window, $location) {
	
	var ctrUrl = '/main.do';
	
	$scope.ChangeLocation = function(url){
	    window.location = url;
	}
	
	$(".collapse").on("show.bs.collapse", function() {
		$('.sub-menu').collapse("hide");
	});
	
	$scope.main_menu_do = [{"MENU_KOR_NM":"메인","UPPER_MENU_CD":"BOP02","MENU_CD":"BOP02"},
							{"MENU_KOR_NM":"시스템관리","UPPER_MENU_CD":"BOP03","MENU_CD":"BOP03"},
							{"MENU_KOR_NM":"컨텐츠관리","UPPER_MENU_CD":"BOP04","MENU_CD":"BOP04"}];
	
	$scope.sub_menu_do =  [{"MENU_KOR_NM":"메뉴관리","UPPER_MENU_CD":"BOP02","MENU_URL":"mngMenu.do","MENU_CD":"P0201"},
//							{"MENU_KOR_NM":"메뉴권한관리","UPPER_MENU_CD":"BOP02","MENU_URL":"mngMenuAuth.do","MENU_CD":"P0202"},
<<<<<<< HEAD
							{"MENU_KOR_NM":"직원관리","UPPER_MENU_CD":"BOP02","MENU_URL":"mngEmp.do","MENU_CD":"P0203"},
=======
>>>>>>> branch 'master' of https://github.com/hmin31/homepage.git
							{"MENU_KOR_NM":"사용자정보","UPPER_MENU_CD":"BOP03","MENU_URL":"usrInfo.do","MENU_CD":"P0301"},
							{"MENU_KOR_NM":"기초코드정보","UPPER_MENU_CD":"BOP03","MENU_URL":"basisCd.do","MENU_CD":"P0302"},
							{"MENU_KOR_NM":"컨텐츠관리","UPPER_MENU_CD":"BOP04","MENU_URL":"mngContents","MENU_CD":"P0401"},
							{"MENU_KOR_NM":"이미지관리","UPPER_MENU_CD":"BOP04","MENU_URL":"mngImages","MENU_CD":"P0402"},
							{"MENU_KOR_NM":"게시판관리","UPPER_MENU_CD":"BOP04","MENU_URL":"mngNtce","MENU_CD":"P0403"}
							];
	
	$scope.selectMenuList = function(mstCd) {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getMenu");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "", "N");

			$scope.user_id = returnData.VARIABLE_MAP.USER_ID;
			$scope.user_nm = returnData.VARIABLE_MAP.USER_NM;
		};
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	$scope.logOutBtn = function() {
		logOutFunc($http);
	};
	
	$document.ready(function() {
		console.log("main document ready!");
		
		$scope.selectMenuList();
	});	
	
});

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/mngMenu.do', {
		templateUrl : 'mngMenu.do',
		controller: 'ctr_mngMenu'
	}).when('/mngMenuAuth.do', {
		templateUrl : 'mngMenuAuth.do',
		controller: 'ctr_mngMenuAuth'
	}).when('/mngEmp.do', {
		templateUrl : 'mngEmp.do',
		controller: 'ctr_mngEmp'
	}).when('/basisCd.do', {
		templateUrl : 'basisCd.do',
		controller: 'ctr_basisCd'
	}).when('/mngContents', {
		templateUrl : 'mngContents.do',
		controller: 'ctr_mngContents'
	}).when('/mngImages', {
		templateUrl : 'mngImages.do',
		controller: 'ctr_mngImages'
	}).when('/mngNtce', {
		templateUrl : 'mngNtce.do',
		controller: 'ctr_mngNtce'
	})
	
} ]);
