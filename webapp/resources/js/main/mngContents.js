app.controller('ctr_mngContents', function($scope, $http, $document, $window, $q) {

	$document.ready(function() {
		$scope.sel_title = "테스트 타이틀";
		
//		$('#summernote').summernote({
//        });
		
		
		var wysiwyg_str = '<div class="col-md-12"><input class="btn btn-default" type="button" value="Save" ng-click="savePost()"/><input class="btn btn-default" type="button" value="Complete" ng-click="completeClick(sel_id)" ng-hide="!completeButtonBool"/><input class="btn btn-default" type="button" value="Cancel Completion" ng-click="cancelCompletionClick(sel_id)" ng-hide="completeButtonBool"/><input class="btn btn-default" type="button" value="Cancel" ng-click="cancleClickAtDetail()"/><input class="form-control" name="sel_id" type="text" ng-model="sel_id" ng-hide="true"/></div>';

		$('#summernote').summernote('code', wysiwyg_str);
		
	});

//	
//	$("#modal-content,#modal-background").toggleClass("active");
//	$("#modal-content,#modal-background").draggable();
	
});