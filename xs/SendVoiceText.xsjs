var responseBody = '';
var statusText = '';
try {
	var conn = $.db.getConnection();
	
	//request body from chat webapp
	var reqBody = $.request.body.asString(); //asArrayBuffer();
     reqBody = JSON.parse(reqBody).speech;
    
    
	var selQueryToCheckSeq = 'Select COUNT(*) from "S0014462381"."iERP.data::Chat" AS ChatContent';
	var pstmt = conn.prepareStatement(selQueryToCheckSeq);
	var rs = pstmt.executeQuery();
	var count = "";
	var countString = "";
	while (rs.next()) {
		count = rs.getInteger(1);
		countString = count.toString();
	}

      if(!countString){
          countString++;
      }
	var insertQuery = 'INSERT INTO "S0014462381"."iERP.data::Chat" VALUES(?,?)';
	var pstmtInsert = conn.prepareStatement(insertQuery);
	pstmtInsert.setString(1, countString);
	pstmtInsert.setString(2, reqBody);
	pstmtInsert.executeQuery();
	statusText += "I have received '" + reqBody + "'. The request is being processed";

	conn.commit();
	conn.close();
} catch (e) {
	statusText += e.toString();
}
responseBody = {"result": statusText};

// Send the results back
$.response.contentType = 'text/json';
$.response.setBody(JSON.stringify(responseBody));