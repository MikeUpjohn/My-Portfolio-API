const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const documentClient = new AWS.DynamoDB.DocumentClient();
const tableName = "Blog";

exports.createBlog = async (event) => {
    return createBlogPost(event).then(
        data => {
            const response = {
                statusCode: 200,
                body: JSON.stringify({success: true, data: data}),
            };
        
            return response;
        },
        error => {
            const response = {
                statusCode: 400,
                body: JSON.stringify({success:false, error: error}),
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
                body: JSON.stringify(data)
            };

            return response;
        },
        error => {
            var response = {
                statusCode: 400,
                body: JSON.stringify(error)
            };  

            return response;
        }
    );
};

const createBlogPost = () => {
    const blogData = {
        ID: Date.now(),
        Title: 'Monday 20th May 2019 - HIGH Risk - TX/OK Panhandles',
        BlogText: "<p>Awoke to a HIGH Risk across Eastern and Southern TX Panhandle, Western and Central Oklahoma. SPC highlighted risk areas in the HIGH Risk as OKC Metro, Norman, Lawton, Edmond and Midwest City. Tornado risk was 30% hatched first thing that morning, with OKC Metro, Norman, Lawton, Edmond, Midwest City all in the 30% hatched areas, and a large 15% area containing Tulsa, OK, Abilene, TX, Wichita Falls, TX, Broken Arrow, OK and Enid, OK. Hail risk was 45% hatched across much of the same area, along with a very similar 45% hatched area for damaging winds.</p>[[DSC__0741]]",
        Tags : ['Tornado', 'Storm Chase', 'Storm Chasing', 'Severe Weather', 'Severe WX'],
        GalleryItems: ['DSC__0741.jpg','DSC__0742.jpg']
    };

    var params = {
        TableName: tableName,
        Item: blogData
    };

    return new Promise(function(resolve, reject) {
        documentClient.put(params, function(error, data) {
            if(error) {
                var result = {
                    message: error
                };

                return reject(result);
            }
            if(data) {
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
        Key : {
            'ID' : id
        }
    };

    return new Promise(function(resolve, reject) {
        documentClient.get(params, function(error, data) {
            if(error) {
                var result = {
                    message: error
                };

                return reject(result);
            }
            if(data && data.Item) {
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