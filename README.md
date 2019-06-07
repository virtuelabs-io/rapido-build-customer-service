[![Build Status](https://dev.azure.com/reddyhorcrux/Rapidobuild.com/_apis/build/status/virtuelabs-io.rapido-build-customer-service?branchName=master)](https://dev.azure.com/reddyhorcrux/Rapidobuild.com/_build/latest?definitionId=11&branchName=master)
# Customer Service

Service responsible for all customer data

## API's Available

- **getCustomerCompanyDetails**
  - GET
  - POST
  - PUT
  - DELETE
- **getCustomerAddress**
  - GET
  - GETLIST
  - POST
  - PUT
  - DELETE
  - DELETELIST
- **getCustomerPaymentDetails**
  - GET
  - GETLIST
  - POST
  - PUT
  - DELETE
  - DELETELIST

# Build and deploy 

Create the domain if it dosent exist. This is a oneoff command which need to run

```sh
# To create
serverless create_domain --profile <profile name>
# To remove
serverless delete_domain --profile <profile name>
```

Deploy it on `AWS`

```sh
# To deploy
serverless deploy --stage staging --profile <profile name>
# To delete
serverless remove --stage staging --profile <profile name>
```

> **Note**: Authenticated with Cognito
