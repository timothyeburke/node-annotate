module.exports = function (app) {
	return {
		annotate: function (method, route, annotations) {
			var findRoute = function () {
				var r = null;
				if (app.routes && app.routes[method]) {
					for (var i = 0; i < app.routes[method].length; i++) {
						if (app.routes[method][i].path == route) {
							r = app.routes[method][i];
							break;
						}
					}
				}
				return r;
			}

			var r = findRoute();
			if (r) {
				r.description = annotations.description;
				r.queryParams = annotations.queryParams;
			}
		}
	}
}

