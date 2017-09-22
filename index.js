const constants = require('./constants')
const express = require('express');
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

v3Router.post('/:action' ,function(req, res){
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
app.use(constants.VERSON.VERSION_3, v3Router);

//3.4


//app.set('view engine','pug');
//app.set('views', './views');

app.use(constants.PATHS.INDEX, express.static('public'))

var server = app.listen(3000, function () {
var host = server.address().address;
var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
