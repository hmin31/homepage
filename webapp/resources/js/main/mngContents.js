app.controller('ctr_mngContents', ['$scope', '$http', '$document', '$window', '$q', '$sce',
	function($scope, $http, $document, $window, $q, $sce) {

	var ctrUrl = '/mngContents.do';
	
	$scope.renderHtml = function(htmlCode) {
		return $sce.trustAsHtml(htmlCode);
	};
	
	// 
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
	
	$scope.getContentsMenu = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getContentsMenu");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "contents menu", "N");
			$scope.contentsMenu_do = returnData.contentsMenu_do;
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	$scope.getContentsDtlsHst = function() {
		
		if($scope.selectedContentsMenuCd != undefined) {
			var dataObj = {};
			var paramDataObj = {};
			addDataObj(jQuery, paramDataObj, "SVC_ID", "getContentsDtlsHst");
			addDataObj(jQuery, paramDataObj, "MENU_CD", $scope.selectedContentsMenuCd);
			addDataObj(jQuery, paramDataObj, "CTN_SEQ", $scope.selectedContentsMenuSeqCd);
			
			addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
			
			var afterSuccessFunc = function(returnData) {
				exceptionHandler(returnData.RESULT, "contents menu", "N");
				
				$('#homepage_contents').summernote(
						'code', returnData.VARIABLE_MAP.contetnsDtls || ''
				);
			};
			
			commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
			
		} else {
			bootbox.alert("메뉴를 선택해 주세요.");
		}
		
	}
	
	$scope.getContentsDtls = function() {
		
		if($scope.selectedContentsMenuCd != undefined) {
			var dataObj = {};
			var paramDataObj = {};
			addDataObj(jQuery, paramDataObj, "SVC_ID", "getContentsDtls");
			addDataObj(jQuery, paramDataObj, "MENU_CD", $scope.selectedContentsMenuCd);
			addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
			
			var afterSuccessFunc = function(returnData) {
				exceptionHandler(returnData.RESULT, "contents menu", "N");
				
				$scope.searchedMenuCd = $scope.selectedContentsMenuCd;
				
				$('#homepage_contents').summernote(
						'code', returnData.VARIABLE_MAP.contetnsDtls || ''
				);
				
				$scope.contentsMenuHstList_do = returnData.contentsMenuHstList_do;
			};
			
			commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
			
		} else {
			bootbox.alert("메뉴를 선택해 주세요.");
		}
		
	}
	
	$scope.mergeContentsDtls = function() {
		
		if($scope.selectedContentsMenuCd != undefined) {
			var dataObj = {};
			var paramDataObj = {};
			addDataObj(jQuery, paramDataObj, "SVC_ID", "mergeContentsDtls");
			addDataObj(jQuery, paramDataObj, "MENU_CD", $scope.searchedMenuCd);
			addDataObj(jQuery, paramDataObj, "CTN_DTLS", $('#homepage_contents').summernote('code'));
			addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
			
			var afterSuccessFunc = function(returnData) {
				exceptionHandler(returnData.RESULT, "contents menu", "N");
			};
			
			commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
			
		} else {
			bootbox.alert("메뉴를 선택해 주세요.");
		}
		
	}
	
	
	$scope.previewClick = function() {
		$("#modal-content,#modal-background").toggleClass("active");
		$("#modal-content,#modal-background").draggable();
		
		var htmlVar = $('#homepage_contents').summernote('code');
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
		
		$scope.sel_title = "테스트 타이틀";

		$('#homepage_contents').summernote({
			height: ($(window).height() - 300),
			callbacks: {
		        onImageUpload: function(image) {
		            uploadImage(image[0]);
		        }
		    }
		});
		
		$('#homepage_contents').summernote(
			'code', ''
		);
		
		$scope.getContentsMenu();
		
	});
	
}]);