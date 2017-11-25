try {
	var client = $.request.parameters.get("ruleType");
	if (client === null) {
		$.response.setContentType("text/plain");
		$.response.setBody("Rule Type is null!");
	}
} catch (e) {
	$.response.setBody(JSON.stringify(e.message.toString()));
	conn.rollback();
}

var Data = $.request.parameters.get("ruleType");
var queryInst, queryDel;

queryInst =
	'INSERT INTO "S0014462381"."TermProcessingEngine.Z_PRJ_TEXT_ANALYSIS_XS.DATABASE_TABLES.APPLICATION_TABLES::motorDesc" VALUES(?)';
//queryDel =
//	'Delete from "S0014462381"."TermProcessingEngine.Z_PRJ_TEXT_ANALYSIS_XS.DATABASE_TABLES.APPLICATION_TABLES::motorDesc"';

var responseBody = '';
var statusText = '';

try {
	var conn = $.db.getConnection();
//	var pstmt = conn.prepareStatement(queryDel);
//	var rs = pstmt.execute();
	var data = Data.split(":");
	var i = 0;
	for (i = 0; i < data.length; i++) {
		var pstmtInsert = conn.prepareStatement(queryInst);
		pstmtInsert.setString(1, data[i]);
		pstmtInsert.execute();
	}
	conn.commit();
	conn.close();
} catch (e) {
	statusText += e.toString();
}
if(!statusText){
    statusText = "data saved successfully";
}
responseBody += statusText;
$.response.contentType = 'text/json';
$.response.setBody(responseBody);