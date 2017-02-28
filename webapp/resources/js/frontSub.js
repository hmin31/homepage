app.controller('ctr_frontSub', [ '$scope', '$http', '$document', '$window', '$q', '$sce', '$routeParams', 
	function($scope, $http, $document, $window, $q, $sce, $routeParams) {

	$scope.getParams = $routeParams;
	
	$document.ready(function() {
		$scope.getAllFrontPageContents();
	});
	
} ]);