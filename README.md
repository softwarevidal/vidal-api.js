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

