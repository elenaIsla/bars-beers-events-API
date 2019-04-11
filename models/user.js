const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: {type: String},
  neighbourhood: {type: String},
  beerType: {type: String},  
  favouriteBeers: [{type: ObjectId, ref: 'Beers'}], 
  userimage: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;