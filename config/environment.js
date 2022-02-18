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
        google_call_back_url:"http://localhost:8004/users/auth/google/callback"
    
}

const production = {
    name :'production'
}

module.exports = development;