const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const beerSchema = new Schema({
  title: {type: String, required: true, unique: true},
  comment: String, 
  creator:  [{type: ObjectId, ref: 'User'}],
  barID: [{type: ObjectId, ref: 'Bar'}],
  ratingBeer: {type: Number, required: false},
  ratingToilet: {type: Number, required: false},
  ratingMusic: {type: Number, required: false},
  image: String, 
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
});

const myModel = mongoose.model('Review', beerSchema);

module.exports = myModel;