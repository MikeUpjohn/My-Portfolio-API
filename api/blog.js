var AWS = require('aws-sdk');

const createPost = (someText) => {
    var myObject = {
        ID: {N: '475'},
        BlogText: {S:"Hello my name is Mike!"},
        AnotherTestString: {S: "Hello again!"},
        FinalEntry: {N: '001'}
    };

    AWS.config.update({region: 'eu-west-1'});

    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    var params = {
        TableName: 'MikeTest',
        Item: myObject
    };

    ddb.putItem(params, function(error, data) {
        if(error) {
            console.log("Error: " + error);
        }
        else {
            console.log("Success: " + data);
        }
    });

    console.log("ready to send to dynamodb!");
}

module.exports = {
    createPost
}