//-----------------------get default server-----------------------------------//
var dbConn = $.db.getConnection();

function getDefaultServer() {
	var dfS = 'SELECT "SERVER",	"ISDEFAULT" FROM "IQERP_Schema"."IQ_ERP.data::metadataModel.SERVER_INSTANCES" where ISDEFAULT = FALSE';
	var defaultServer = '';
	var pstmtSelect = dbConn.prepareStatement(dfS);
	var rs = pstmtSelect.executeQuery();
	while (rs.next()) {
		defaultServer = rs.getString(1);
	}
	dbConn.commit();
	dbConn.close();
	if (defaultServer) {
		return defaultServer;
	} else {
		return -1;
	}

}

//-----------------------update default server-----------------------------------//

function setDefaultServer(serverName) {
	var dfS = 'UPDATE "IQERP_Schema"."IQ_ERP.data::metadataModel.SERVER_INSTANCES" SET ISDEFAULT = FALSE WHERE ISDEFAULT = TRUE;';
	var pstmtSelect = dbConn.prepareStatement(dfS);
	pstmtSelect.execute();
	dbConn.commit();
     
     var whereQuery = "('" + serverName + "')";
	dfS = 'UPDATE "IQERP_Schema"."IQ_ERP.data::metadataModel.SERVER_INSTANCES" SET ISDEFAULT = TRUE WHERE SERVER IN ' + whereQuery;
	pstmtSelect = dbConn.prepareStatement(dfS);
	pstmtSelect.execute();
	dbConn.commit();
	dbConn.close();

}