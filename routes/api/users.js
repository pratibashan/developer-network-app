const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

//async await can be used in Asynchronous fn whenever we get a promise from the fn call. We can avoid using .then & response lines since async/await waits until it gets the response.

//@route   POST api/users
//@desc    Register user
//@access  Public

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid Email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    //See if user exists in DB
    let user = await User.findOne({ email }) // findOne({email:email})
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    //Get users gravator
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })

    //creating a new user object
    user = new User({
      name,
      email,
      password,
      avatar
    })

    // Encrypt Password
    // need to first create a salt before we hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //saving the new user in the DB
    await user.save();

    //Return jsonwebtoken
    const payload = {
      user: {
        id: user.id // id from DB
      }
    }
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      })
  }
  catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }

});


module.exports = router;