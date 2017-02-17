var app = angular.module('app_index', []);

app.controller('ctr_index', function($scope, $http, $document, $window, $location) {
	
	var ctrUrl = '/frontPage.do';

	function addDataObj(jQuery, dataObj, keyNm, keyVal) {
		eval("jQuery.extend(dataObj, {" + keyNm + ": keyVal})");
	}

	var commonHttpPostSender = function($http, ctrUrl, dataObj, afterSuccessFunc, afterErrorFunc) {

		if (typeof (afterSuccessFunc) == 'undefined') {
			var afterSuccessFunc = function(returnData) {
				exceptionHandler(returnData.RESULT);
			};
		}

		if (typeof (afterErrorFunc) == 'undefined') {
			var afterErrorFunc = function(data, status, headers, config) {
				if (status == '0') {
					alert('요청을 처리할 수 없습니다.')
				} else {
					alert('요청을 처리할 수 없습니다 :' + status);
				}
			};
		}

		$http.post(ctrUrl, dataObj).success(afterSuccessFunc).error(afterErrorFunc);
	};
	
	function exceptionHandler(resultData, successMsg, windowObj) {

		if ("0" != resultData.ERRORCODE) {
			if ("99999" == resultData.ERRORCODE) {
				alert(resultData.ERRORMSG);
				window.location.reload(true);
				return true;

			} else if ("640" == resultData.ERRORCODE) {
				bootbox.confirm({
					message: resultData.ERRORMSG, 
					callback: function(result){ 
							if(result == true) {
								if (typeof (windowObj) != 'undefined') {
									if (window.location.href != window.opener.location.href) {
										windowObj.close();
									}
								}
								else {
									location.replace(getContextPath()).then(function(result){	
										return result;
									}).catch(function(err) {
										bootbox.alert("catch err: " + err);
									});	
								}
							} 
							else{
								location.replace(getContextPath()).then(function(result){	
									return result;
								}).catch(function(err) {
									bootbox.alert("catch err: " + err);
								});	
							}
						}
				});
				return true;

			} else {
				bootbox.alert(resultData.ERRORMSG);
				return true;
			}
		} else {
			return false;
		}
	}

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

});