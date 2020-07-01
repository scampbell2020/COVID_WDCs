(function () {
var myConnector = tableau.makeConnector();
myConnector.getSchema = function (schemaCallback) {
var cols = [
{ id : "date", dataType : tableau.dataTypeEnum.int },
{ id : "state", dataType : tableau.dataTypeEnum.string },
{ id : "fips", dataType : tableau.dataTypeEnum.string },
{ id : "checkTimeEt", dataType : tableau.dataTypeEnum.string },
{ id : "commercialScore", dataType : tableau.dataTypeEnum.int },
{ id : "dataQualityGrade", dataType : tableau.dataTypeEnum.string },
{ id : "dateChecked", dataType : tableau.dataTypeEnum.string },
{ id : "dateModified", dataType : tableau.dataTypeEnum.string },
{ id : "death", dataType : tableau.dataTypeEnum.int },
{ id : "deathIncrease", dataType : tableau.dataTypeEnum.int },
{ id : "grade", dataType : tableau.dataTypeEnum.string },
{ id : "hash", dataType : tableau.dataTypeEnum.string },
{ id : "hospitalized", dataType : tableau.dataTypeEnum.int },
{ id : "hospitalizedCumulative", dataType : tableau.dataTypeEnum.int },
{ id : "hospitalizedCurrently", dataType : tableau.dataTypeEnum.int },
{ id : "hospitalizedIncrease", dataType : tableau.dataTypeEnum.int },
{ id : "inIcuCumulative", dataType : tableau.dataTypeEnum.int },
{ id : "inIcuCurrently", dataType : tableau.dataTypeEnum.int },
{ id : "lastUpdateEt", dataType : tableau.dataTypeEnum.string },
{ id : "negative", dataType : tableau.dataTypeEnum.int },
{ id : "negativeIncrease", dataType : tableau.dataTypeEnum.int },
{ id : "negativeRegularScore", dataType : tableau.dataTypeEnum.int },
{ id : "negativeScore", dataType : tableau.dataTypeEnum.int },
{ id : "negativeTestsViral", dataType : tableau.dataTypeEnum.int },
{ id : "onVentilatorCumulative", dataType : tableau.dataTypeEnum.int },
{ id : "onVentilatorCurrently", dataType : tableau.dataTypeEnum.int },
{ id : "pending", dataType : tableau.dataTypeEnum.int },
{ id : "posNeg", dataType : tableau.dataTypeEnum.int },
{ id : "positive", dataType : tableau.dataTypeEnum.int },
{ id : "positiveCasesViral", dataType : tableau.dataTypeEnum.int },
{ id : "positiveIncrease", dataType : tableau.dataTypeEnum.int },
{ id : "positiveScore", dataType : tableau.dataTypeEnum.int },
{ id : "positiveTestsViral", dataType : tableau.dataTypeEnum.int },
{ id : "recovered", dataType : tableau.dataTypeEnum.int },
{ id : "score", dataType : tableau.dataTypeEnum.int },
{ id : "total", dataType : tableau.dataTypeEnum.int },
{ id : "totalTestResults", dataType : tableau.dataTypeEnum.int },
{ id : "totalTestResultsIncrease", dataType : tableau.dataTypeEnum.int },
{ id : "totalTestsViral", dataType : tableau.dataTypeEnum.int }
];
var tableInfo = {
id : "COVID",
alias : "COVID Tracking Project Data - State Daily",
columns : cols
};
schemaCallback([tableInfo]);
};
myConnector.getData = function(table, doneCallback) {
$.getJSON("https://covidtracking.com/api/v1/states/daily.json", function(resp) {
var feat = resp;
tableData = [];
// Iterate over the JSON object
for (var i = 0, len = feat.length; i < len; i++) {
tableData.push({
"date": feat[i].date,
"state": feat[i].state,
"fips": feat[i].fips,
"checkTimeEt": feat[i].checkTimeEt,
"commercialScore": feat[i].commercialScore,
"dataQualityGrade": feat[i].dataQualityGrade,
"dateChecked": feat[i].dateChecked,
"dateModified": feat[i].dateModified,
"death": feat[i].death,
"deathIncrease": feat[i].deathIncrease,
"grade": feat[i].grade,
"hash": feat[i].hash,
"hospitalized": feat[i].hospitalized,
"hospitalizedCumulative": feat[i].hospitalizedCumulative,
"hospitalizedCurrently": feat[i].hospitalizedCurrently,
"hospitalizedIncrease": feat[i].hospitalizedIncrease,
"inIcuCumulative": feat[i].inIcuCumulative,
"inIcuCurrently": feat[i].inIcuCurrently,
"lastUpdateEt": feat[i].lastUpdateEt,
"negative": feat[i].negative,
"negativeIncrease": feat[i].negativeIncrease,
"negativeRegularScore": feat[i].negativeRegularScore,
"negativeScore": feat[i].negativeScore,
"negativeTestsViral": feat[i].negativeTestsViral,
"onVentilatorCumulative": feat[i].onVentilatorCumulative,
"onVentilatorCurrently": feat[i].onVentilatorCurrently,
"pending": feat[i].pending,
"posNeg": feat[i].posNeg,
"positive": feat[i].positive,
"positiveCasesViral": feat[i].positiveCasesViral,
"positiveIncrease": feat[i].positiveIncrease,
"positiveScore": feat[i].positiveScore,
"positiveTestsViral": feat[i].positiveTestsViral,
"recovered": feat[i].recovered,
"score": feat[i].score,
"total": feat[i].total,
"totalTestResults": feat[i].totalTestResults,
"totalTestResultsIncrease": feat[i].totalTestResultsIncrease,
"totalTestsViral": feat[i].totalTestsViral
});
}
table.appendRows(tableData);
doneCallback();
});
};
tableau.registerConnector(myConnector);
$(document).ready(function () {
$("#submitButton").click(function () {
tableau.connectionName = "COVID Tracking Project - State Daily";
tableau.submit();
});
});})();
