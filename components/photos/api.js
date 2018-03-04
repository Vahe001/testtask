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
const auth = require('./../authorization/user_service');

// Read operation
PhotosRouter.get('/:id', auth._auth('user'), (req, res) => {
    photo = {
        _id: req.query.id
    }
    PhotosService.getPhotos(photo).then(data =>{
            var img = fs.readFileSync(data[0].image);
             res.writeHead(200, {'Content-Type': data[0].content_type });
            res.end(img, 'binary');
    });
});

//Create operation
PhotosRouter.post('/:id', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.NO_FILE));
    }
    if (!AppConstants.PHOTOS_TYPE.test(req.file.originalname)) {
        return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.NO_PHOTOS_TYPE))
    }

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

PhotosRouter.put('/:id', upload.single('avatar'), (req, res) => {
    var photo = {}
    if (req.file) {
        if (!AppConstants.PHOTOS_TYPE.test(req.file.originalname)) {
            return res.send(Utility.generateErrorMessage(Utility.ErrorTypes.NO_PHOTOS_TYPE))
        }
        var photo = {
            originalname: req.file.originalname,
            author: req.params.id,
            content_type: req.file.mimetype,
            size: req.file.size,
            image: req.file.path
        }
    }
        if(req.body.title)
            photo.title = req.body.title;
        if(req.body.x && req.body.y)
            photo.location = {
            x: req.body.x,
            y: req.body.y
        }

    PhotosService.updatePhotos(req.query.id, photo).then(data => {
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
