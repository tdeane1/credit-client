export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-1",
        BUCKET: "dtd-notes-app-uploads"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://93y7h26li8.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_5iqeW0HdL",
        APP_CLIENT_ID: "4397rto8ams2b930i4pbdjqn36",
        IDENTITY_POOL_ID: "us-east-1:baf1467d-a648-4e18-8ed8-a19e05b15ae0"
    }
};