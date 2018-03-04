const UsersDao = require('./private/dao');
const Utility = require('./../../services/utility');
const AppConstants = require('./../../settings/constants');
const UserValidator = require('./../../services/validators/user-validator');


const crypto = require('crypto');

class UsersService {

  getUsers(query) {
      query = query || {};
      return new Promise((resolve, reject) => {
          UsersDao.getData(query)
                 .skip(AppConstants.offset)
                 .limit(AppConstants.limit)
                 .then(data => {
                      resolve(data);
                  }).catch(err => {
                      reject(Utility.generateErrorMessage(
                        Utility.ErrorTypes.NOT_FOUND_DATA)
                      );
                  })
      })
  }

  insertUsers(user) {

      return new Promise((resolve, reject) => {
          UsersDao.insertData(user).then(data => {
               resolve(data)
          }).catch(err => {
             reject(Utility.generateErrorMessage(
              Utility.ErrorTypes.USER_CREATION_ERROR)
            );
          });
      });
  }

  updateUsers(id, user) {

         return new Promise((resolve, reject) => {
          UsersDao.updateData(id, user).then(data => {
              resolve(data);
          }).catch(err => {
             reject(Utility.generateErrorMessage(
               Utility.ErrorTypes.USER_UPDATE_ERROR)
              );
          });
      });
  }

  deleteUsers(user) {
    return new Promise((resolve, reject) => {
        UsersDao.deleteData(user).then(data => {
            if(!user) {
                return res.send(Utility.generateErrorMessage(
                  Utility.ErrorTypes.USER_ID_ERROR)
                );
            }
            resolve(data);
        }).catch(err => {
            reject(Utility.generateErrorMessage(
              Utility.ErrorTypes.USER_DELETE_ERROR)
            );
          })
    });
  }
}


module.exports = new UsersService();
