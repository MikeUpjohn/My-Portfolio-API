var express = require('express');
var app = express();
var port = 2300;

var blog = require('./api/blog');

app.get('/api/v1/create-blog', function (request, response, next) {
    blog.createPost(request);
    console.log("creating blog!");
    response.status(200).send({
        success: 'true'
    });
});

app.listen(port);
console.log(`Server started running on ${port}`);