//------------------check if an statement inputed by user is complete.--------------------------//
//the function returns code depending on conditions. 
//0 means everything present. -1 represents server is missing.-2 represents one or more term is missing. 
function checkComplete(resultSet) {
	var i = 0;
	var bAction = false;
	var bEntity = false;
	var bServer = false;
	var server = "";

	for (i = 0; i < resultSet.length; i++) {
		if (resultSet[i].TYPE === "SELECT") {
			bAction = true;
		}
		if (resultSet[i].TYPE === "BUSINESS_OBJECT") {
			bEntity = true;
		}
		if (resultSet[i].TYPE === "SERVER") {
			bServer = true;
			server = (resultSet[i].TOKEN).toUpperCase();
		}
	}
	if (bAction && bEntity) {
		if (bServer) {
			return server;
		} else {
			return "-1";
		}
	} else {
		return "-2";
	}
}