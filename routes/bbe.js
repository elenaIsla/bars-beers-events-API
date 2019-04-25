const express = require('express');
const createError = require('http-errors');
const router = express.Router();

// const cloudinary = require('cloudinary');
// const cloudinaryStorage = require('multer-storage-cloudinary');
// const multer = require('multer');
const User = require('../models/user');
const Beer = require('../models/beer');
const Bar = require('../models/bar');
const Event = require('../models/event');
const Review = require('../models/review');

// const {
//   isLoggedIn,
//   isNotLoggedIn,
//   validationLoggin,
// } = require('../helpers/middlewares');


/* POST  createBar page */ 

router.post('/createbar', (req, res, next) => {
    const {barType, name, street, neighbourhood, city, categoryType, music, disabled, BeersDraft, BeersBottle} = req.body;
    const creator = req.session.currentUser._id;
    // let location = {
    //   type: 'Point',
    //   coordinates: [req.body.longitude, req.body.latitude]
    //   };
    Bar.findOne({name})
      .then((nameBar) => {
        if(nameBar){
          next(createError(404), 'This bar already exists');
        } else {
          Bar.create({
            barType,
            name,
            address:{  
            street,
            neighbourhood,
            city,
            },
            category:{
              categoryType, 
              music, 
              disabled,
            },
            BeersDraft,
            BeersBottle,
            creator,
            // location,
          })
          .then((bar) => {
            return res.status(200).json(bar);
    
          })
          .catch((error) => {
            next(error);
          })
        .catch((error) => {
          next(error);
        });
        };
      });
    });

/* POST  updateBar page */

router.post('/:idBar/updateBar', (req, res, next) => {
  const {barType, name, street, neighbourhood, city, categoryType, music, disabled, BeersDraft, BeersBottle} = req.body;
  const {idBar} = req.params;
  Bar.findByIdAndUpdate(idBar, {barType, name, street, neighbourhood, city, categoryType, music, disabled, BeersDraft, BeersBottle})
    .then((bar) => {
      return res.status(200).json(bar);
    }) 
    .catch((error) => {
      next(error);
    })
});
/* POST  deleteBar page */

router.post('/:idBar/deleteBar', (req, res, next) => {
  const {idBar} = req.params;
  Bar.findByIdAndDelete(idBar)
    .then((bar) => {
      return res.status(200).json(bar);
    }) 
    .catch((error) => {
      next(error);
    })
});

module.exports = router;
