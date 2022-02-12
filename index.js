const express = require('express');
const app = express();
const port = 8004;

app.listen(port,function(err){
    if(err){
        console.log(`******Error in running server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});