const mongoose = require('mongoose');
require('./model');
const BaseDao = require('./../../core/base_dao');
const con = require('./../../core/db_connection');
const Utility = require('./../../../services/utility');



class UsersDao extends BaseDao {
    constructor() {
        super(con.model('users'));
    }
}


module.exports = new UsersDao();
