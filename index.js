const constants = require('./constants')
const express = require('express');
const log4js = require('log4js');
const app = express();
const bodyParser = require('body-parser');
const v3Router = express.Router();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded  

//3.1
v3Router.get(constants.PATHS.API_TEST, function (req, res) {
    res.send('hello');   
});

//3.2
v3Router.get(constants.PARAMS.ACTION, function (req, res) {
    const sum = parseInt(req.query.a) + parseInt(req.query.b);
    res.send({ret: constants.RET_CODE.OK, action: req.params.action, result: sum});
});

//3.3
app.use(constants.PATHS.INDEX, express.static('public'))
v3Router.post(constants.PARAMS.ACTION ,function(req, res){
    const a = req.body.a;
    const b = req.body.b;
    const action = req.params.action
    const result = parseInt(a) + parseInt(b);
    res.json({
        'action' : action,
        'result' : result,
        'ret'    : constants.RET_CODE.OK,
    });    
});

//3.4
app.set('view engine','pug');
app.set('views', './views');
v3Router.get(constants.PATHS.TURTORIAL + constants.RESOURCE.STUDENT + constants.ACTION.LIST , function(req, res){
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

//3.5
app.use(constants.PATHS.LOGIN, express.static('public/login'))
v3Router.post(constants.RESOURCE.PETER + constants.LOG_LEVEL.DEBUG + constants.ACTION.APPEND, function(req, res){
    log4js.configure({
        appenders: { peter: { type: 'file', filename: 'log/perter.log' } },
        categories: { default: { appenders: ['peter'], level: 'debug' } }
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
app.use(constants.VERSON.VERSION_3, v3Router);

const server = app.listen(3000, function () {
const host = server.address().address;
const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
