const express = require('express');
const bodyparser = require('body-parser');

const app = express();


app.use(bodyparser.json({
    limit: '50mb',
    parameterLimit: 1000000
}));
app.use(bodyparser.urlencoded({
    extended: true,
    limit:'50mb',
    parameterLimit: 1000000
}));

const api_v1 = require('./controllers/api');
api_v1.initialize(app);


app.listen(3005, function(){
    console.log("Server is run");
});
