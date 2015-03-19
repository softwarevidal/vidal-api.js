"use strict";

var PayloadFactory = (function(window) {
	var Payload = function(type, contents) {
		var _parse = function(type, payload) {
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
		},
		_contents = _parse(type, contents), 
		_type = type,
		_encoding = 'UTF-8';

		return {
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
			return Payload(type, contents);
		}
	}
})(window);

var VidalApiFactory = (function(window) {

	var VidalApi = function(app_id, app_key) {
		var _app_id = app_id,
			_app_key = app_key;

		function _authenticated(app_id, app_key, uri) {
			var questionMark = uri.indexOf('?'),
				anchorMark = uri.indexOf('#');
			if (questionMark >= 0 && (anchorMark === -1 || questionMark < anchorMark)) {
				return uri + "&app_id=" + app_id + "&app_key=" + app_key;
			}
			return uri + "?app_id=" + app_id + "&app_key=" + app_key;
		}	

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
			request.open("GET", _authenticated(_app_id, _app_key, uri));
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
			request.open("POST", _authenticated(_app_id, _app_key, uri));
			request.setRequestHeader("Accept", "application/atom+xml;charset=UTF-8");
			request.setRequestHeader('Content-Type', payload.type());
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
	};

	return {
		create: function(app_id, app_key) {
			return VidalApi(app_id, app_key);
		}
	};
})(window);
