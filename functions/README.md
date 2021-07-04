# Pitch Deck Serverless Functions

In this project we store all serverless functions used for the Pitch Deck web platform.


## Local setup

For local development we will be using Express and the local filesystem for storage. Assuming you have Node and NPM installed, follow these steps:

1. Install project dependencies:
```
npm install
```

3. Run the express server locally
```
npm run start
```

Now you can test your functions using the endpoints exposed by Express.


## Deployment (incomplete)

In production we will be using AWS Lambda for our functions and AWS S3 for storage.

1. Be sure your AWS credentials are installed locally: `~/.aws/credentials` and `~/.aws/config`

2. Install serverless globally:
```
npm install -g serverless
```

3. Move to `/insfrastructure/aws-lambda` and deploy the functions:
```
cd /insfrastructure/aws-lambda
serverless deploy
```

4. Create a S3 bucket in your AWS console and set the following env. variables:
- `ACCESS_KEY_ID`
- `SECRET_ACCESS_KEY`
- `BUCKET_NAME`
