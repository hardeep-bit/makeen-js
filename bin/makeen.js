#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const MakeenStack = require('../lib/makeenStack');
require('dotenv').config();

const app = new cdk.App();
new MakeenStack(app, 'MakeenStack');
