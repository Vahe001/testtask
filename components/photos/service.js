const PhotosDao = require('./private/dao');
const Utility = require('./../../services/utility');
const AppConstants = require("./../../settings/constants")
class PhotosService {

  // Read operation
  getPhotos(options) {
      return new Promise((resolve, reject) => {
        options = options || {};
          PhotosDao.getData(options)
                   .populate('author',['name', 'username', 'age', 'role'])
                   .then(data => {
                      resolve(data);
                   })
                   .catch(err => {
                      reject(Utility.generateErrorMessage(
                        Utility.ErrorTypes.NOT_FOUND_DATA)
                      );
                  });
      });
  }

  //Create operation
  insertPhotos(photo) {

      return new Promise((resolve, reject) => {
          PhotosDao.insertData(photo).then(data => {
              resolve(data);
          }).catch(err => {
            reject(Utility.generateErrorMessage(
              Utility.ErrorTypes.PHOTO_CREATION_ERROR)
            );
          });
      });
  }

  //Delete operation
  deletePhotos(photo) {
    return new Promise((resolve, reject) => {
        PhotosDao.deleteData(photo).then(data => {
            resolve(data);
        }).catch(err => {
          reject(Utility.generateErrorMessage(
            Utility.ErrorTypes.PHOTO_DELETE_ERROR)
          );
        });
    });
  }
  updatePhotos(id, user) {

         return new Promise((resolve, reject) => {
          PhotosDao.updateData(id, user).then(data => {
              resolve(data);
          }).catch(err => {
             reject(Utility.generateErrorMessage(
               Utility.ErrorTypes.USER_UPDATE_ERROR)
              );
          });
      });
  }


}




module.exports = new PhotosService();
