app.controller('ctr_mngNtce', function($scope, $http, $document, $window, $q) {
	
	var ctrUrl = '/mngNtce.do';
	
	var hshelper_cd;
	
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
		
		if($scope.selectedNtceMenuCd != undefined) {
			var dataObj = {};
			var paramDataObj = {};
			
			addDataObj(jQuery, paramDataObj, "SVC_ID", "selectNtceList");
			addDataObj(jQuery, paramDataObj, "srchMenuCd", $scope.selectedNtceMenuCd);
			
			addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
			
			var afterSuccessFunc = function(returnData) {
				exceptionHandler(returnData.RESULT, "코드", "N");
				
				hshelper_cd.init();
				hshelper_cd.setData(returnData.ntce_do);
				$scope.totalItems = returnData.VARIABLE_MAP.ntce_cnt;
			};
			
			commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
			
		} else {
			bootbox.alert("메뉴를 선택해 주세요.");
		}
	};
	
	function setCdGrid(){
		var hsc_ins = document.getElementById('hst_ntce');
		
		var metaData = {};
		metaData.colHeaders 	= ["글번호", "제목", "게시여부", "조회수", "등록자", "등록일시", "수정자", "수정일시"];
		metaData.colWidths 		= [60, 250, 100, 60, 120, 150, 120, 150]; 
		metaData.columns 		= [
		                 			{data: "BLTN_NUM", type: "textCenter", readOnly:true},
		                 			{data: "TITL", type: "text", readOnly:true},
		                 			{data: "USE_YN", type: "textCenter", readOnly:true},
		                 			{data: "INQ_CNT", type: "textCenter", readOnly:true},
		                 			{data: "RGST_EMP", type: "textCenter", readOnly:true},
		                 			{data: "RGST_DTIM", type: "textCenter", readOnly:true},
		                 			{data: "CORCT_EMP", type: "textCenter", readOnly:true},
		                 			{data: "CORCT_DTIM", type: "textCenter", readOnly:true}
		                 		   ];
		metaData.heightVal		= 516;
		metaData.rowHeaders 	= false;
		
		metaData.afterOnCellMouseDownCallback = function(hsi, row, column, erow, ecolumn) {
			//sort index
			var selRow = row;
			if(hsi.sortIndex != undefined && hsi.sortIndex.length > 0) {
				if(hsi.sortIndex.length > selRow) {
					selRow = hsi.sortIndex[selRow][0];
				}
			}
			
			if(hshelper_cd.getHsGridData()[selRow].ROW_STATUS != 'I') {

				$("#modal-content,#modal-background").toggleClass("active");
				$("#modal-content,#modal-background").draggable();
				
				$scope.$apply(function() {
				
					var tempValue = hshelper_cd.getHsGridData()[selRow];
					$scope.layer_input = {};
					$scope.layer_input.ROW_STATUS="U";//Update
					addDataMapObj(jQuery, $scope.layer_input, tempValue);
					
					$('#homepage_ntce').summernote(
						'code', $scope.layer_input.CTN || ''
					);
					
					$(".selMenuCd").attr("disabled", true);
					/*if(readOnlyYn == false) $("#delBtn").show();*/
					$("#delBtn").show();
				});
			}
		}
		
		hshelper_cd = new HandsontableHelper(hsc_ins, metaData);
		hshelper_cd.init();
		hshelper_cd.setData();
	};
	
	$scope.addNtce = function() {
		$scope.layer_input = {};
		$scope.layer_input.ROW_STATUS="I"; //Insert
		
		$('#homepage_ntce').summernote(
			'code', ''
		);
		
		$(".selMenuCd").attr("disabled", false);
		$("#delBtn").hide();
		
		$("#modal-content,#modal-background").toggleClass("active");
		$("#modal-content,#modal-background").draggable();
	}
	
	$scope.saveNtce = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "saveNtce");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		
		$scope.layer_input.CTN = $('#homepage_ntce').summernote('code');

		var layerInputObj = [];
		layerInputObj[0] = $scope.layer_input;
		addDataObj(jQuery, dataObj, "layer_input", layerInputObj);
		
		if(lengthCheck(dataObj.layer_input, {TITL: 500, BLTN_SEQ: 5}, ["제목", "정렬순서"])) return;
		if(mandantoryColumnCheck(dataObj.layer_input, ["MENU_CD", "USE_YN", "BLTN_SEQ", "TITL"], ["메뉴", "게시여부", "정렬순서", "제목"])) return;

		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "저장", "Y");
			$("#modal-content, #modal-background").toggleClass("active");
			$scope.selectNtceList();
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	}
			
	$scope.delNtce = function() {
		var dataObj = {};
		var paramDataObj = {};
		addDataObj(jQuery, paramDataObj, "SVC_ID", "saveNtce");
		addDataObj(jQuery, dataObj, "PARAM_MAP", paramDataObj);
		
		$scope.layer_input.ROW_STATUS="D"; //Delete
		
		var layerInputObj = [];
		layerInputObj[0] = $scope.layer_input;
		addDataObj(jQuery, dataObj, "layer_input", layerInputObj);
		
		if(mandantoryColumnCheck(dataObj.layer_input, ["USE_YN", "TITL"])) return;

		var afterSuccessFunc = function(returnData) {
			exceptionHandler(returnData.RESULT, "삭제", "Y");
			$("#modal-content, #modal-background").toggleClass("active");
			$scope.selectNtceList();
		};
		
		commonHttpPostSender($http, ctrUrl, dataObj, afterSuccessFunc);
	};
	
	$scope.renderHtml = function(htmlCode) {
		return $sce.trustAsHtml(htmlCode);
	};
	
	$scope.previewClick = function() {
		$("#modal-content-preview,#modal-background2").toggleClass("active");
		$("#modal-content-preview,#modal-background2").draggable();
		
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
	
	$("#modal-background, #modal-background2, #modal-close, #modal-close2, #modal-close3").click(
		function() {
			$("#modal-content,#modal-background").toggleClass("active");
			//$("#modal-content-preview,#modal-background2").toggleClass("active");
		}
	);
	
	$document.ready(function() {
		
		$scope.getNtceMenu();
		
		setCdGrid();
		
		$('#homepage_ntce').summernote({
			height: 350,
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
	
});