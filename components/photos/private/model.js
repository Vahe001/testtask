const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const AppConstants = require('./../../../settings/constants');

let PhotosSchema = Schema({
  author: {
    ref: 'users',
    type: Schema.ObjectId,
    index: true
  },
  image: {
    type: String,
    index: {unique: true}
  },
  content_type: {
    type: String
  },
  size: {
    type:Number
  },
  title: {
    type: String
  },
  path: {
    type: String
  },
  uploading_date: {
    type: Date,
    index: true,
    default: Date.now
},
  location :{
      x:{
          type: String,
          default: null
      },
      y:{
          type: String,
          default: null
      }
  }
});

module.exports = mongoose.model('photos', PhotosSchema);
