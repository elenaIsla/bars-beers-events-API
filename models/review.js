const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const beerSchema = new Schema({
  title: {type: String, required: true, unique: true},
  comment: String, 
  creator:  [{type: ObjectId, ref: 'User'}],
  bar: [{type: ObjectId, ref: 'Bar'}],
  ratingBeer: {type: Number, required: true},
  ratingToilet: {type: Number, required: true},
  ratingMusic: {type: Number, required: true},
  image: String, 
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
});

const myModel = mongoose.model('Review', beerSchema);

module.exports = myModel;