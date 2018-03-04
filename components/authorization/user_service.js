const con = require('./../core/db_connection')
const Utility = require('./../../services/utility');
const UserValidator = require('./../../services/validators/user-validator');
const crypto = require('crypto');
require('./../users/private/model');


class Autherisation {

    _auth(permission) {
        return function (req, res, next) {
            con.model('users').findOne({_id: req.params.id}, (err, user) => {
                if (!user || user.role !== permission) {
                    return res.send(Utility.generateErrorMessage(
                        Utility.ErrorTypes.PERMISSION_DENIED));
                    }
                    req.user = user;
                    return next();
                });
            }
        }
        inspectrole(req,res,next){
            if(req.body.role === 'user'){
                return next();
            }
            else if(req.body.role === 'admin'){
                con.model('users').findOne({role: req.body.role}, (err, user) => {
                    if(err) {
                        console.log(err);
                        return res.send(err)
                    }
                    if(user){
                        return res.send(Utility.generateErrorMessage(
                            Utility.ErrorTypes.INVALID_ROLE));
                        }
                        return next();
                    })
                }
                else {
                    return res.send("The Role can be only 'admin' or 'user'")
                }
            }

            validatequery(req,res,next){
                if(req.body.username){
                    let uv_response = UserValidator.validateUsername(req.body.username);
                    if (uv_response != Utility.ErrorTypes.SUCCESS) {
                        res.send(Utility.generateErrorMessage(uv_response));
                    }
                }
                if(req.body.password){
                    let pass_response = UserValidator.validatePassword(req.body.password);
                    if (pass_response != Utility.ErrorTypes.SUCCESS) {
                        res.send(Utility.generateErrorMessage(pass_response));
                    }
                }
                if(req.body.fullname) {
                    let name_response = UserValidator.validateName(req.body.fullname);
                    if (name_response != Utility.ErrorTypes.SUCCESS) {
                        res.send(Utility.generateErrorMessage(name_response));
                    }
                }
                if(req.body.email) {
                    let email_response = UserValidator.validateEmail(req.body.email);
                    if (email_response != Utility.ErrorTypes.SUCCESS) {
                        return res.send(Utility.generateErrorMessage(email_response));
                    }
                }

                next();
            }
        };

        module.exports = new Autherisation();
