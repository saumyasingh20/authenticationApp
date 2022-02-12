const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8004;


const db = require('./config/mongoose');
const session = require('express-session');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//to store the session cookies in mongo db
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
//extract styles and scripts from the layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayouts);
//middleware to parse the requests
app.use(express.urlencoded());

//setting up the cookie parser
app.use(cookieParser());


app.set('view engine','ejs');
app.set('views','./views');

const flash = require('connect-flash');

const customMware = require('./config/middleware_flash');
//mongo store is used to store the session cookie in the db
app.use(session({
    name:'authenticationapp',
    secret:'hvgdhscjhdccdwjbdcd',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 *100)
    },
    store: MongoStore.create(
        {
           mongoUrl: 'mongodb://localhost/authentication_app_development'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`******Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});