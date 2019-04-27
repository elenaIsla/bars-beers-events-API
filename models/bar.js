const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const barSchema = new Schema({
    barType: String,
    name: {type: String, required: true, unique: true}, 
    address: {
        street: String,
        neighbourhood: String, 
        city: String, 
    }, 
    category: {
        categoryType: String,
        music: String, 
        disabled: String, 
    },
    beersDraft: [{ beer: {type: ObjectId, ref: 'Beer'}, price: String}],
    beersBottle: [{beer: {type: ObjectId, ref: 'Beer'}, price: String}],
    creator: {type: ObjectId, ref: 'User'},
    // location: { type: { type: String }, coordinates: [Number] },
    
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
});
barSchema.index({ location: '2dsphere' });

const myBar = mongoose.model('Bar', barSchema);

module.exports = myBar;