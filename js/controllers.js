function BmarkCntl($scope,$http){
    $http.get(swModule.constant.BOOK_MARK_URL).success(function(data, status, headers, config) {
		$scope.bookMarks = data;
	});
}

function DreamContl($scope,$http){
	$scope.getDreamList = function(){
		$http.get(swModule.constant.DREAM_URL).success(function(data, status, headers, config) {
			$scope.dreams = data;
		});	
	}
}

function ScheContl($scope,$http){
	$scope.getScheList = function(){
		$http.get(swModule.constant.SCHE_URL).success(function(data, status, headers, config) {
			$scope.sches = data;
		});		
	}
}