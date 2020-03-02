const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('./models/Users')
require('../../lib/passport')

//find all users
router.get('/', (req,res)=>{
  //empty object allows us to fill with users
  User.find({})
  .then(users=>{
    return res.status(200).json({message: 'Success', users});
  })
  .catch(err => res.status(500).json({message:'Server Error'}));
})

router.get('/findmovie',(req, res)=>{
  res.render('findmovie')
})


router.get('/menu', (req, res)=>{
  if(req.isAuthenticated()){
    
    return res.render('menu')
  } else {
    res.send('Unauthorized')
  }
});

router.get('/fail', (req, res)=>{
  return res.render('fail');
})

//Validation middleware
const myValidation = (req,res, next)=>{
 //validate the input
 if(!req.body.name || !req.body.email || !req.body.password){
  return res.status(403).json({message:"All Inputs Must Be Filled"});
}
next();
}

//Register function WITH Passport
router.post('/register', myValidation, (req, res)=>{
  //check if user exists
User.findOne({email:req.body.email})
.then(user=>{
  //check to see if there is a user value
  if(user){
    return res.status(400).json({message:"User already exist"});
  }
  //create new user from the model
  const newUser = new User();
  //salt password...place extra characters in password to make harder to guess
  const salt = bcrypt.genSaltSync(10);
  //has password
  const hash = bcrypt.hashSync(req.body.password, salt);
  //set values for the user to the model keys
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.password = hash;
  //save the user
  newUser.save()
  .then(user =>{
    return req.login(user, (err)=>{
      if(err){
        return res.status(500).json({message:'Server Error', err})
      } else{
        console.log('register', req.session);
        res.redirect('/users/menu');
      }
    })

  })
  .catch(err=> res.status(400).json({message:"User not save", err}))

})
.catch(err=>res.status(418).json({message:"We messed up", err}))
 
});



//login with Passport
router.post('/login',
//authenticate using local-login from passport file
  passport.authenticate('local-login',{
    successRedirect: '/users/menu',
    failureRedirect: '/users/fail',
    failureFlash: true
  })
);


//Logout User
router.get('/logout', (req, res)=>{
  req.session.destroy();
  console.log('logout...', req.session)
  req.logout();
  return res.redirect('/');
});

module.exports = router;
