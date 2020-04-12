const aws = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const documentClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'Project';

exports.post = async (event) => {
    var request = JSON.parse(event.body);

    return createProject(request).then(
        data => {
            const response = {
                statusCode: 200,
                body: JSON.stringify({ success: true, data: data });
            }

            return response;
        },
        error => {
            const response = {
                statusCode: 400,
                body: JSON.stringify({ success: false, data: error });
            }
        }
    )
};

const createProject = (request) => {
    const projectData = {
        Title: "My lovely first project",
        ProjectText: "<p>This is some HTML.</p>",
        Tags: ["tag1", "tag2", "tag3"]
        GalleryItems: ["DSC_0741.jpg", "DSC_0742.jpg", "another-image.png"]
    };

    var params = {
        TableName: tableName,
        Item: projectData
    };

    return new Promise((resolve, reject) => {
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
