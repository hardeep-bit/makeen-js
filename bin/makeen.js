#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { TextProcessingStack } = require('../lib/text-processing-poc-stack');
require('dotenv').config();

const app = new cdk.App();
new TextProcessingStack(app, 'TextProcessingStack');
