(function () {
var myConnector = tableau.makeConnector();
myConnector.getSchema = function (schemaCallback) {
var cols = [
{ id : "date", alias:"Date", dataType : tableau.dataTypeEnum.date },
{ id : "state", alias: "State Abbreviation",dataType : tableau.dataTypeEnum.string },
{ id : "totalTestsViral",alias: "Total Viral Tests", dataType : tableau.dataTypeEnum.int },
{ id : "positiveTestsViral",alias: "Positive Viral Tests", dataType : tableau.dataTypeEnum.int }
];
var tableInfo = {
id : "COVID",
alias : "COVID Tracking Project Data",
columns : cols
};
schemaCallback([tableInfo]);
};
myConnector.getData = function(table, doneCallback) {
$.getJSON("https://covidtracking.com/api/v1/states/daily.json", function(resp) {
var feat = resp.array;
tableData = [];
// Iterate over the JSON object
for (var i = 0, len = feat.length; i < len; i++) {
tableData.push({
"date": feat[i].date,
"state": feat[i].state,
"totalTestsViral": feat[i].totalTestsViral,
"positiveTestsViral": feat[i].positiveTestsViral
});
}
table.appendRows(tableData);
doneCallback();
});
};
tableau.registerConnector(myConnector);
$(document).ready(function () {
$("#submitButton").click(function () {
tableau.connectionName = "COVID";
tableau.submit();
});
});})();
