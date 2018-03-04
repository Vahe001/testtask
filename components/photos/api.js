const express = require('express');
const fs = require('fs');
const multer = require('multer');
const sizeof = require('image-size');
const Base64 = require('base-64');
const upload = multer({ dest: 'resources/'});
const PhotosRouter = express.Router();
const PhotosService = require('./service');
const AppConstants = require("./../../settings/constants")
const Utility = require('./../../services/utility');
const base64 = require("./../authorization/photo_service");
const auth = require('./../authorization/user_service');

// Read operation
PhotosRouter.get('/:id', auth._auth('user'), (req, res) => {

    PhotosService.getPhotos().then(data =>{
        let arr = [];
        for(let i=0; i < data.length; ++i){
                arr[i] = data[i].image;
        }
        res.set('Content-Type', 'image/jpeg');
        res.send(arr[3]);
    });
});

//Create operation
PhotosRouter.post('/:id', upload.single('avatar'), (req, res) => {
    console.log(req.file)
    if (!req.file) {
        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.NO_FILE));
    }
    if (!AppConstants.PHOTOS_TYPE.test(req.file.originalname)) {
        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.NO_PHOTOS_TYPE))
    }
    let img = fs.readFileSync(req.file.path, 'Binary')
    console.log("path = ", req.file.path)
    let photo = {
          originalname: req.file.originalname,
          author: req.params.id,
          content_type: req.file.mimetype,
          size: req.file.size,
          title: req.body.title,
          path: req.file.path,
          location: {
              x: req.body.x,
              y: req.body.y
          },
          image: img

    }
    PhotosService.insertPhotos(photo).then(data => {
        return res.send(data);
    });

});


//Delete operation
PhotosRouter.delete('/:id', auth._auth('user'),(req, res) => {
    PhotosService.deletePhotos({_id: req.query.id, author: req.params.id}).then(data => {
        return res.send(data);
    })
})

module.exports = PhotosRouter;
