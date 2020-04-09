const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const documentClient = new AWS.DynamoDB.DocumentClient();
const tableName = "Blog";

exports.createBlog = async (event) => {
    var request = JSON.parse(event.body);

    return createBlogPost(request).then(
        data => {
            const response = {
                statusCode: 200,
                body: JSON.stringify({ success: true, data: data }),
            };

            return response;
        },
        error => {
            const response = {
                statusCode: 400,
                body: JSON.stringify({ success: false, error: error }),
            };

            return response;
        }
    )
};

exports.getBlog = async (event) => {
    return getBlogPost(event).then(
        data => {
            var response = {
                statusCode: 200,
                body: JSON.stringify({ success: true, data: data })
            };

            return response;
        },
        error => {
            var response = {
                statusCode: 400,
                body: JSON.stringify({ success: false, data: error })
            };

            return response;
        }
    );
};

const createBlogPost = (request) => {
    const blogData = {
        ID: Date.now(),
        Title: request.title,
        BlogText: request.blogText,
        Tags: request.tags,
        GalleryItems: request.galleryItems
    };

    var params = {
        TableName: tableName,
        Item: blogData
    };

    return new Promise(function (resolve, reject) {
        documentClient.put(params, function (error, data) {
            if (error) {
                var result = {
                    message: error
                };

                return reject(result);
            }
            if (data) {
                return resolve(true);
            }
            else {
                return reject(false);
            }
        });
    });
};

const getBlogPost = (event) => {
    const id = parseInt(event.queryStringParameters['id']);

    var params = {
        TableName: tableName,
        Key: {
            'ID': id
        }
    };

    return new Promise(function (resolve, reject) {
        documentClient.get(params, function (error, data) {
            if (error) {
                var result = {
                    message: error
                };

                return reject(result);
            }
            if (data && data.Item) {
                var result = data.Item;

                return resolve(result);
            }
            else {
                var result = {
                    message: 'Data does not exist'
                };
                return reject(result);
            }
        });
    });
}
