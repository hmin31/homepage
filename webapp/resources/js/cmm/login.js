var obj_NgApp = angular.module('app_login', []);

obj_NgApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);

obj_NgApp.controller('ctr_login', function($scope, $http, $document, $location, $window) {
	
	function getContextPath() {
    	var hostname = window.location.hostname;
    	var contextEnd = window.location.pathname.indexOf("/", 2);
    
    	var returnVal = hostname;
    	if(window.location.port != 80) {
    		returnVal = returnVal + ':' + window.location.port;
    	}
    	if(contextEnd != -1) {
    		returnVal += window.location.pathname.substring(0, contextEnd);
    	}
    	returnVal = window.location.protocol + '//' + returnVal;
    	
    	return returnVal;
    }
	
	$document.ready(function() {
		
	});
	
	$scope.loginBtn = function() {
		
		var url = getContextPath() + '/login.do';
		 
		var dataObj = {};
		var paramDataObj = {};
		
		// set parameter value 
		addDataObj(jQuery, paramDataObj,	"USR_ID", 		$scope.inputUsrId);
		addDataObj(jQuery, paramDataObj, 	"USR_PWD", 		$scope.inputUsrPwd);
		addDataObj(jQuery, dataObj, 		"paramDataObj", paramDataObj);
		
		var afterSuccessFunc = function(returnData) {
			if("0" == returnData.RESULT.ERRORCODE) {
				// Attach date() for a disable browser cache
				$window.location.href = getContextPath() + "/main.do?_=" + (new Date()).getTime();
				
			} else {
				bootbox.alert(returnData.RESULT.ERRORMSG);
			}
		};
		
		commonHttpPostSender($http, url, dataObj, afterSuccessFunc);
	};
	
	$(function(){
	    $("#reqNewAcntBtn").click(function(){
	    	//window.location.replace(getContextPath() + "/reqAcnt.do");
	    })
	});
	
});