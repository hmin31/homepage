app.controller('ctr_mngImages', ['$scope', '$http', '$document', '$window', '$q', '$sce',
	function($scope, $http, $document, $window, $q, $sce) {

	var ctrUrl = '/mngImages.do';
	
	var hshelper_image;
	
	$scope.renderHtml = function(htmlCode) {
		return $sce.trustAsHtml(htmlCode);
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
	
	$scope.getImageDtls = function() {

		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "IMAGE_NM", $scope.searched_imageNm);
		addDataObj(jQuery, paramDataObj, "SVC_ID", "getImageList");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		
		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "", "N");
			
			hshelper_image.setData(returnData.imageList_do);
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
	
	function setImageGrid() {
		
		var do_codeObj = {};
		var hsc_ins = document.getElementById('hst_image');
		
		var metaData = {};
		metaData.colHeaders 		= ["Image ID", "Image name", "Imae extension", "Image size", "regist user", "regist date"];
		metaData.colWidths 			= [240, 200, 80, 80, 80, 80];
		metaData.columns 			= [
			   						   	{data: "IMAGE_ID", type: "text", readOnly: true},
				   					   	{data: "IMAGE_NM", type: "text", readOnly: true},
				   						{data: "IMAGE_EXT", type: "text", readOnly: true},
				   						{data: "IMAGE_SIZE", type: "text", readOnly: true},
				   						{data: "RGST_EMP_NUM", type: "text", readOnly: true},
				   						{data: "RGST_DTIM", type: "text", readOnly: true},
		                 			   ];
		
		metaData.heightVal			= 300;
		metaData.rowHeaders 		= false;
		
		metaData.afterSelectionEndCallback = function(hsi, row, column, erow, ecolumn) {
			$scope.img_url = '/imageDisplay.do?id=' + hsi.getData()[row][0];
	    };
		
		hshelper_image = new HandsontableHelper(hsc_ins, metaData);
		hshelper_image.init();
		hshelper_image.setData();
	}
	
	$scope.previewClick = function() {
		$("#modal-content,#modal-background").toggleClass("active");
		$("#modal-content,#modal-background").draggable();

	}
						
	$("#modal-background, #modal-close, #modal-close2").click(
		function() {
			$("#modal-content,#modal-background")
					.toggleClass("active");
		}
	);
	
	$scope.uploadFileChanged = function(files) {
		$scope.uploadFile = files[0];
	}

	$scope.fileUpload = function() {
		var fileUploadUrl = "/imageUpload.do";

		if ($scope.uploadFile != undefined && $scope.uploadFile != null) {
			var formData = new FormData();
			formData.append('fileId', $scope.uploadFile);
			
			$http.post(fileUploadUrl, formData, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			}).success(function() {
				bootbox.alert($scope.uploadFile.name + " 파일이 업로드 되었습니다.");
				$scope.getImageDtls();
				
			}).error(function(data, status, headers, config) {
//				alert('error: ' + status);
			});
		} else {
			bootbox.alert("업로드할 파일을 선택해 주십시오.");
		}

	}
	
	$document.ready(function() {
		
		setImageGrid();
		
	});
	
}]);