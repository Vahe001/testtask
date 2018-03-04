const express = require('express');
const crypto = require('crypto');

const UsersRouter = express.Router();
const UsersService = require('./service');
const Utility = require('./../../services/utility');
const UserValidator = require('./../../services/validators/user-validator');
const auth = require('./../authorization/user_service');


UsersRouter.get('/', Utility.parseQuery, (req, res) => {
    UsersService.getUsers().then(data => {
        return res.send(data);
    });
});

UsersRouter.post('/',auth.inspectrole,auth.validatequery,(req, res) => {
    req.body.password = crypto.createHash('sha1').update(req.body.password + 'chlp').digest('hex');
    let user = {
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    }
    UsersService.insertUsers(user).then(data => {
        return res.send(data);
    }).catch(err => {
         return res.send(err);
    });
});

UsersRouter.put('/:id', auth._auth('user'),auth.validatequery, (req, res) => {

    let id = req.params.id;
    let user = {};
    if(req.body.password){
        user.password = req.body.password;
    }
    if (req.body.fullname) {
        user.fullname = req.body.fullname;
    }
    if (req.body.username) {
        user.username = req.body.username;
    }
    if (req.body.email) {
        user.email = req.body.email;
    }
    UsersService.updateUsers(id, user).then(data => {
         return res.send(data);
     }).catch(err => {
         res.send(err)
     });

});

UsersRouter.delete('/:id', auth._auth('admin'), (req, res) => {
    let id = req.query.id;
    UsersService.deleteUsers(id).then(data => {
        if(!data) {
            return res.send(Utility.generateErrorMessage(
              Utility.ErrorTypes.INVALID_DATA));
        }
        return res.send(data);
    }).catch(err =>{
        res.send(err);
    });
})

module.exports = UsersRouter;
