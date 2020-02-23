var express = require('express');
var app = express();
var port = 2300;

var blog = require('./api/blog');

app.post('/api/v1/create-blog', function (request, response) {
    blog.createBlogPost(request)
    response.status(200).send({
        success: 'true'
    });
});

app.get('/api/v1/get-blog', function(request, response) {
    var blogPost = blog.getBlogPost(parseInt(request.query.id));
    // console.log(blogPost);
    response.status(200).send({
        success: 'true',
        response: blogPost
    });
});

app.listen(port);
console.log(`Server started running on ${port}`);