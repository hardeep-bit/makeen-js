const { Stack, Duration } = require('aws-cdk-lib');
const { Construct } = require('constructs');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const iam = require('aws-cdk-lib/aws-iam');
const path = require('path');

class TextProcessingStack extends Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const processFileLambda = new lambda.Function(this, 'ProcessFileLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      handler: 'processFile.handler',
      timeout: Duration.seconds(30),
      environment: {
        MONGODB_URI: process.env.MONGODB_URI
      }
    });

    const api = new apigateway.RestApi(this, 'TextUploadAPI', {
      restApiName: 'Text Upload Service',
      description: 'API Gateway for text file upload'
    });

    const uploadResource = api.root.addResource('upload');
    uploadResource.addMethod('POST', new apigateway.LambdaIntegration(processFileLambda));

    processFileLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ['logs:*'],
      resources: ['*']
    }));
  }
}

module.exports = { TextProcessingStack };
