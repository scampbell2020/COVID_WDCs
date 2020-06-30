(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "date",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "state",
            alias: "state abbreviation",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "positives",
            alias: "Positive Tests",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "totalTestsViral",
            alias: "Total Viral Tests",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "positiveTestsViral",
            alias: "Positive Viral Tests",
            dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "COVIDFeed",
            alias: "COVID Tracking Project data live feed for US",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://covidtracking.com/api/v1/us/daily.json", function(resp) {
            var feat = resp.features,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "date": feat[i]["date"],
                    "state": feat[i]["state"],
                    "positives": feat[i]["positives"],
                    "totalTestsViral": feat[i]["totalTestsViral"],
                    "positiveTestsViral": feat[i]["positiveTestsViral"]
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "COVID Tracking Project Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
