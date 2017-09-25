const constants = require('./constants')
const express = require('express');
const log4js = require('log4js');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded  

//3.1 Basic Parameterized Http Route
app.get(constants.PARAMS.VERSION + constants.PATHS.API_TEST, function (req, res) {
    res.send('hello');   
});

//3.2 Basic Query in Request
app.get(constants.PARAMS.VERSION + constants.PARAMS.ACTION, function (req, res) {
    const sum = parseInt(req.query.a) + parseInt(req.query.b);
    res.send({ret: constants.RET_CODE.OK, version: req.params.version, action: req.params.action, result: sum});
});

//3.3 URLEncoded Form in Request

app.use(constants.PATHS.INDEX, express.static('public'))
app.post(constants.PARAMS.VERSION + constants.PARAMS.ACTION ,function(req, res){
    const a = req.body.a;
    const b = req.body.b;
    const action = req.params.action
    const result = parseInt(a) + parseInt(b);
    res.json({
        'action' : action,
        'result' : result,
        'verion' : req.params.version,
        'ret'    : constants.RET_CODE.OK,
    });    
});

//3.4 Html Template Engine Practice

app.set('view engine','pug');
app.set('views', './views');
app.get(constants.PARAMS.VERSION + constants.PATHS.TURTORIAL + constants.RESOURCE.STUDENT + constants.ACTION.LIST , function(req, res){
    const students = [];

    for(i = 0; i < 3; i ++){
        const student = new Object();
        student.firstname = 'ning' + i;
        student.lastname = 'shining' + i;
        student.age = parseInt(Math.random() * 100);
        students[i] = student
    }   
    res.render('index', { students: students})
});

//3.5 Logging to Multiple Files Differentiated by Levels
app.use(constants.PATHS.LOGIN, express.static('public/login'))
app.post(constants.PARAMS.VERSION + constants.RESOURCE.USER + constants.LOG_LEVEL.LEVEL + constants.ACTION.APPEND, function(req, res){
    log4js.configure({
        appenders: { peter: { type: 'file', filename: "log/" + req.params.user + ".log" } },
        categories: { default: { appenders: ['peter'], level: req.params.level } }
    });
    const logger = log4js.getLogger('peter');
    if(req.body.user == "peter" && req.body.password== "password"){
        logger.debug('login success');
        res.json({
            'ret'    : constants.RET_CODE.OK,
        }); 
    } else {
        res.json({
            'ret'    : constants.RET_CODE.ERROR,
        }); 
        logger.error('login error');
    }   
});

//3.6 Hiding Your Authentication Protected Service behind AuthMiddleware


const server = app.listen(3000, function () {
const host = server.address().address;
const port = server.address().port;

console.log('Example app listening at http://%s:%s', host, port);
});
