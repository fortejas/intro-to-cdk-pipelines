#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyApplicationStack } from '../lib/my-application';
import { MyApplicationPipelineStack } from '../lib/my-application-pipeline';

const app = new cdk.App();
new MyApplicationStack(app, 'MyApplication', {});
new MyApplicationPipelineStack(app, 'MyApplication-Pipeline', {})
