# Vidal-api.js

To kickstart your project into calling the [Vidal API](https://vidal.3scale.net/docs/api_fr).

## GET requests

 1. include `vidal-api.js`
 2. 
```javascript
	var callback = function(xmlDoc) {
		// awesome callback here
	};

	VidalApi.get("http://api.vidal.fr/rest/api/molecules?startwith=a", callback);
```

## POST requests

 1. include `vidal-api.js`
 2.
```javascript
	var callback = function(xmlDoc) {
		// awesome callback here
	},
	contents = "\
<?xml version='1.0' encoding='UTF-8' standalone='yes'?> \
<prescription> \
	<!-- etc etc --> \
</prescription>";
		// default payload type is: 'application/x-www-form-urlencoded'
		payload = PayloadFactory.create(contents, "text/xml");

	VidalApi.post("http://api.vidal.fr/rest/api/alerts", callback, payload);
```