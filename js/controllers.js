function BmarkCntl($scope){
	$scope.bookMarks = getBookMarks();

	function getBookMarks(){
		$.getJSON(swModule.constant.BOOK_MARK_URL,function(data){
		    $scope.bookMarks = data;
		    $("#BookMark").show();
		});
	}
}