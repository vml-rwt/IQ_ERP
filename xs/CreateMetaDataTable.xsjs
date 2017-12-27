var responseBody = '';
var statusText = '';
try {
	var conn = $.db.getConnection();
	var ENTITY = $.request.parameters.get("ENTITY");
	var Scenario = $.request.parameters.get("Scenario");
//var ENTITY = "test1";
	if (ENTITY === null) {
		$.response.setContentType("text/plain");
		$.response.setBody("Entity not found!");
	}


/*var destination;
var client;
var request;
var employeeID;
//Read the input employee number which is to be read
employeeID = $.request.parameters.get("EMPID");
try{
    //Reading the destination properties
    destination = $.net.http.readDestination("gateway");
    //Creating HTTP Client
    client = new $.net.http.Client();
    //Creating Request
    request = new $.web.WebRequest($.net.http.GET,"ET_ENTITYSet/?$filter=ITabname eq 'MARA'");
    client.request(request,destination);
    //Getting the response body and setting as output data
    $.response.setBody(client.getResponse().body.asString());
}
catch(errorObj){
  $.response.setBody(JSON.stringify({
  ERROR : errorObj.message
  }));
}*/



var createMetaTabQuery = 'CREATE COLUMN TABLE "IQERP_Schema"."IQ_ERP.data::metadataModel.Z_'+ 
    ENTITY +'_MetaData"'+ '( '+
    '"ENTITY" NVARCHAR(100) NOT NULL, '+
    '"TABNAME" NVARCHAR(100) NOT NULL, '+
    '"ATTRIBUTE" NVARCHAR(100) NOT NULL, '+
    '"TYPE_ATTRIBUTE" NVARCHAR(100), '+
    '"LENGTH_ATTRIBUTE" NVARCHAR(10), '+
    '"SEARCHABLE" NVARCHAR(3), '+
    '"POSSIBLE_VALUES" NVARCHAR(5000), '+
    '"ALTERNATE_NAMES" NVARCHAR(5000), '+
    'PRIMARY KEY ( '+
		'"ENTITY", "TABNAME", "ATTRIBUTE" '+
	    ')'+
	')';
	var pstmtInsert = conn.prepareStatement(createMetaTabQuery);
	pstmtInsert.execute();
	statusText += "Created";

	conn.commit();
	conn.close();
} catch (e) {
   statusText =	e.message.toString();
	conn.rollback();
}

responseBody = {
	"result": statusText
};

// Send the results back
$.response.contentType = 'text/json';
$.response.setBody(JSON.stringify(responseBody));