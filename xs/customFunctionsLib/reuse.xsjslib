//array parse(parseString,parseDelimiter);
//string insertToHana(tableName,colArray,colValArray);


//----------------------function to parse data passed from UI begin-------------------------------//
//function to parse on some condition
function parse(parseString, parseDelimiter) {
	var parseArray = parseString.split(parseDelimiter);
	return parseArray;
}
//----------------------function to parse data passed from UI end-------------------------------//



//----------------------function to insert data to HANA  tables begin-------------------------------//
//prepare insert statment and return to the caller.
function insertToHana(tableName, colArray, colValArray) {
	var i = 0;
	var columnName, columnValues;

	//prepare column names.
	for (i = 0; i < colArray.length; i++) {
		columnName += "colArray[i]";
	}

	//prepare values to be inserted.
	for (i = 0; i < colValArray.length; i++) {
		columnValues += "colValArray[i]";
	}

	var insertStatement = 'INSERT INTO ' + tableName + ' (' + columnName + ') values' + columnValues;
	return insertStatement;
}
//----------------------function to insert data to HANA  tables end-------------------------------//