[![Build Status](https://dev.azure.com/reddyhorcrux/Rapidobuild.com/_apis/build/status/virtuelabs-io.rapido-build-auth?branchName=master)](https://dev.azure.com/reddyhorcrux/Rapidobuild.com/_build/latest?definitionId=7&branchName=master)
# Rapidobuild.com Authentication Service
Rapido build authentication service responsible for the following:
- Sign Up
- Resend confirmation code
- Confirm registration
- User sign in

#### AWS Services used:
- IAM Roles
- Cognito
- Lambda
- API Gateway
- S3

#### AZURE services used:
- Pipelines
- Artifacts

You can clone the repository and run the following commands

#### Install all dependencies
```sh
npm install
```

#### Run tests
```sh
npm run test
```

Set the necessary `secrets` and deploy the functions to `AWS`

#### Deploy to DEV
```sh
npm run dev-deploy
```

#### Deploy to PROD
```sh
npm run prod-deploy
```

> **Note**:
> - You will need access to aws via the CLI
> - You will need to set environment variables for `COGNITO Client id` and `COGNITO User Pool Id`
