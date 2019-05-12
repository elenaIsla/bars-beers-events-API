const express = require('express');
const createError = require('http-errors');
const router = express.Router();

const User = require('../models/user');
const Beer = require('../models/beer');
const Bar = require('../models/bar');
const Event = require('../models/event');
const Review = require('../models/review');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'img',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 150, height: 150, crop: 'limit' }],
});

const parser = multer({ storage });

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

/* ------------------------------------API  Bar --------------------------------------------*/

/* POST  createBar page */ 

router.post('/createBar', (req, res, next) => {
    console.log('asdfasdfasf')
    const {barType, name, street, neighbourhood, city, categoryType, music, disabled, draftBeer, bottleBeer, price} = req.body;
    const creator = req.session.currentUser._id;
    let averageRating = 0;
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
            draftBeer, 
            bottleBeer,
            price,
            creator,
            averageRating,
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

/* POST-GET  updateBar page */

router.get('/:idBar/updateBar', (req, res, next) => {
  const {idBar} = req.params;
  Bar.findById(idBar)
    .then((bar) => {
      return res.status(200).json(bar);
    }) 
    .catch((error) => {
      next(error);
    })
});


router.put('/:id', (req, res, next) => {
  const {barType, name, street, neighbourhood, city, categoryType, music, disabled, draftBeer, bottleBeer, price} = req.body;
  const {id} = req.params;
  Bar.findByIdAndUpdate(
    id, 
    {barType,
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
            draftBeer, 
            bottleBeer, 
            price
          },
    )
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
      // Review.findByIdAndDelete({barID: idBar})
      //   .then((data) =>{
      //   })
    }) 
    .catch((error) => {
      next(error);
    })
});

/* GET  list Bar page */

router.get('/bars', (req, res, next) => {
  Bar.find()
  .then((bars) => {
    return res.status(200).json(bars);
  })
  .catch((error) => {
    next(error);
  });
});

/* GET Bar Datail page */

router.get('/bars/:idBar', (req, res, next) => {
  let {idBar} = req.params;
  Bar.findById({_id: idBar})
    .populate('draftBeer')
    .populate('bottleBeer')
    .then((bar) => {
      console.log(bar)
      return res.status(200).json(bar);
    })
    .catch((error) => {
      next(error);
    });
});


/* ------------------------------------API  Beer --------------------------------------------*/

/* GET-POST page create beer Form */

router.post('/createBeer', (req, res, next) => {
  
  const {name, description} = req.body;
  Beer.create({
    name,
    description,
  })
  .then((beer) => {
    return res.status(200).json(beer);
  })
  .catch(error => {
    console.log(error);
  })
});

/* GET-POST  updateBeer page and updateFORM */

router.post('/:idBeer/updateBeer', (req, res, next) => {
  
  const {id} = req.params;
  const {name, description} = req.body;
  Beer.findByIdAndUpdate(id, {name, description})
    .then((beer) => {
      return res.status(200).json(beer);
    }) 
    .catch((error) => {
      next(error);
    })
});


/* POST  deleteBeer page */

router.post('/:idBeer/deleteBeer', (req, res, next) => {
  const {idBeer} = req.params;
  Beer.findByIdAndDelete(idBeer)
    .then((beer) => {
      return res.status(200).json(beer);
    }) 
    .catch((error) => {
      next(error);
    })
});

/* GET  list Beer page */

router.get('/beers', (req, res, next) => {
  Beer.find()
  .then((beers) => {
    return res.status(200).json(beers);
  })
  .catch((error) => {
    next(error);
  });
});


/* ------------------------------------API  Review --------------------------------------------*/

/* GET  list Reviews page */

router.get('/reviews', (req, res, next) => {
  Review.find()
  .populate('barID')
  .populate('creator')
  .then((reviews) => {
    return res.status(200).json(reviews);
  })
  .catch((error) => {
    next(error);
  });
});

/* GET-POST page create REVIEW Form */

router.post('/newReview/:id', (req, res, next) => {
  
  const {title,
          comment, 
          ratingBeer,
          ratingToilet,
          ratingMusic,
          image} = req.body;
  const barID = req.params.id
  const creator = req.session.currentUser._id;
  let numReview;
  let averageRatingReview = (ratingBeer + ratingMusic + ratingToilet)/3;
  let ratingBar;
  let averageRating;

  Review.create({
    title,
    comment, 
    barID,
    ratingBeer,
    ratingToilet,
    ratingMusic,
    image,
    creator,
  })
  .then((review) => {
    Review.find({barID: barID})
      .then((data) => {
          console.log(data);
          numReview = data.length;
          Bar.findById(barID)
            .then((bar) => {
              ratingBar = bar.averageRating;
              averageRating = (averageRatingReview + ratingBar)/(numReview)
              Bar.findByIdAndUpdate(barID, {averageRating})
                .then((data) =>{
                  return res.status(200).json(review);
                })
            })
      }) 
  })
  .catch(error => {
    console.log(error);
  })
});

/* POST  deleteReview page */

router.post('/:idReview/deleteReview', (req, res, next) => {
  const {idReview} = req.params;
  Review.findByIdAndDelete(idReview)
    .then((review) => {
      return res.status(200).json(review);
    }) 
    .catch((error) => {
      next(error);
    })
});

/* ------------------------------------API  User--------------------------------------------*/

/* GET User Datail page */

router.get('/users/:id', (req, res, next) => {
  let {id} = req.params;
  User.findById({_id: id})
    .populate('favouriteBeers')
    .populate('favouriteBars')
    .then((user) => {
      console.log(user)
      return res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

/* GET users listing. */
router.get('/users', (req, res, next) => {
  User.find()
  .then((users) => {
    return res.status(200).json(users);
  })
  .catch((error) => {
    next(error);
  });
});



/* POST  deleteUser page */

router.post('/:idUser/deleteUser', (req, res, next) => {
  const {idUser} = req.params;
  User.findByIdAndDelete(idUser)
    .then((user) => {
      return res.status(200).json(user);
    }) 
    .catch((error) => {
      next(error);
    })
});


module.exports = router;
