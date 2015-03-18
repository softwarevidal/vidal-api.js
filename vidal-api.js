"use strict";
var VidalApi = (function(window) {

	function _get(uri, callback) {
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				callback.apply(
					this,
					[new DOMParser().parseFromString(request.responseText, "text/xml")]
				);
			}
		}
		request.open("GET", uri);
		request.setRequestHeader("Accept", "application/atom+xml;charset=UTF-8");
		request.send();
	}

	return {
		/**
		 * Asynchronous GET requests, fetching atom+XML responses

		 * @param uri: target URI
		 * @param callback: callback to apply on the resulting XMLDocument
		 */
		get: _get 
	}
})(window);