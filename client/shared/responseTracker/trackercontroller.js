/* Controllers */

app.controller('responseTrackerController', function($scope, responseTrackerService) {
  init();

	function init() {
		trackersService.getData()
      .then(function(response) {
        $scope.tabs = response.data.categories;
        $scope.sites = response.data.sites;

        $scope.selectedTab = 0; //set selected tab to the 1st by default.
      });
	}

  /** Function to set selectedTab **/
	$scope.selectTab = function(index){
		$scope.selectedTab = index;
	}
});
