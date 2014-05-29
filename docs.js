module.exports = function (app, config) {
	var index = function (req, res) {
		var routes = [];

		extractRoutesFromMethod(routes, app.routes.get);
		extractRoutesFromMethod(routes, app.routes.post);
		extractRoutesFromMethod(routes, app.routes.put);
		extractRoutesFromMethod(routes, app.routes.delete);

		routes.sort(function(a,b) {
			if (a.path > b.path) return 1;
			if (b.path > a.path) return -1;
			return 0;
		});

		res.send({
			configuration: config.get("configuration"),
			endpoints: routes
		});
	};
	
	app.get('/api/docs', index);
	app.annotate('get', '/api/docs', { description: 'Fetch all API endpoints and annotations.' });
};

var extractRoutesFromMethod = function (routes, methodCollection) {
	if (methodCollection) {
		for(var i = 0; i < methodCollection.length; i++) {
			var route = methodCollection[i];
			routes.push({
				method: route.method,
				path: route.path.replace(".:format?", ""),
				description: route.description || "",
				queryParams: route.queryParams
			});
		}	
	}
}

