var obj_NgApp = angular.module('app_tmpMenu', ['ui.bootstrap']);

obj_NgApp.controller('ctr_tmpMenu', function($scope, $http, $document, $window, $q) {
	
	var target = "_blank";
//	var popupOpt = "width=1200, height=670";
//	var ctrUrl = 'tmpMenu.do';
	
	$document.ready(function() {

	});
	/* 시스템 관리 */
	$scope.goBasisCd = function() {
		 window.open( getContextPath() + '/basisCd.do' , target);
	}
	$scope.goAirCd = function() {
		 window.open( getContextPath() + '/airCd.do' , target);
	}
	$scope.goAirportCd = function() {
		 window.open( getContextPath() + '/airportCd.do' , target);
	}
	$scope.goCityCd = function() {
		 window.open( getContextPath() + '/cityCd.do' , target);
	}
	$scope.goNaCd = function() {
		 window.open( getContextPath() + '/naCd.do' , target);
	}
	$scope.goAreaCd = function() {
		 window.open( getContextPath() + '/areaCd.do' , target);
	}
	$scope.goCache = function() {
		 window.open( getContextPath() + '/cache.do' , target);
	}
	/* 여행사 관리 */
	$scope.goAgt = function() {
		 window.open( getContextPath() + '/agt.do' , target);
	}
	$scope.goAcnt = function() {
		 window.open( getContextPath() + '/acnt.do' , target);
	}
	
	/* 공지사항 관리 */
	$scope.goNtce = function() {
		 window.open( getContextPath() + '/ntce.do' , target);
	}
	$scope.goFaq = function() {
		 window.open( getContextPath() + '/faq.do' , target);
	}
	
	/* 항공예약 관리 */
	$scope.goRsvStatus = function() {
		 window.open( getContextPath() + '/rsvStatus.do' , target);
	}
	$scope.goStats = function() {
		 window.open( getContextPath() + '/stats.do' , target);
	}
	$scope.goAdjust = function() {
		 window.open( getContextPath() + '/adjust.do' , target);
	}
	
	/* 콘텐츠 관리 */
	$scope.goEvent = function() {
		 window.open( getContextPath() + '/event.do' , target);
	}
	$scope.goCpn = function() {
		 window.open( getContextPath() + '/cpn.do' , target);
	}
	
	/* API 관리 */
	$scope.goApiMng = function() {
		 window.open( getContextPath() + '/apiMng.do' , target);
	}
	$scope.goApiHst = function() {
		 window.open( getContextPath() + '/apiHst.do' , target);
	}
	
	function getContextPath(){
	    var offset=location.href.indexOf(location.host)+location.host.length;
	    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
	    return ctxPath;
	}
});