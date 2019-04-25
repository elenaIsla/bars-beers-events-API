const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: {type: String},
  neighbourhood: {type: String},
  beerType: {type: String},  
  favouriteBeers: [{type: ObjectId, ref: 'Beer'}], 
  userimage: String,
  favouriteBars: [{type: ObjectId, ref: 'Bar'}],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;