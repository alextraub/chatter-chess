
#!/bin/bash
set -e
IFS='|'

AWSCLOUDFORMATIONCONFIG="{\
\"Region\": \"us-east-1\",\
\"DeploymentBucketName\": \"amplify-chatterchess-dev-135711-deployment\",\
\"UnauthRoleName\": \"amplify-chatterchess-dev-135711-unauthRole\",\
\"StackName\": \"amplify-chatterchess-dev-135711\",\
\"StackId\": \"arn:aws:cloudformation:us-east-1:874363802327:stack/amplify-chatterchess-dev-135711/c2ed5ed0-22c5-11eb-8f35-12bd192597a3\",\
\"AuthRoleName\": \"amplify-chatterchess-dev-135711-authRole\",\
\"UnauthRoleArn\": \"arn:aws:iam::874363802327:role/amplify-chatterchess-dev-135711-unauthRole\",\
\"AuthRoleArn\": \"arn:aws:iam::874363802327:role/amplify-chatterchess-dev-135711-authRole\"\
}"
PROVIDER_CONFIG="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"


AWS_CONFIG="{\
\"configLevel\":\"chatterchess\",\
\"useProfile\":true,\
\"profileName\":\"amplify\"\
}"

amplify env import \
--name dev \
--config $PROVIDER_CONFIG \
--awsInfo $AWS_CONFIG \
--yes
