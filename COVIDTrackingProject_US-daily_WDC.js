(function () {
var myConnector = tableau.makeConnector();
myConnector.getSchema = function (schemaCallback) {
var cols = [
{ id : "date", dataType : tableau.dataTypeEnum.int },
{ id : "dateChecked", dataType : tableau.dataTypeEnum.string },
{ id : "death", dataType : tableau.dataTypeEnum.int },
{ id : "deathIncrease", dataType : tableau.dataTypeEnum.int },
{ id : "hash", dataType : tableau.dataTypeEnum.string },
{ id : "hospitalized", dataType : tableau.dataTypeEnum.int },
{ id : "hospitalizedCumulative", dataType : tableau.dataTypeEnum.int },
{ id : "hospitalizedCurrently", dataType : tableau.dataTypeEnum.int },
{ id : "hospitalizedIncrease", dataType : tableau.dataTypeEnum.int },
{ id : "inIcuCumulative", dataType : tableau.dataTypeEnum.int },
{ id : "inIcuCurrently", dataType : tableau.dataTypeEnum.int },
{ id : "lastModified", dataType : tableau.dataTypeEnum.string },
{ id : "negative", dataType : tableau.dataTypeEnum.int },
{ id : "negativeIncrease", dataType : tableau.dataTypeEnum.int },
{ id : "onVentilatorCumulative", dataType : tableau.dataTypeEnum.int },
{ id : "onVentilatorCurrently", dataType : tableau.dataTypeEnum.int },
{ id : "pending", dataType : tableau.dataTypeEnum.int },
{ id : "positive", dataType : tableau.dataTypeEnum.int },
{ id : "positiveIncrease", dataType : tableau.dataTypeEnum.int },
{ id : "posNeg", dataType : tableau.dataTypeEnum.int },
{ id : "recovered", dataType : tableau.dataTypeEnum.int },
{ id : "states", dataType : tableau.dataTypeEnum.int },
{ id : "total", dataType : tableau.dataTypeEnum.int },
{ id : "totalTestResults", dataType : tableau.dataTypeEnum.int },
{ id : "totalTestResultsIncrease", dataType : tableau.dataTypeEnum.int }
];
var tableInfo = {
id : "COVID",
alias : "COVID Tracking Project Data - US Daily",
columns : cols
};
schemaCallback([tableInfo]);
};
myConnector.getData = function(table, doneCallback) {
$.getJSON("https://covidtracking.com/api/v1/us/daily.json", function(resp) {
var feat = resp;
tableData = [];
// Iterate over the JSON object
for (var i = 0, len = feat.length; i < len; i++) {
tableData.push({
"date": feat[i].date,
"dateChecked": feat[i].dateChecked,
"death": feat[i].death,
"deathIncrease": feat[i].deathIncrease,
"hash": feat[i].hash,
"hospitalized": feat[i].hospitalized,
"hospitalizedCumulative": feat[i].hospitalizedCumulative,
"hospitalizedCurrently": feat[i].hospitalizedCurrently,
"hospitalizedIncrease": feat[i].hospitalizedIncrease,
"inIcuCumulative": feat[i].inIcuCumulative,
"inIcuCurrently": feat[i].inIcuCurrently,
"lastModified": feat[i].lastModified,
"negative": feat[i].negative,
"negativeIncrease": feat[i].negativeIncrease,
"onVentilatorCumulative": feat[i].onVentilatorCumulative,
"onVentilatorCurrently": feat[i].onVentilatorCurrently,
"pending": feat[i].pending,
"positive": feat[i].positive,
"positiveIncrease": feat[i].positiveIncrease,
"posNeg": feat[i].posNeg,
"recovered": feat[i].recovered,
"states": feat[i].states,
"total": feat[i].total,
"totalTestResults": feat[i].totalTestResults,
"totalTestResultsIncrease": feat[i].totalTestResultsIncrease
});
}
table.appendRows(tableData);
doneCallback();
});
};
tableau.registerConnector(myConnector);
$(document).ready(function () {
$("#submitButton").click(function () {
tableau.connectionName = "COVID Tracking Project - US Daily";
tableau.submit();
});
});})();
