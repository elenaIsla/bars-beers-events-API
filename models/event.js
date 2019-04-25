const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const beerSchema = new Schema({

  title: {type: String, required: true, unique: true},
  desciption: String,
  creator: [{type: ObjectId, ref: 'User'}],
  bars: [{type: ObjectId, ref: 'Bar'}],
  logo: String,
  city: String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
});

const myModel = mongoose.model('Event', beerSchema);

module.exports = myModel;