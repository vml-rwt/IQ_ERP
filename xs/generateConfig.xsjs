var statusText, dbConn, reqBody, reqObjects, responseBody, configText;
statusText = dbConn = " ";
try {
	dbConn = $.db.getConnection();
	reqBody = $.request.body.asString();
	reqObjects = JSON.parse(reqBody);
	
	//configuration details passed from UI
	var reqConfigObjects = reqObjects.configParams.split(':');
	var i = 0;
	for (i = 0; i < reqConfigObjects.length; i++) {
		configText += "< entity_name standard_form = " + reqConfigObjects[i] + " />";
	}
	statusText = configText;
} catch (e) {
	statusText = e.message.toString();
	dbConn.rollback();
}

responseBody = {
	"result": statusText
};

// Send the results back
$.response.contentType = 'text/json';
$.response.setBody(JSON.stringify(responseBody));