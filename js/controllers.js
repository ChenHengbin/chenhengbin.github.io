function BmarkCntl($scope,$http){
	$scope.bookMarks = null;


        $http.get(swModule.constant.BOOK_MARK_URL).success(function(data, status, headers, config) {
			$scope.bookMarks = data;
		});

}