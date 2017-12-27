$.import("IQ_ERP.xs.customFunctionsLib", "testCompleteness");
$.import("IQ_ERP.xs.customFunctionsLib", "server");

var responseBody = '';
var statusText = '';
try {
	var conn = $.db.getConnection();

	//request body from chat webapp
	var reqBody = $.request.body.asString(); //asArrayBuffer();
	var reqUser = JSON.parse(reqBody).user;
	var time = new Date();
	var reqSPUser = JSON.parse(reqBody).sapUserId;
	reqBody = JSON.parse(reqBody).speech;

	var deleteQuery = 'DELETE FROM "IQERP_Schema"."IQ_ERP.data::metadataModel.ChatAnalysis"';
	var pstmtInsert = conn.prepareStatement(deleteQuery);
	pstmtInsert.executeQuery();
	conn.commit();
	var insertQuery = 'INSERT INTO "IQERP_Schema"."IQ_ERP.data::metadataModel.ChatAnalysis" VALUES(?,?)';
	pstmtInsert = conn.prepareStatement(insertQuery);
	pstmtInsert.setString(1, reqUser);
	pstmtInsert.setString(2, reqBody);
	pstmtInsert.executeQuery();
	statusText += "IQERP:" + reqBody;
	conn.commit();
	// 	insertQuery = 'INSERT INTO "IQERP_Schema"."IQ_ERP.data::metadataModel.ChatDump" VALUES(?,?,?,?)';
	// 	pstmtInsert = conn.prepareStatement(insertQuery);
	// 	pstmtInsert.setString(1, reqUser);
	// 	pstmtInsert.setString(2, reqBody);
	// 	pstmtInsert.setString(3, reqSPUser);
	// 	pstmtInsert.setString(4, time.toString());
	// 	pstmtInsert.executeQuery();
	// 	conn.commit();
	var loop = 0;
	var delay = 0;
	while (!loop > 0 || delay < 500) {
		var selectTA = 'SELECT "TA_TOKEN","TA_TYPE","TA_NORMALIZED","TA_OFFSET" FROM "IQERP_Schema"."$TA_IQ_ERP_Chat";';
		var resultSet = [];
		var pstmtSelect = conn.prepareStatement(selectTA);
		var rs = pstmtSelect.executeQuery();
		while (rs.next()) {
			var mapData = {
				TYPE: rs.getString(2),
				TOKEN: rs.getString(3)
			};
			loop++;
			resultSet.push(mapData);
		}
		delay++;
	}
	var queryCompletenesCode = $.IQ_ERP.xs.customFunctionsLib.testCompleteness.checkComplete(resultSet);
	if (queryCompletenesCode === -1) {
		//get default server
		var defaultServerCheck = $.IQ_ERP.xs.customFunctionsLib.server.getDefaultServer();
		if (defaultServerCheck !== -1) {
			statusText = "you have not set default server";
		} else {
			statusText = "Complete Request";
		}

	} else if (queryCompletenesCode === -2) {
		statusText = "One or more parameter missing";
	} else {
		//set default server.
		$.IQ_ERP.xs.customFunctionsLib.server.setDefaultServer(queryCompletenesCode);
		statusText = "Complete Request.Default server Updated";

	}
	// 	deleteQuery = 'DELETE FROM "IQERP_Schema}}"."$TA_IQ_ERP_FTI_Chat"';
	// 	pstmtInsert = conn.prepareStatement(deleteQuery);
	// 	pstmtInsert.executeQuery();

	conn.commit();
	conn.close();
} catch (e) {
	statusText += e.toString();
}
responseBody = {
	"result": statusText
};

// Send the results back
$.response.contentType = 'text/json';
$.response.setBody(JSON.stringify(responseBody));