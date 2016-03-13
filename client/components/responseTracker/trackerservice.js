/* Services */

app.service('responseTrackerService', function($http) {
	this.getData = function() {
		return $http.get("assets/downloads/api.json");
	}
});
