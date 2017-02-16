app.controller('ctr_mngNtce', ['$scope', '$http', '$document', '$window', '$q', '$sce',
	function($scope, $http, $document, $window, $q, $sce) {

	var ctrUrl = '/mngNtce.do';
	
	var hshelper_cd;
	
	$scope.renderHtml = function(htmlCode) {
		return $sce.trustAsHtml(htmlCode);
	};

	$scope.getNtceMenu = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getNtceMenu");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "ntce menu", "N");
			$scope.ntceMenu_do = returnData.ntceMenu_do;
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	$scope.selectCdList = function() {
		var dataObj = {};
		var paramDataObj = {};
		
		addDataObj(jQuery, paramDataObj, "SVC_ID", "selectCdList");
		
		addDataObj(jQuery, paramDataObj, "searchMenuCd", $scope.selectedNtceMenuCd);
		
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);

		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "코드", "N");
			
			var gridData= cdToNmOfGridData(returnData.do_cd);//Cd를 Name형식으로 변환
			hshelper_cd.init();
			hshelper_cd.setData(gridData);
			$scope.page_cd.totalItems = returnData.VARIABLE_MAP.cdCnt;

		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	};
	
	function setCdGrid(use_yn_source, grp_auth_cd_source, upper_menu_cd_source, menu_cd_source){

		var hsc_ins = document.getElementById('hst_ntce');
		
		var metaData = {};
		metaData.readonlyBool 		= readOnlyYn;
		metaData.colHeaders 		= ["", "No.",
		                    		   "그룹 권한 *", "메뉴명 *", "상위 메뉴명", "데이터수정 가능 여부 *", 
		                    		   "등록 사용자 ID", "등록 일시", "수정 사용자 ID", "수정 일시"];
		metaData.colWidths 			= [42, 40,
		                   			   150, 155, 150, 130,
		                   			   140, 160, 140, 160]; 
		metaData.columns 			= [
		                 			   {data: "CHK", type: "checkbox", readOnly:false},
		                 			   {data: "RNK", type: "textCenter", readOnly:true},
		                 			   {data: "GRP_AUTH_CD", type: 'autocompleteCenter',
			                 				source: grp_auth_cd_source,
		                 				    strinct: false,
		                 				    filter: true,
		                 				    readOnly: false},
		                 			   {data: "MENU_CD", type: 'autocomplete',
			                 				source: menu_cd_source,
		                 				    strinct: false,
		                 				    filter: true,
		                 				    readOnly: false},
	                 				   {data: "UPPER_MENU_CD", type: 'autocomplete',
			                 				source: upper_menu_cd_source,
		                 				    strinct: false,
		                 				    filter: false,
		                 				    readOnly: true},
		                 			   {data: "ENABLE_WRITE_YN", type: 'autocompleteCenter',
				                 			source: use_yn_source,
			                 				strinct: false,
			                 				filter: false,
			                 				readOnly: false},
		                 			   {data: "REG_USR_ID", type: "textCenter", readOnly:true},
		                 			   {data: "REG_DTM", type: "textCenter", readOnly:true},
		                 			   {data: "UPD_USR_ID", type: "textCenter", readOnly:true},
		                 			   {data: "UPD_DTM", type: "textCenter", readOnly:true}
		                 			   ];
		metaData.heightVal			= 516;
		metaData.rowHeaders 		= false;
		metaData.chkAllColumnYn 	= true;
		metaData.pkColumns			= ["GRP_AUTH_CD", "MENU_CD"];
		
		hshelper_cd = new HandsontableHelper(hsc_ins, metaData);
		hshelper_cd.init();
		hshelper_cd.setData();
	};
	
	function uploadImage(image) {
		var data = new FormData();
		data.append("image", image);
		$.ajax({
			url : 'image upload url',
			cache : false,
			contentType : false,
			processData : false,
			data : data,
			type : "post",
			success : function(url) {
				var image = $('<img>').attr('src', 'http://' + url);
				$('#summernote').summernote("insertode", image[0]);
			},
			error : function(data) {
				console.log(data);
			}
		});
	}
	
	$scope.getNtceDtls = function() {
		
		if($scope.selectedNtceMenuCd != undefined) {
			var dataObj = {};
			var paramDataObj = {};
			addDataObj(jQuery, paramDataObj, "SVC_ID", "getNtceDtls");
			addDataObj(jQuery, paramDataObj, "MENU_CD", $scope.selectedNtceMenuCd);
			addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
			
			var afterSuccessFunc = function(returnData) {
				exceptionHandler(returnData.RESULT, "ntce menu", "N");
				
				$scope.searchedMenuCd = $scope.selectedNtceMenuCd;
				
				$('#homepage_ntce').summernote(
						'code', returnData.VARIABLE_MAP.contetnsDtls || ''
				);
			};
			
			commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
			
		} else {
			bootbox.alert("메뉴를 선택해 주세요.");
		}
		
	}
	
	$scope.mergeNtceDtls = function() {
		
		if($scope.selectedNtceMenuCd != undefined) {
			var dataObj = {};
			var paramDataObj = {};
			addDataObj(jQuery, paramDataObj, "SVC_ID", "mergeNtceDtls");
			addDataObj(jQuery, paramDataObj, "MENU_CD", $scope.searchedMenuCd);
			addDataObj(jQuery, paramDataObj, "CTN_DTLS", $('#homepage_ntce').summernote('code'));
			addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
			
			var afterSuccessFunc = function(returnData) {
				exceptionHandler(returnData.RESULT, "ntce menu", "N");
			};
			
			commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
			
		} else {
			bootbox.alert("메뉴를 선택해 주세요.");
		}
	}
	
	$scope.previewClick = function() {
		$("#modal-content,#modal-background").toggleClass("active");
		$("#modal-content,#modal-background").draggable();
		
		var htmlVar = $('#homepage_ntce').summernote('code');
		$scope.thisCanBeusedInsideNgBindHtml = htmlVar;
		$scope.renderHtml($scope.thisCanBeusedInsideNgBindHtml);
	}
						
	$("#modal-background, #modal-close, #modal-close2").click(
		function() {
			$("#modal-content,#modal-background")
					.toggleClass("active");
		}
	);
	
	$document.ready(function() {
		
		$scope.getNtceMenu();
		
		//setCdGrid();

		$('#homepage_ntce').summernote({
			height: ($(window).height() - 300),
			callbacks: {
		        onImageUpload: function(image) {
		            uploadImage(image[0]);
		        }
		    }
		});
		
		$('#homepage_ntce').summernote(
			'code', ''
		);
		
	});
	
}]);