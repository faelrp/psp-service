# Dead simple Payment Service Provider (PSP)

This service handles transaction events in order to generate payables for given transaction type credit or debit card.
More information [access here](https://github.com/pagarme/vagas/tree/master/desafios/software-engineer-backend)

## Getting Started

### Prerequisites

```
- nodejs @ 10.x
- npm @ 6.9.0
- Terraform @ 0.11.14
```

Note: The above versions were used during development of this service, however older versions might work as well.

### Installing

#### First Step

we want to install node dependencies and compile our service

```
cd psp-service
npm install
npm run build
```

#### Second Step

we will need to use serverless for lambda provision. The following will take care of this part.

```
npx sls deploy -s dev
```

#### Third Step

this service depends on some of AWS resources like SQS, DynamoDB, etc. So, we should execute the terraform script to make sure those resources are up and running for us

Before dive into the command we might need to perform some changes on TF scripts in order to point it to your AWS account.

```
cd psp-service
cd terraform/environments/dev
vim main.tf
```

You'll need to update the following

- AWS_PROFILE_GOES_HERE = make sure to include the aws profile you have configured on your end
- AWS_ACCOUNT_GOES_HERE = you should add your aws account number

Ok, once you get that updated, do the following

```
cd psp-service
cd terraform/environments/dev
terraform apply
```

You might need to type "yes" to approve the TF plan to go live.
At this point you should have all the resources needed to make all this work :)

NOTE: Order here matters, so you should make sure to run serverless before Terraform. The reason is that TF is creating the event sources for lambdas.


## Running the tests

Jest is the responsible for unit test on this service. In order to run the suite of test run

```
cd psp-service
npm test
```

### Coding style

This service follows the `airbnb-typescript/base` code style via eslint

## Built With

* [AWS Lambda](https://aws.amazon.com/lambda/)
* [AWS SQS](https://aws.amazon.com/sqs/)
* [AWS DynamoDB](https://aws.amazon.com/dynamodb/)
* [Serverless Framework](https://serverless.com/) - lambda provisioning
* [Terraform](terraform.io) - other aws resources provisioning
* [Node.js](https://nodejs.org)
* [Typescript](https://www.typescriptlang.org/)
