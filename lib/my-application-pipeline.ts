import { Stack, StackProps } from "aws-cdk-lib"
import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines"
import { Construct } from "constructs"
import { MyApplicationStack, MyApplicationStage } from "./my-application"


export class MyApplicationPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        const connectionArn = 'arn:aws:codestar-connections:eu-west-1:335688126910:connection/8ffb8380-bc12-4753-9731-c717b2fb619e'

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'MyApplicationPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.connection('fortejas/intro-to-cdk-pipelines', 'main', {
                    connectionArn
                }),
                commands: [
                    `npm ci`,
                    `npm run build`,
                    `npx cdk synth`
                ]
            })
        })

        const myApp = new MyApplicationStage(this, 'Dev', {})

        pipeline.addStage(myApp)


    }
}
