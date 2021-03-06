const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

const development = {
    name :'development',
    asset_path:'./assets',
    session_cookie_key :'hvgdhscjhdccdwjbdcd',
    db:'authentication_app_development',
    smtp:{
        service:'gmail',
        host: 'smtp.gmail.com',
        port:587,
        secure: false,
        auth:{
            user:'saumyalearnsdevelopment@gmail.com',
            pass:'saumdev@9876'
             }
        },
    
        google_client_id:"127008531460-f1ppnpjivplkt0ctcr6prtlloicb52ee.apps.googleusercontent.com",

        google_client_secret:"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",
        google_call_back_url:"http://authsys.live/users/auth/google/callback",
        morgan:{
            mode:'dev',
            options:{stream: accessLogStream}

        }
    
}

const production = {
    name :'production',
    asset_path:process.env.AUTH_APP_ASSET_PATH,
    session_cookie_key :process.env.AUTH_APP_SESSION_COOKIE_KEY,
    db:process.env.AUTH_APP_DB,
    smtp:{
        service:'gmail',
        host: 'smtp.gmail.com',
        port:587,
        secure: false,
        auth:{
            user:process.env.AUTH_APP_SMTP_AUTH__USER,
            pass:process.env.AUTH_APP_SMTP_AUTH_PASS
             }
        },
    
        google_client_id:process.env.AUTH_APP_GOOGLE_CLIENT_ID,

        google_client_secret:process.env.AUTH_APP_GOOGLE_CLIENT_SECRET,
        google_call_back_url:"https://authsys.live/users/auth/google/callback",
        morgan:{
            mode:'combined',
            options:{stream: accessLogStream}

        }
}

module.exports = eval(process.env.AUTH_APP_ENVIRONMENT)== undefined ? development:eval(process.env.AUTH_APP_ENVIRONMENT);