"use strict";

var PayloadFactory = (function(window) {
	var Payload = function(type, contents) {
		var _contents = _parse(contents), 
			_type = type,
			_encoding = 'UTF-8',
			_parse = function(type, payload) {
				var result;
				if (type !== 'application/x-www-form-urlencoded') {
					return payload;
				}
				for (var property in payload) {
					if (payload.hasOwnProperty(property)) {
						result += property + "=" + payload[property] + "&";
					}
				}
				return encodeURI(result.substring(0, result.length - 1));
			};

		return {
			size: function() {
				return Math.max(0, _contents.split(/%..|./).length);
			},
			type: function() {
				return _type;
			},
			encoding: function() {
				return _encoding;
			},
			payload: function() {
				return _contents;
			}
		};

	};

	return {
		create: function(contents, type) {
			if (typeof contents === 'undefined') {
				contents = "";
			}
			if (typeof type === 'undefined') {
				type = 'application/x-www-form-urlencoded';
			}
			return Payload(contents, type);
		}
	}
})(window);

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

	function _post(uri, callback, payload) {
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				callback.apply(
					this,
					[new DOMParser().parseFromString(request.responseText, "text/xml")]
				);
			}
		}
		request.open("POST", uri);
		request.setRequestHeader("Accept", "application/atom+xml;charset=UTF-8");
		request.setRequestHeader('Content-Type', payload.type());
		request.setRequestHeader("Content-Length", payload.size());
		request.setRequestHeader("Content-Encoding", payload.encoding());
		request.send(payload.payload());
	}

	return {
		/**
		 * Asynchronous GET requests, fetching atom+XML responses

		 * @param uri: target URI
		 * @param callback: callback to apply on the resulting XMLDocument
		 */
		get: _get,
		post: _post
	}
})(window);