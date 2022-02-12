const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const signUpMailer = require('../mailers/sign_up_mail');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID:"127008531460-f1ppnpjivplkt0ctcr6prtlloicb52ee.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8004/users/auth/google/callback"

    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy-passport',err);return;}
            console.log(profile);

            if(user){
                return done(null,user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                    

                },function(err,user){
                    if(err){console.log('error in google strategy-passport',err);return;}
                    signUpMailer.sendWelcomeMail(user);

                    return done(null,user);
                });
            }

        });

    }




));
module.exports = passport;