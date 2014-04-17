function BmarkCntl($scope){
	$scope.bookMarks = null;

	function getBookMarks(){
		$.getJSON(swModule.constant.BOOK_MARK_URL,function(data){
		    $scope.bookMarks = data;
		});
	}
}