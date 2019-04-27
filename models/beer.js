const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const beerSchema = new Schema({
  name: String, 
  description: String, 
  beerlogoImage: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const myModel = mongoose.model('Beer', beerSchema);

module.exports = myModel;