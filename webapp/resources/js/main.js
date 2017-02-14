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
	
	var ctrUrl = 'main.do';
	
	$scope.ChangeLocation = function(url){
	    window.location = url;
	}
	
	$(".collapse").on("show.bs.collapse", function() {
		$('.sub-menu').collapse("hide");
	});
	
	
	
	/*	$scope.main_menu_do = [{"MENU_KOR_NM":"메인","UPPER_MENU_CD":"BOP02","MENU_CD":"BOP02"},{"MENU_KOR_NM":"시스템관리","UPPER_MENU_CD":"BOP03","MENU_CD":"BOP03"},{"MENU_KOR_NM":"여행사관리","UPPER_MENU_CD":"BOP04","MENU_CD":"BOP04"},{"MENU_KOR_NM":"게시판관리","UPPER_MENU_CD":"BOP05","MENU_CD":"BOP05"},{"MENU_KOR_NM":"항공예약관리","UPPER_MENU_CD":"BOP06","MENU_CD":"BOP06"},{"MENU_KOR_NM":"콘텐츠관리","UPPER_MENU_CD":"BOP07","MENU_CD":"BOP07"},
		                       {"MENU_KOR_NM":"API 관리","UPPER_MENU_CD":"BOP08","MENU_CD":"BOP08"}];
		$scope.sub_menu_do =  [{"MENU_KOR_NM":"메뉴관리","UPPER_MENU_CD":"BOP02","MENU_URL":"mngMenu.do","MENU_CD":"P0203"},{"MENU_KOR_NM":"메뉴권한관리","UPPER_MENU_CD":"BOP02","MENU_URL":"mngMenuAuth.do","MENU_CD":"P0204"},{"MENU_KOR_NM":"기초코드정보","UPPER_MENU_CD":"BOP03","MENU_URL":"basisCd.do","MENU_CD":"P0301"},{"MENU_KOR_NM":"항공사코드정보","UPPER_MENU_CD":"BOP03","MENU_URL":"airCd.do","MENU_CD":"P0302"},{"MENU_KOR_NM":"공항코드정보","UPPER_MENU_CD":"BOP03","MENU_URL":"airportCd.do","MENU_CD":"P0303"},{"MENU_KOR_NM":"도시코드정보","UPPER_MENU_CD":"BOP03","MENU_URL":"cityCd.do","MENU_CD":"P0304"},{"MENU_KOR_NM":"국가코드정보","UPPER_MENU_CD":"BOP03","MENU_URL":"naCd.do","MENU_CD":"P0305"},{"MENU_KOR_NM":"지역코드정보","UPPER_MENU_CD":"BOP03","MENU_URL":"areaCd.do","MENU_CD":"P0306"},{"MENU_KOR_NM":"캐시 설정","UPPER_MENU_CD":"BOP03","MENU_URL":"cacheSet.do","MENU_CD":"P0307"},{"MENU_KOR_NM":"서비스 설정","UPPER_MENU_CD":"BOP03","MENU_URL":"setOpts.do","MENU_CD":"P0308"},{"MENU_KOR_NM":"여행사정보","UPPER_MENU_CD":"BOP04","MENU_URL":"agt.do","MENU_CD":"P0401"},{"MENU_KOR_NM":"계정관리","UPPER_MENU_CD":"BOP04","MENU_URL":"acnt.do","MENU_CD":"P0402"},{"MENU_KOR_NM":"공지사항관리","UPPER_MENU_CD":"BOP05","MENU_URL":"ntce.do","MENU_CD":"P0501"},{"MENU_KOR_NM":"FAQ관리","UPPER_MENU_CD":"BOP05","MENU_URL":"faq.do","MENU_CD":"P0502"},{"MENU_KOR_NM":"항공예약현황","UPPER_MENU_CD":"BOP06","MENU_URL":"rsvStatus.do","MENU_CD":"P0601"},{"MENU_KOR_NM":"통계-종합","UPPER_MENU_CD":"BOP06","MENU_URL":"rsvCompStats.do","MENU_CD":"P0602"},{"MENU_KOR_NM":"통계-연간","UPPER_MENU_CD":"BOP06","MENU_URL":"rsvYearStats.do","MENU_CD":"P0603"},{"MENU_KOR_NM":"통계-월간","UPPER_MENU_CD":"BOP06","MENU_URL":"rsvMonthStats.do","MENU_CD":"P0604"},{"MENU_KOR_NM":"정산","UPPER_MENU_CD":"BOP06","MENU_URL":"rsvCalc.do","MENU_CD":"P0605"},{"MENU_KOR_NM":"메인 기획전","UPPER_MENU_CD":"BOP07","MENU_URL":"mainPlan.do","MENU_CD":"P0701"},{"MENU_KOR_NM":"대륙별 추천 도시","UPPER_MENU_CD":"BOP07","MENU_URL":"areaRec.do","MENU_CD":"P0702"},{"MENU_KOR_NM":"특가항공 BG","UPPER_MENU_CD":"BOP07","MENU_URL":"specialBg.do","MENU_CD":"P0703"},{"MENU_KOR_NM":"메인 AD 배너","UPPER_MENU_CD":"BOP07","MENU_URL":"mainAb.do","MENU_CD":"P0704"},{"MENU_KOR_NM":"서브 AD 배너","UPPER_MENU_CD":"BOP07","MENU_URL":"subAb.do","MENU_CD":"P0705"},{"MENU_KOR_NM":"여행사별 API 관리","UPPER_MENU_CD":"BOP08","MENU_URL":"apiMng.do","MENU_CD":"P0801"},{"MENU_KOR_NM":"API 송수신 이력조회","UPPER_MENU_CD":"BOP08","MENU_URL":"apiHst.do","MENU_CD":"P0802"}];
		*/	
		
	$scope.selectMenuList = function(mstCd) {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getMenu");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "", "N");
			
			var main_menu_do = {"MENU_KRN_NM":"메인","HI_MENU_CD":"BOP02","MENU_CD":"BOP02"};
			var sub_menu_do = {"MENU_KRN_NM":"메뉴관리","HI_MENU_CD":"BOP02","MENU_URL":"mngMenu.do","MENU_CD":"P0203"};
			
			
			$scope.seq10_menu = returnData.seq10_menu;
			$scope.seq10_menu.unshift(main_menu_do);
			$scope.seq20_menu = returnData.seq20_menu;
			$scope.seq20_menu.unshift(sub_menu_do);
			$scope.seq30_menu = returnData.seq30_menu;
			
			
			/*
			$scope.user_id = returnData.VARIABLE_MAP.USER_ID;
			$scope.user_nm = returnData.VARIABLE_MAP.USER_NM;*/
		};
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	
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
	}).when('/basisCd.do', {
		templateUrl : 'basisCd.do',
		controller: 'ctr_basisCd'
	})
	
} ]);