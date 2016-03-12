/* Services */

app.service('responseTrackerService', function($http) {
	this.getData = function() {
		return $http.get("http://localhost:8079/assets/downloads/api.json");
		// return $http.get("http://192.168.0.23/angular-demo/assets/downloads/api.json");
		// return $http.get("http://kterns.com/angular-demo/assets/downloads/api.json");
	}
});
