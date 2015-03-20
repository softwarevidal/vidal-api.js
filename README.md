# Vidal-api.js

To kickstart your project into calling the [Vidal API](https://vidal.3scale.net/docs/api_fr).

## Getting started

### Preliminary steps

 1. Make sure your [3scale](https://vidal.3scale.net/) access is properly configured. If so, you should know your application ID (e.g. `"MY_APP_ID"`) and access key (e.g. `"MY_APP_KEY"`).
 1. Then, all you need to do is include the following Javascript file (latest version): `https://softwarevidal.github.io/vidal-api.js/vidal-api.js`

Finally, you can try the following examples and tailor them to your needs.
Please note they are run against our BETA environment, please contact `editeurs AT vidal DOT net` for further information.

### GET requests

 1. include `https://softwarevidal.github.io/vidal-api.js/vidal-api.js` (latest version)
 2. 
```javascript
	var callback = function(xmlDoc) {
		// awesome callback here
	};

	VidalApiFactory.create('MY_APP_ID', 'MY_APP_KEY').get("http://apirest-beta.vidal.fr/rest/api/molecules?startwith=a", callback);
```

### POST requests

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

	VidalApiFactory.create('MY_APP_ID', 'MY_APP_KEY').post("http://apirest-beta.vidal.fr/rest/api/alerts", callback, payload);
```

## Troubleshooting

Please feel free to open an [issue](https://github.com/softwarevidal/vidal-api.js/issues), with as many details as possible.
