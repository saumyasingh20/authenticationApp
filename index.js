const express = require('express');
const app = express();
const port = 8004;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
//extract styles and scripts from the layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayouts);
//middleware to parse the requests
app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views','./views');
//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`******Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});