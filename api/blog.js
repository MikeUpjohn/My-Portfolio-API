var AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const createPost = () => {
    var myObject = {
        ID: {N: `${Date.now()}`},
        BlogText: {S:"Hello my name is Mike!"},
        AnotherTestString: {S: "Hello again!"},
        FinalEntry: {N: '001'}
    };

    var params = {
        TableName: 'Blog',
        Item: myObject
    };

    ddb.putItem(params, function(error, data) {
        if(data) {
            console.log("Success: " + data);
        }
        else {
            console.log("Error: " + error);
        }
    });
};

const getItem = (id) => {
    console.log(id);
    var params = {
        TableName: 'Blog',
        Key : {
            'ID' : {N: `${id}`}
        }
    };

    ddb.getItem(params, function(error, data) {
        if(data) {
            console.log("Data: ", JSON.stringify(data));
        }
        else {
            console.log("Error: " + error);
        }
    });
}

module.exports = {
    createPost,
    getItem
}