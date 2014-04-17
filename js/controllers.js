function BmarkCntl($scope){
	$scope.bookMarks = null;

	$scope.getBookMarks = function(){
		$.getJSON(swModule.constant.BOOK_MARK_URL,function(data){
		    $scope.bookMarks = data;
		});
	}
}