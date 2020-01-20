var express = require('express');
var app = express();
var port = 2300;

var blog = require('./api/blog');

app.post('/api/v1/create-blog', function (request, response) {
    blog.createPost(request);
    console.log("creating blog!");
    response.status(200).send({
        success: 'true'
    });
});

app.get('/api/v1/get-blog', function(request, response) {
    blog.getItem(request.query.id);
    response.status(200).send({
        success: 'true'
    });
});

app.listen(port);
console.log(`Server started running on ${port}`);