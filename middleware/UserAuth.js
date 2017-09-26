const constants = require('../constants')
const db = require('../dao/db.js')
const express = require('express');

//没有写进cookie ，方便测试，把intAuthToken写进数据的一张表里面。通过userid来查出intAuthToken.
const tokenAuthImpl = function(req, res, next) {
  const userId = req.params.user_id;
  const intAuthToken = req.query.intAuthToken;
    db.query("select * from  token  where id ='"+userId +"'", function (err, rows) {
        if (err) {
            console.log(err);
            res.send({ret:constants.RET_CODE.ERROR});  
        } else {
            if (rows != null && rows[0].intAuthToken == intAuthToken){
                return next();
            } else {
                res.send({ret:constants.RET_CODE.ERROR });
                console.log('error');
            }
        }
    });
};

const createAuthRouter = function() {
    const instance = this;
    const router = express.Router({mergeParams: true});
    router.get(constants.PATHS.WALLET + constants.PATHS.SELF + constants.PATHS.DETAIL, authRouter.bind(instance));
    return router;
}; 
const authRouter = function(req, res){
    const userId = req.params.user_id;
    db.query("select * from  token  where id ='"+userId +"'", function (err, users) {
        if(err) {
            res.send({ret:constants.RET_CODE.ERROR});
        } else {
            const user = users[0];
            res.render('user', { device: user.device, ip: user.ip}); 
        }
    });
};

class UserAuth {
  constructor(props) {
    const instance = this;
    this.tokenAuth = tokenAuthImpl.bind(instance);
    this.createAuthRouter = (createAuthRouter.bind(instance))();;
  }
}
exports.default = UserAuth;
