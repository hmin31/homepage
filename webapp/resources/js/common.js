/**
 * <ul>
 * <li>2014.04.24</li>
 * <li>고정민</li>
 * <li>function name: addDataObj</li>
 * <li>function description: jQuery extend function을 이용하여 json object 형태의 데이터에
 * json 형태의 데이터를 추가한다.</li>
 * </ul>
 * 
 * @param jQuery:
 *            jQuery object,
 * @param dataObj:
 *            데이터를 입력할 json object(reference된다),
 * @param keyNm:
 *            입력할 키 값,
 * @param keyVal:
 *            입력할 키 벨류,
 * @return: none
 */
function addDataObj(jQuery, dataObj, keyNm, keyVal) {
	eval("jQuery.extend(dataObj, {" + keyNm + ": keyVal})");
}

/**
 * <ul>
 * <li>2014.04.24</li>
 * <li>고정민</li>
 * <li>function name: addDataMapObj</li>
 * <li>function description: jQuery extend function을 이용하여 json object 형태의 데이터에
 * json 형태의 데이터를 추가한다.</li>
 * </ul>
 * 
 * @param jQuery:
 *            jQuery object,
 * @param dataObj:
 *            데이터를 입력할 json object(reference된다),
 * @param keyNm:
 *            입력할 키 값,
 * @param keyVal:
 *            입력할 키 벨류,
 * @return: none
 */
function addDataMapObj(jQuery, dataObj, keyVal) {
	eval("jQuery.extend(dataObj, keyVal)");
}

/**
 * <ul>
 * <li>2014.04.29</li>
 * <li>고정민</li>
 * <li>function name: codeDataInitializer</li>
 * <li>function description: dropdown으로 사용할 데이터를 코드, 이름을 컬럼명으로 가져와 만든다.</li>
 * </ul>
 * 
 * @param codeObj:
 *            데이터를 입력할 object,
 * @param codeColNm:
 *            코드 컬럼 값,
 * @param descColNm:
 *            값 컬럼 값,
 * @return: none
 */
function codeDataInitializer(codeObj, codeColNm, descColNm) {

	if (codeObj == undefined)
		return '';

	var codeString = "";
	var tempCosdeString = "";
	var tempDescString = "";
	var tempString = "";
	for (var i = 0; i < codeObj.length; i++) {
		if (i != 0)
			codeString = codeString + '|| ';
		tempCosdeString = eval("codeObj[" + i + "]." + codeColNm);
		tempDescString = eval("codeObj[" + i + "]." + descColNm);
		if (tempCosdeString == null && tempDescString == null) {
			tempCosdeString = '';
		} else {
			tempString = (tempCosdeString == null ? "" : tempCosdeString) + ":"
					+ (tempDescString == null ? "" : tempDescString);
		}
		codeString = codeString + "" + tempString + "";
	}
	return codeString;
}

/**
 * <ul>
 * <li>2014.04.29</li>
 * <li>고정민</li>
 * <li>function name: exceptionHandler</li>
 * <li>function description: session 처리등 exception 발생을 처리한다. cookie에 현재 페이지 정보를
 * 저장한다</li>
 * </ul>
 * 
 * @param returnData:
 *            서버 리턴값
 * @param successMsg:
 *            request 성공시 메세지
 * @param sucMsgYn:
 *            성공메세지 표시 여부
 * @param windowObj:
 *            팝업 에서의 exception handling을 위한 $window object
 * @return: none
 */
function exceptionHandler(resultData, successMsg, sucMsgYn, windowObj) {

	if (typeof (sucMsgYn) == 'undefined')
		sucMsgYn = 'Y';

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
		if ('Y' == sucMsgYn) {
			bootbox.alert("'" + successMsg + "'가(이) 성공적으로 완료 되었습니다.");
		}
		return false;
	}
}

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

var commonHttpPostSender = function($http, ctrUrl, dataObj, afterSuccessFunc, afterErrorFunc) {

	if (typeof (afterSuccessFunc) == 'undefined') {
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT);
		};
	}

	if (typeof (afterErrorFunc) == 'undefined') {
		var afterErrorFunc = function(data, status, headers, config) {
			if(status == '0') {
				alert('요청을 처리할 수 없습니다.')
			} else {
				alert('요청을 처리할 수 없습니다 :' + status);
			}
		};
	}

	$http.post(ctrUrl, dataObj).success(afterSuccessFunc).error(afterErrorFunc);
};

/**
 * <ul>
 * <li>2014.05.07</li>
 * <li>고정민</li>
 * <li>function name: lengthCheck</li>
 * <li>function description: 저장할 값의 길이를 확인한다</li>
 * </ul>
 * 
 * @param do_chg:
 *            서버에 저장할 값
 * @param jsonObj:
 *            각 컬럼의 길이(jason 형태로 입력)
 * @param arryNm:
 *            컬럼명
 * @return: none
 */
function lengthCheck(do_chg, jsonObj, arryNm) {
	var columnNm;
	var maxLength;
	var curLength;
	var curRow;
	for (var i = 0; i < Object.keys(jsonObj).length; i++) {
		columnNm = Object.keys(jsonObj)[i];
		maxLength = eval("jsonObj." + columnNm);

		for (var j = 0; j < Object.keys(do_chg).length; j++) {
			curRow = Object.keys(do_chg)[j];
			if (do_chg[curRow].ROW_STATUS != 'D') {
				if (undefined != eval("do_chg[" + curRow + "]." + columnNm)) {
					curLength = eval("do_chg[" + curRow + "]." + columnNm).length;
					if (maxLength < curLength) {
						bootbox.alert("'" + arryNm[i] + "'은(는) " + maxLength
								+ " 글자 이상 입력하실 수 없습니다.");
						return true;
					}
				}
			}
		}

	}
	return false;
}

/**
 * <ul>
 * <li>2016.11.16</li>
 * <li>function name: alphaNumCheck</li>
 * <li>function description: 영문자와 숫자 외의 문자가 있는지 체크한다.</li>
 * </ul>
 * 
 * @param do_chg:
 *            서버에 저장할 값
 * @param arryObj:
 *            컬럼 array
 * @param arryNm:
 *            컬럼명
 * @return: none
 */
function alphabetNumCheck(do_chg, arryObj, arryNm) {
	var columnNm;
	var curRow;
	var regExp = /[^a-zA-Z0-9]/g;

	for (var i = 0; i < Object.keys(arryObj).length; i++) {
		columnNm = arryObj[i];

		for (var j = 0; j < Object.keys(do_chg).length; j++) {
			curRow = Object.keys(do_chg)[j];
			if (do_chg[curRow].ROW_STATUS != 'D' && eval("do_chg[" + curRow + "]." + columnNm) != undefined) {
				if (regExp.test(eval("do_chg[" + curRow + "]." + columnNm))) {
					bootbox.alert("'" + arryNm[i] + "'은(는) 영문과 숫자로만 입력해 주십시오.");
					return true;
				}
			}
		}

	}
	return false;
}

/**
 * <ul>
 * <li>2016.11.16</li>
 * <li>function name: alphaNumCheck</li>
 * <li>function description: 숫자 외의 문자가 있는지 체크한다.</li>
 * </ul>
 * 
 * @param do_chg:
 *            서버에 저장할 값
 * @param arryObj:
 *            컬럼 array
 * @param arryNm:
 *            컬럼명
 * @return: none
 */
function numCheck(do_chg, arryObj, arryNm) {
	var columnNm;
	var curRow;
	var regExp = /[^0-9]/g;

	for (var i = 0; i < Object.keys(arryObj).length; i++) {
		columnNm = arryObj[i];

		for (var j = 0; j < Object.keys(do_chg).length; j++) {
			curRow = Object.keys(do_chg)[j];
			if (do_chg[curRow].ROW_STATUS != 'D' && eval("do_chg[" + curRow + "]." + columnNm) != undefined) {
				if (regExp.test(eval("do_chg[" + curRow + "]." + columnNm))) {
					bootbox.alert("'" + arryNm[i] + "'은(는) 숫자만 입력해 주십시오.");
					return true;
				}
			}
		}

	}
	return false;
}

/**
 * <ul>
 * <li>2014.05.07</li>
 * <li>고정민</li>
 * <li>function name: lengthCheckByRow</li>
 * <li>function description: 저장할 값의 길이를 확인한다</li>
 * </ul>
 * 
 * @param $scope:
 *            $scope
 * @param str_do_row:
 *            현재 data object
 * @param curRow:
 *            현재 행
 * @param jsonObj:
 *            각 컬럼의 길이(jason 형태로 입력)
 * @param hsc:
 *            handson container
 * @return: validate 여부
 */
function lengthCheckByRow($scope, str_do_row, curRow, arryObj, hsc) {
	var columnVal, columnId, columnNm;
	var maxLength;
	var curLength;
	var curRow;
	var colArr;
	var focusColmn, focusRow;

	for (var i = 0; i < arryObj.length; i++) {
		columnVal = arryObj[i];
		colArr = columnVal.split('||');
		columnId = colArr[0];
		columnNm = colArr[1];
		maxLength = colArr[2];
		focusColmn = colArr[3];

		if (undefined != eval(str_do_row + ".chg[" + curRow + "]." + columnId)) {
			curLength = eval(str_do_row + ".chg[" + curRow + "]." + columnId).length;
			if (maxLength < curLength) {
				var curUid = eval(str_do_row + ".chg[" + curRow + "].uid");
				var gridDO = eval(str_do_row + ".grid");
				for (var j = 0; j < gridDO.length; j++) {
					if (gridDO[j].uid == curUid) {
						focusRow = j;
					}
				}

				bootbox
						.alert("Please check the maximum length of" + columnNm,
								function() {
									hsc.handsontable("selectCell",
											(parseInt(focusRow)),
											parseInt(focusColmn));
								});
				return true;
			}
		}

	}
	return false;
}

/**
 * <ul>
 * <li>2014.07.09 dsh</li>
 * <li>function name: a0chk</li>
 * <li>function description: 영문/숫자만 입력 가능하게 replace 시킨다. elemnet this</li>
 * </ul>
 * 
 * @param th:
 * @return: none
 */
function a0Chk(th) {
	th.value = th.value.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * <ul>
 * <li>2016.11.14</li>
 * <li>function name: numChk</li>
 * <li>function description: 숫자만 입력 가능하게 한다.</li>
 * </ul>
 * 
 * @param th:
 * @return: none
 */
function onlyNumber(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105)
			|| keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
		return;
	else
		return false;
}

/**
 * <ul>
 * <li>2016.11.14</li>
 * <li>function name: numChk</li>
 * <li>function description: 숫자가 아닌 문자 제거한다.</li>
 * </ul>
 * 
 * @param th:
 * @return: none
 */
function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
		return;
	else
		event.target.value = event.target.value.replace(/[^0-9]/g, "");
}

/**
 * <ul>
 * <li>2014.05.07</li>
 * <li>고정민</li>
 * <li>function name: mandantoryColumnCheck</li>
 * <li>function description: 필수값 입력여부를 확인한다</li>
 * </ul>
 * 
 * @param do_chg:
 *            서버에 저장할 값
 * @param jsonObj:
 *            필수컬럼 array
 * @return: none
 */
function mandantoryColumnCheck(do_chg, arryObj, arryNm) {
	var columnNm;
	var curLength;
	var curRow;
	for (var i = 0; i < Object.keys(arryObj).length; i++) {
		columnNm = arryObj[i];

		for (var j = 0; j < Object.keys(do_chg).length; j++) {
			curRow = Object.keys(do_chg)[j];
			if (do_chg[curRow].ROW_STATUS != 'D') {
				if (undefined == eval("do_chg[" + curRow + "]." + columnNm)) {
					bootbox.alert("'" + arryNm[i] + "'은(는) 필수 입력 값입니다.");
					return true;
				}
				curLength = eval("do_chg[" + curRow + "]." + columnNm).length;
				if (0 >= curLength
						|| eval("do_chg[" + curRow + "]." + columnNm) == ':') {
					bootbox.alert("'" + arryNm[i] + "'은(는) 필수 입력 값입니다.");
					return true;
				}
			}
		}

	}
	return false;
}

/**
 * <ul>
 * <li>2014.05.07</li>
 * <li>고정민</li>
 * <li>function name: mandantoryColumnCheckByRow</li>
 * <li>function description: 필수값 입력여부를 확인한다</li>
 * </ul>
 * 
 * @param $scope:
 *            $scope
 * @param str_do_row:
 *            현재 data object
 * @param curRow:
 *            현재행
 * @param arryObj:
 *            필수값 array (ex>"USR_ID:User ID:1")
 * @param hsc:
 *            handson table container
 * @return: valid 여부
 */
function mandantoryColumnCheckByRow($scope, str_do_row, curRow, arryObj, hsc) {
	var columnVal, columnId, columnNm;
	var curLength;
	var colArr;
	var focusColmn, focusRow;
	var checkBool = false;

	for (var k = 0; k < Object.keys(arryObj).length; k++) {

		checkBool = false;

		columnVal = arryObj[k];
		colArr = columnVal.split(":");

		columnId = colArr[0];
		columnNm = colArr[1];
		focusColmn = colArr[2];

		if (columnId == undefined || columnNm == undefined
				|| focusColmn == undefined || columnId == "" || columnNm == ""
				|| focusColmn == "") {
			// console.log("[common.js][fn::mandantoryColumnCheckByRow]arryObj
			// error...");
			return;
		}
		;

		if (undefined == eval(str_do_row + ".chg[" + curRow + "]." + columnId)) {
			checkBool = true;
		} else {
			curLength = eval(str_do_row + ".chg[" + curRow + "]." + columnId).length;
			if (0 >= curLength) {
				checkBool = true;
			}
		}
		;

		if (checkBool) {
			var curUid = eval(str_do_row + ".chg[" + curRow + "].uid");
			var gridDO = eval(str_do_row + ".grid");
			for (var j = 0; j < gridDO.length; j++) {
				if (gridDO[j].uid == curUid) {
					focusRow = j;
				}
			}

			bootbox.alert(columnNm
					+ " column is the mandatory value to be entered.",
					function() {
						hsc.handsontable("selectCell", parseInt(focusRow),
								parseInt(focusColmn));
					});
			return true;
		}
		;

	}
	;

	return false;
}

/**
 * <ul>
 * <li>2014.07.25</li>
 * <li>고정민</li>
 * <li>function name: fromToDateColumnCheck</li>
 * <li>function description: fromDt, toDt값을 비교하여 유효한지 여부를 리턴한다.</li>
 * </ul>
 * 
 * @param fromDt:
 *            from date
 * @param toDt:
 *            to date
 * @param delimeterVal:
 *            구분자
 * @param formatVal:
 *            date format 형태
 * @return: none
 */
function fromToDateColumnCheck(fromDt, toDt, delimeterVal, formatVal) {
	var dtFormat = formatVal.split(delimeterVal);
	var fromDtArry = fromDt.split(delimeterVal);
	var toDtArry = toDt.split(delimeterVal);
	var yyyyOrder, mmOrder, ddOrder;

	for (var i = 0; i < dtFormat.length; i++) {
		if (dtFormat[i] == 'MM')
			mmOrder = i;
		if (dtFormat[i] == 'DD')
			ddOrder = i;
		if (dtFormat[i] == 'yyyy')
			yyyyOrder = i;
	}

	var comparedFromDt = new Date();
	comparedFromDt.setUTCFullYear(fromDtArry[yyyyOrder] * 1);
	comparedFromDt.setUTCMonth((fromDtArry[mmOrder] * 1) - 1);
	comparedFromDt.setUTCDate(fromDtArry[ddOrder] * 1);

	var comparedToDt = new Date();
	comparedToDt.setUTCFullYear(toDtArry[yyyyOrder] * 1);
	comparedToDt.setUTCMonth((toDtArry[mmOrder] * 1) - 1);
	comparedToDt.setUTCDate(toDtArry[ddOrder] * 1);

	if (comparedFromDt > comparedToDt) {
		return false;
	} else {
		return true;
	}
};

/**
 * <ul>
 * <li>2014.05.07</li>
 * <li>고정민</li>
 * <li>function name: setMenuAuth</li>
 * <li>function description: 접속자 권한에 맞는 메뉴를 조회한다.</li>
 * </ul>
 * 
 * @param $http:
 *            $http
 * @param $scope:
 *            $scope
 * @param jQuery:
 *            jQuery
 * @param initFunc:
 *            화면 로딩시 실행시킬 function 명
 * @return: none
 */
function setMenuAuth($http, $scope, jQuery, initFunc) {

	var initFuncYn = 'N';
	if (typeof (initFunc) != 'undefined')
		initFuncYn = 'Y';

	var ctrUrl = gWebContext + '/commonCtr.do';
	var dataObj = {};
	var paramDataObj = {};

	addDataObj(jQuery, paramDataObj, "SVC_ID", "selectMenuAuth");
	addDataObj(jQuery, dataObj, "paramDataObj", paramDataObj);

	$http.post(ctrUrl, dataObj).success(function(returnData) {
		if (exceptionHandler(returnData.RESULT, '', 'N'))
			return;

		$scope.do_trackAuth = returnData.do_trackAuth;
		$scope.do_uptAuth = returnData.do_uptAuth;
		$scope.do_rptAuth = returnData.do_rptAuth;
		$scope.do_adminAuth = returnData.do_adminAuth;
		$scope.do_todosAuth = returnData.do_todosAuth;
		$scope.do_user_info = returnData.VARIABLE_MAP;

		if ('Y' == initFuncYn) {
			eval(initFunc);
		}

	}).error(function(data, status, headers, config) {
		alert('error: ' + status);
	});
}

/**
 * <ul>
 * <li>2014.05.19</li>
 * <li>고정민</li>
 * <li>function name: logOutFunc</li>
 * <li>function description: 로그아웃 처리</li>
 * </ul>
 * 
 * @param $http:
 *            $http
 * @return: none
 */
function logOutFunc($http) {

	var logout_url = getContextPath() + '/logout.do';
	$http.post(logout_url).success(function() {
		window.setTimeout(function() {
			location.href = getContextPath() + '/';
		}, 50);
	}).error(function(data, status, headers, config) {
		window.setTimeout(function() {
			location.href = getContextPath() + "/";
		}, 50);
		return status;
	});

}

function getContextPathByLocationPath() {
	if (location.pathname.split('/').length != 0) {
		return location.pathname.split('/').length == 2 ? '' : '/'
				+ location.pathname.split('/')[1];
	}

	return '';
}

//function getContextPath() {
//	var offset = location.href.indexOf(location.host) + location.host.length;
//	var ctxPath = location.href.substring(offset, location.href.indexOf('/',
//			offset + 1));
//	return ctxPath;
//}

/**
 * <ul>
 * <li>2014.05.19</li>
 * <li>고정민</li>
 * <li>function name: setDataObj,</li>
 * <li>function description: handson table에 사용할 data object 초기화,</li>
 * </ul>
 * 
 * @param jQuery:
 *            jQuery,
 * @param $scope:
 *            $scope,
 * @param dataObjStr:
 *            data object 명,
 * @return: none
 */
function setDataObj(jQuery, $scope, dataObjStr) {
	var tempDataObj = {};
	addDataObj(jQuery, tempDataObj, "org", {});
	addDataObj(jQuery, tempDataObj, "grid", {});
	addDataObj(jQuery, tempDataObj, "chg", {});

	addDataMapObj(jQuery, eval(dataObjStr), tempDataObj);
}

/**
 * <ul>
 * <li>2014.08.12 developer</li>
 * <li>function name: gridReadOnlyByRowHandler</li>
 * <li>function description: handson table edit모드 행단위 변경</li>
 * </ul>
 * 
 * @param $scope:
 *            $scope,
 * @param hsc:
 *            handson table container,
 * @param selRow:
 *            적용시킬 행,
 * @param readOnlyBool:
 *            적용시킬 boolean 값,
 * @return: none
 */
function gridReadOnlyByRowHandler($scope, hsc, selRow, readOnlyBool) {
	hsc.handsontable({
		cells : function(row, col, prop) {
			var cellProperties = {};
			cellProperties.renderer = customedRenderer;
			if (prop != undefined) {
				if (row == selRow) {
					cellProperties.readOnly = readOnlyBool;
				}
			}
			return cellProperties;
		}
	});
};

/**
 * <ul>
 * <li>2014.05.20 dsh</li>
 * <li>function name: gridReadOnlyToggleHandler</li>
 * <li>function description: handson table edit모드 변경</li>
 * </ul>
 * 
 * @param $scope:
 *            $scope,
 * @param hsc:
 *            handson table container,
 * @param do_str:
 *            readOnly 적용시킬 grid data object,
 * @param columnArry:
 *            적용시킬 column array,
 * @param modeBtnStr:
 *            사용할 버튼,
 * @param btnArry:
 *            안보일 버튼 array,
 * @return: none
 */
function gridReadOnlyToggleHandler($scope, hsc, do_str, columnArry, modeBtnStr,
		btnArry, disArry) {
	if ($('#' + modeBtnStr).attr("disabled") == false
			|| $('#' + modeBtnStr).attr("disabled") == undefined) {
		hsc.handsontable({
			cells : function(row, col, prop) {
				var cellProperties = {};
				cellProperties.readOnly = true;
				cellProperties.renderer = customedRenderer;
				return cellProperties;
			}
		});

		$('#' + modeBtnStr).attr("disabled", true);

		for (var i = 0; i < btnArry.length; i++) {
			$('#' + btnArry[i]).hide();
		}
		for (var i = 0; i < disArry.length; i++) {
			$('#' + disArry[i]).attr("disabled", true);
		}
	} else {

		hsc.handsontable({
			cells : function(row, col, prop) {
				var cellProperties = {};
				for (var i = 0; i < columnArry.length; i++) {
					if (do_str[row] != undefined) {
						if (prop == columnArry[i]) {
							cellProperties.readOnly = true;
						}
					}
				}
				cellProperties.renderer = customedRenderer;
				return cellProperties;
			}
		});

		$('#' + modeBtnStr).attr("disabled", false);

		for (var i = 0; i < btnArry.length; i++) {
			$('#' + btnArry[i]).show();
		}

		for (var i = 0; i < disArry.length; i++) {
			$('#' + disArry[i]).attr("disabled", false);
		}

	}
}

/**
 * <ul>
 * <li>2014.05.20 dsh</li>
 * <li>function name: componentReadOnlyToggleHandler</li>
 * <li>function description: component edit모드 변경</li>
 * </ul>
 * 
 * @param compId:
 *            적용시킬 component(element) ID array,
 * @param modeBtnStr:
 *            사용할 버튼
 * @return: none
 */
function componentReadOnlyToggleHandler(modeBtnStr, compId) {

	if ($('#' + modeBtnStr).attr("disabled") == false
			|| $('#' + modeBtnStr).attr("disabled") == undefined) {

		for (var i = 0; i < compId.length; i++) {
			// $('#' + compId[i]).attr("readonly",false);
			$('#' + compId[i]).attr("disabled", true);
		}

		$('#' + modeBtnStr).attr("disabled", true);

	} else {

		for (var i = 0; i < compId.length; i++) {
			// $('#' + compId[i]).attr("readonly",true);
			$('#' + compId[i]).attr("disabled", false);
		}

		$('#' + modeBtnStr).attr("disabled", false);

	}
}

/**
 * <ul>
 * <li>2014.06.12 dsh</li>
 * <li>function name: cfn_chkCount</li>
 * <li>function description: grid에 매팅되어있는 obejct에 CHK컬럼이 ture인 갯수 리턴</li>
 * </ul>
 * 
 * @param obj:
 *            obj
 * @return: boolean
 */
function cfn_chkCount(obj) {
	var cnt = 0;
	for (var i = 0; i < obj.length; i++) {
		if (obj[i].CHK == true) {
			cnt++;
		}
	}
	return cnt;
}

/**
 * <ul>
 * <li>2014.05.23</li>
 * <li>고정민</li>
 * <li>function name: getCodeFromName,</li>
 * <li>function description: CODE, NAME 형태의 json data에서 NAME 값으로 CODE 값을 return
 * 해준다</li>
 * </ul>
 * 
 * @param $scope:
 *            $scope,
 * @param jQuery:
 *            jQuery,
 * @param dataObjStr:
 *            CODE, NAME 값이 있는 json data object,
 * @param compareVal:
 *            찾을 값,
 * @return: CODE 값
 */
function getCodeFromName($scope, jQuery, dataObjStr, compareVal) {
	var returnVal;
	for (var i = 0; i < Object.keys(eval(dataObjStr)).length; i++) {
		if (eval(dataObjStr)[i].NAME == compareVal) {
			returnVal = eval(dataObjStr)[i].CODE;
			break;
		}
	}
	return returnVal;
}

/**
 * <ul>
 * <li>2014.05.23</li>
 * <li>고정민</li>
 * <li>function name: getCodeVal,</li>
 * <li>function description: CODE delimeter NAME 형태의 값에서 CODE 값을 분리해 리턴한다</li>
 * </ul>
 * 
 * @param codeAndNameVal:
 *            CODE delimeter NAME 형태의 값
 * @param delimiterStr:
 *            delemiter string
 * @return: CODE 값
 */
function getCodeVal(codeAndNameVal, delimiterStr) {

	var rtn = "";
	if (codeAndNameVal != "") {
		var idx = codeAndNameVal.indexOf(delimiterStr);
		if (idx > 1) {
			rtn = codeAndNameVal.substring(0, idx).trim();
		}
	}

	return rtn;
}

/**
 * <ul>
 * <li>2014.08.22 김영두</li>
 * <li>function name: getNameVal,</li>
 * <li>function description: CODE delimeter NAME 형태의 값에서 Name 값을 분리해 리턴한다</li>
 * </ul>
 * 
 * @param codeAndNameVal:
 *            CODE delimeter NAME 형태의 값
 * @param delimiterStr:
 *            delemiter string
 * @return: CODE 값
 */
function getNameVal(codeAndNameVal, delimiterStr) {

	var rtn = "";
	if (codeAndNameVal != "") {
		var idx = codeAndNameVal.indexOf(delimiterStr) + 1;
		if (idx > 1) {
			rtn = codeAndNameVal.substring(idx, 100).trim();
		}
	}

	return rtn;
}

/**
 * <ul>
 * <li>2014.06.19</li>
 * <li>고정민</li>
 * <li>function name: getCookie,</li>
 * <li>function description: cookie에 있는 특정 값을 반환한다.</li>
 * </ul>
 * 
 * @param cName:
 *            cookie에서 가져올 키 값
 * @return value: 키에 해당하는 cookie 값
 */
function getCookie(cName) {
	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';
	if (start != -1) {
		start += cName.length;
		var end = cookieData.indexOf(';', start);
		if (end == -1)
			end = cookieData.length;
		cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
}

function cfn_myInfoOpen(usr_id) {
	alert(usr_id);
}

function cfn_chkPw(str) {
	var reg = /^.{6,20}$/; // a-z 0-9 중에 6자리 부터 12자리만 허용 한다는 뜻이구요
	return (reg.test(str));
};

/**
 * <ul>
 * <li>2014.06.27</li>
 * <li>고정민</li>
 * <li>function name: postRequestPopupHandler,</li>
 * <li>function description: post 방식으로 popup을 호출한다</li>
 * </ul>
 * 
 * @param popUpUrl:
 *            popup으로 열릴 화면 url
 * @param paramObj:
 *            넘길 데이터
 * @param widthVal:
 *            width
 * @param heightVal:
 *            height
 */
function postRequestPopupHandler(popUpUrl, paramObj, widthVal, heightVal,
		sameWindowYn) {

	if (typeof (sameWindowYn) == 'undefined')
		sameWindowYn = 'N';

	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", popUpUrl);
	var targetStr;
	var str;

	if (sameWindowYn == 'Y') {
		var urlArr = popUpUrl.split('/');
		str = urlArr[urlArr.length - 1].replace(/[_./]/g, "");
		targetStr = str;
	} else {
		targetStr = guid();
	}

	form.setAttribute("target", targetStr);

	var hiddenField;
	for (var j = 0; j < Object.keys(paramObj).length; j++) {
		curColumn = Object.keys(paramObj)[j];
		hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("id", curColumn);
		hiddenField.setAttribute("name", curColumn);
		hiddenField.setAttribute("value", paramObj[curColumn]);
		form.appendChild(hiddenField);
	}
	document.body.appendChild(form);

	// screen size 로 popup을 중간에 위치에 호출
	var screenWidth = screen.availWidth;
	var screenHeight = screen.availHeight;
	var popupLeft = (screenWidth - widthVal) / 2;
	var popupTop = (screenHeight - heightVal) / 2;

	window.open(popUpUrl, targetStr, 'scrollbars=yes,menubar=no,height='
			+ heightVal + ',width=' + widthVal + ',left=' + popupLeft + ',top='
			+ popupTop + ',resizable=yes,toolbar=no,status=no');

	form.submit();
};

/**
 * <ul>
 * <li>Generates a GUID string.</li>
 * </ul>
 * 
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
function guid() {
	function _p8(s) {
		var p = (Math.random().toString(16) + "000000000").substr(2, 8);
		return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
	}
	return _p8() + _p8() + _p8() + _p8();
};

/**
 * <ul>
 * <li>2016.11.29</li>
 * <li>function name: authHandling</li>
 * <li>function description: 권한에 따른 데이터 수정 화면 handling</li>
 * </ul>
 * 
 * @param jQuery:
 *            jQuery
 * @param returnData:
 *            리턴 데이터
 * @return: 데이터 수정 가능 여부
 */
function authHandling(returnData) {
	// 데이터 수정 권한처리
	var cudYn = returnData.VARIABLE_MAP.MENU_WRITE_YN;
	
	if (cudYn == "Y") {
		$(".cudAuthCtr").show();
		$(".cudAuthInput").attr("readonly", false);
		$(".cudAuthSelect").attr("disabled", false); 
		
	} else {
		$(".cudAuthCtr").hide();
		$(".cudAuthInput").attr("readonly", true);
		$(".cudAuthSelect").attr("disabled", true); 
	}
	
	return cudYn == "Y" ? true : false;
};

/**
 * <ul>
 * <li>2016.12.02</li>
 * <li>function name: authHandling</li>
 * <li>function description: 권한에 따른 데이터 접근 화면 handling</li>
 * </ul>
 * 
 * @param jQuery:
 *            jQuery
 * @param returnData:
 *            리턴 데이터
 */
function agtAuthHandling(returnData, $scope) {
	// 데이터 접근 권한처리
	var sesAgtCd = returnData.VARIABLE_MAP.SES_AGT_CD; //여행사코드
	
	if(sesAgtCd !== undefined && sesAgtCd !== "" && sesAgtCd !== "11st"){
		window.setTimeout(function() {
			$scope.selectedCmbAgtCd = sesAgtCd;
			$("#agtAuthSelect").val(sesAgtCd).prop("selected", true);
			$("#agtAuthSelect").attr("disabled", true);
		}, 1);
	}
};

/**
 * <ul>
 * <li>2014.07.11 김영두</li>
 * <li>function name: formattedDate,</li>
 * <li>function description: 기본 Date를 정형화된 Date로 변환(ex:07/11/2014)</li>
 * </ul>
 * 
 * @param date:
 *            date
 * @return value: 변환된 Date
 */
function formattedDate(date) {

	// ISO Date로 전환(달, 일자를 2자리 수로 고정하기 위해)
	var isoDate = date.toISOString();

	// 정규 표현식으로 변환(MM/DD/YYYY)
	result = isoDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
	return result;
}

/**
 * <ul>
 * <li>2014.07.11 김영두</li>
 * <li>function name: subtractDate,</li>
 * <li>function description: Date에</li>
 * </ul>
 * 
 * @param date:
 *            날짜
 * @param sub:
 *            감산 할 날(일)의 수
 * @return value: 연산 후 Date
 */
function subtractDate(date, sub) {
	// sub 값이 있을 경우(빼기)
	if (sub != undefined) {
		date.setDate(date.getDate() - sub);
	}
	return date;
}

/**
 * <ul>
 * <li>2014.07.21 dsh</li>
 * <li>function name: isDate</li>
 * <li>function description: Date validation(only pattern: mm/dd/yyyy)</li>
 * </ul>
 * 
 * @param date:
 *            날짜
 * @return value: boolean(true/false)
 */
function isDate(txtDate) {
	var currVal = txtDate;
	if (currVal == '')
		return false;

	var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; // Declare
																	// Regex
	var dtArray = currVal.match(rxDatePattern); // is format OK?

	if (dtArray == null)
		return false;

	// Checks for mm/dd/yyyy format.
	dtMonth = dtArray[1];
	dtDay = dtArray[3];
	dtYear = dtArray[5];

	if (dtMonth < 1 || dtMonth > 12)
		return false;
	else if (dtDay < 1 || dtDay > 31)
		return false;
	else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11)
			&& dtDay == 31)
		return false;
	else if (dtMonth == 2) {
		var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
		if (dtDay > 29 || (dtDay == 29 && !isleap))
			return false;
	}
	return true;
}

function isTwoObjDiffer(firstDO, secondDO) {
	var curRow;
	for (var j = 0; j < Object.keys(firstDO).length; j++) {
		curRow = Object.keys(firstDO)[j];
		if (firstDO[curRow] != secondDO[curRow]) {
			return false;
		}
	}
	return true;
}

/**
 * <ul>
 * <li>2014.09.01</li>
 * <li>function name: differenceInDays</li>
 * <li>function description: 입력한 두 날짜 사이의 기간을 구한다(from - to)</li>
 * </ul>
 * 
 * @param fromDate:
 *            from 날짜
 * @param toDate:
 *            to 날짜 *
 * @return: 두 날짜의 뺄셈 결과
 */
function differenceInDays(fromDate, toDate) {

	var dt1 = fromDate.split('/');
	var dt2 = toDate.split('/');
	var one = new Date(dt1[2], dt1[0], dt1[1]);
	var two = new Date(dt2[2], dt2[0], dt2[1]);

	var millisecondsPerDay = 1000 * 60 * 60 * 24;
	var millisBetween = two.getTime() - one.getTime();
	var days = millisBetween / millisecondsPerDay;

	return Math.floor(days);
};

/*
 * 2014.09.11 고정민 function name : getMaxTextByWidth function description : 최대 표시
 * width에 맞는 글자 리턴 parameter: pText : 입력 text, parameter: pFontSize : font size,
 * parameter: pStyle : font style, parameter: maxSize : 최대 표시 width, return:
 * none
 */
function getMaxTextByWidth(pText, pFontSize, pStyle, maxSize) {
	var tempText, charactorSize;
	for (var counter = 0; counter < pText.length; counter++) {
		tempText = pText.substring(0, pText.length - counter);
		charactorSize = measureText(tempText, pFontSize, pStyle);

		// 띄어쓰기 문자로 인해 substring, +4 , trim 적용
		if (charactorSize.width + 4 <= maxSize) {
			return tempText.substring(0, tempText.length - 2).trim();
		}
	}
	;
	return pText;
};

/**
 * <ul>
 * <li>2014.10.01</li>
 * <li>function name: isAlpha</li>
 * <li>function description: 알파벳인지체크</li>
 * </ul>
 * 
 * @return: boolean
 */
function isAlpha(str) {
	// var r = new RegExp("[a-zA-Z]");
	var re = /[^a-zA-Z]/;
	return (!re.test(str));
};

/**
 * <ul>
 * <li>2016.10.13</li>
 * <li>ckim</li>
 * <li>function name: makeObjToJsonArr</li>
 * <li>function description: Object를 ':' 로 Key Value를 구분하여 Json객체에 넣어서
 * JsonArray에 넣어준다.</li>
 * </ul>
 * 
 * @param :
 *            obj, jsonArr
 * @return: jsonArr
 */
function makeObjToJsonArr(obj, jsonArr) {

	for ( var key in obj) {

		var tmpJson = {};
		var tmpKey = obj[key].split(":")[0];
		var tmpValue = obj[key].split(":")[1];
		tmpJson.code = tmpKey;
		tmpJson.name = tmpValue;
		// alert(JSON.stringify(tmpJson));
		jsonArr.push(tmpJson);
	}
	return jsonArr;
};

/**
 * <ul>
 * <li>2016.11.17</li>
 * <li>ckim</li>
 * <li>function name: fixedlengthCheck</li>
 * <li>function description: 저장할 값의 고정길이를 확인한다.</li>
 * </ul>
 * 
 * @param do_chg:
 *          서버에 저장할 값
 * @param jsonObj:
 *          각 컬럼의 길이(jason 형태로 입력)
 * @param arryNm:
 *          컬럼명
 * @return: none
 */
function fixedlengthCheck(do_chg, jsonObj, arryNm) {
	var columnNm;
	var fixLength;
	var curLength;
	var curRow;
	for (var i = 0; i < Object.keys(jsonObj).length; i++) {
		columnNm = Object.keys(jsonObj)[i];
		fixLength = eval("jsonObj." + columnNm);

		for (var j = 0; j < Object.keys(do_chg).length; j++) {
			curRow = Object.keys(do_chg)[j];
			if (do_chg[curRow].ROW_STATUS != 'D') {
				if (undefined != eval("do_chg[" + curRow + "]." + columnNm)) {
					curLength = eval("do_chg[" + curRow + "]." + columnNm).length;
					if (fixLength != curLength) {
						bootbox.alert("'" + arryNm[i] + "'은(는) " + fixLength
								+ " 글자만 입력 가능합니다.");
						return true;
					}
				}
			}
		}

	}
	return false;

};