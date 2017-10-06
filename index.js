var express = require('express'),
    app = express(),
    cors = require('cors'),
    helmet = require('helmet'),
    bodyParser = require('body-parser')
    port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({
    extended: false
}));

var user = require('./route/user');

app.use('/user',user);

app.listen(port,function(){
    console.log("Server is running on port: ",port);
});