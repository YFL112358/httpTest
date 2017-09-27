const constants = require('../constants')
const express = require('express');
const Token = require('../model/Token').default;

const tokenAuthImpl = function(req, res, next) {
  const userId = req.params.user_id;
  const intAuthToken = req.query.intAuthToken;
  if (intAuthToken == null || intAuthToken=== undefined || intAuthToken=='') { 
        res.send({ret:constants.RET_CODE.ERROR});
    } else {
            return Token.findOne({where:{
                intAuthToken: intAuthToken,
            }})
            .then(function(result){
                 if (result!= null && result.tokenId == userId){
                    return next();
                } else {
                    res.send({ret:constants.RET_CODE.ERROR });
                }
            })
            .catch(function(err){
                //todo
            });
    }
};

const createAuthRouter = function() {
    const instance = this;
    const router = express.Router({mergeParams: true});
    router.get(constants.PATHS.WALLET + constants.PATHS.SELF + constants.PATHS.DETAIL, authRouter.bind(instance));
    return router;
}; 
const authRouter = function(req, res){
    const userId = req.params.user_id;
        return Token.findOne({where:{
                tokenId: userId,
            }})
            .then(function(user){
                res.render('user', { device: user.device, ip: user.ip});             
            })
            .catch(function(err){
                //todo
            })
};

class UserAuth {
  constructor(props) {
    const instance = this;
    this.tokenAuth = tokenAuthImpl.bind(instance);
    this.createAuthRouter = (createAuthRouter.bind(instance))();;
  }
}
exports.default = UserAuth;
