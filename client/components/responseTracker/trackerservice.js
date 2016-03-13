/* Services */

app.service('responseTrackerService', function($http) {
	this.getData = function() {
		return $http.get("http://localhost:8079/assets/downloads/api.json");
		// return $http.get("http://192.168.0.23/response-tracker/assets/downloads/api.json");
		// return $http.get("http://kterns.com/response-tracker/assets/downloads/api.json");
	}
});
