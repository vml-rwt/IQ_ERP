var responseBody = '';
var statusText = '';
try {
	var conn = $.db.getConnection();
	//var ENTITY = $.request.parameters.get("ENTITY");
var ENTITY = "test1";
	if (ENTITY === null) {
		$.response.setContentType("text/plain");
		$.response.setBody("Entity not found!");
	}


var createMetaTabQuery = 'SELECT TOP 1000 "ENTITY", "TABNAME", "ATTRIBUTE", "TYPE_ATTRIBUTE", "LENGTH_ATTRIBUTE", "SEARCHABLE",'+
	' "POSSIBLE_VALUES", "ALTERNATE_NAMES" FROM "IQERP_Schema"."IQ_ERP.data::metadataModel.Z_test1_MetaData"';
	var pstmtInsert = conn.prepareStatement(createMetaTabQuery);
	var rs = pstmtInsert.executeQuery();
	var EntityMetaData = [];
	
	while(rs.next()) 
        {
            var EntMetadataObj={};
            EntMetadataObj.ENTITY = rs.getString(1);
            EntMetadataObj.TABNAME = rs.getString(2);
            EntMetadataObj.ATTRIBUTE = rs.getString(3);
            EntMetadataObj.TYPE_ATTRIBUTE = rs.getString(4);
            EntMetadataObj.LENGTH_ATTRIBUTE = rs.getString(5);
            EntMetadataObj.SEARCHABLE = rs.getString(6);
            EntMetadataObj.POSSIBLE_VALUES = rs.getString(7);
            EntMetadataObj.ALTERNATE_NAMES = rs.getString(8);
                 
            EntityMetaData.push(EntMetadataObj);
        }
	
	statusText += EntityMetaData;

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
$.response.setBody(JSON.stringify(EntityMetaData));