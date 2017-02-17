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
	
	$scope.selectNtceList = function() {
		var dataObj = {};
		var paramDataObj = {};
		
		addDataObj(jQuery, paramDataObj, "SVC_ID", "selectNtceList");
		addDataObj(jQuery, paramDataObj, "searchMenuCd", $scope.selectedNtceMenuCd);
		
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);

		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "코드", "N");
			
			hshelper_cd.init();
			hshelper_cd.setData(returnData.ntce_do);
			$scope.page_cd.totalItems = returnData.VARIABLE_MAP.cdCnt;
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	};
	
	function setCdGrid(){

		var hsc_ins = document.getElementById('hst_ntce');
		
		var metaData = {};
		metaData.colHeaders 	= ["", "No.",
		                    		"글번호", "제목", "등록자", "등록일시", "수정자", "수정일시"];
		metaData.colWidths 		= [42, 40,
		                   			60, 250, 100, 150, 100, 150]; 
		metaData.columns 		= [
		                 			{data: "CHK", type: "checkbox", readOnly:false},
		                 			{data: "RNK", type: "textCenter", readOnly:true},
		                 			{data: "NO", type: "textCenter", readOnly:true},
		                 			{data: "SUBJECT", type: "text", readOnly:true},
		                 			{data: "RGST_EMP", type: "textCenter", readOnly:true},
		                 			{data: "RGST_DTIM", type: "textCenter", readOnly:true},
		                 			{data: "CORCT_EMP", type: "textCenter", readOnly:true},
		                 			{data: "CORCT_DTIM", type: "textCenter", readOnly:true}
		                 		   ];
		metaData.heightVal		= 516;
		metaData.rowHeaders 	= false;
		metaData.chkAllColumnYn = true;
		
		hshelper_cd = new HandsontableHelper(hsc_ins, metaData);
		hshelper_cd.init();
		hshelper_cd.setData();
	};
	
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
	
	$("#modal-background, #modal-close, #modal-close2").click(
		function() {
			$("#modal-content,#modal-background")
					.toggleClass("active");
		}
	);
	
	$document.ready(function() {
		
		$scope.getNtceMenu();
		
		setCdGrid();

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