const boom = require('@hapi/boom');
const User = require('../models/User');

const axios = require('axios');

exports.allUsers = async (req,res) => {
  axios.post('https://5de9e890cb3e3800141b950e.mockapi.io/api/v1/users')
    .then((response) => {
            return response;
    })
    .then((response) => {
      var dt = axios.get('https://5de9e890cb3e3800141b950e.mockapi.io/api/v1/users');
      return dt;
    })
    .then((users)=>{
      res.send(users.data);
    })
    .catch(error => {
        console.log("api error:" + error);
        throw error;
    })
};

// Get all users
exports.getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single user by ID
exports.getSingleUser = async (req) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new user
exports.addUser = async (req) => {
  const { body } = req;
  try {
    const user = new User(body);
    return user.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// User login
exports.loginUser = async (req) => {
  const { body } = req;
  try {
    //Lets validate the data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong!');

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Email or password is wrong!');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    //return token();
    // return user();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing user
exports.updateUser = async (req) => {
  try {
    const { body: updateData } = req;
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    return user;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a user
exports.deleteUser = async (req) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id);
    return user;
  } catch (err) {
    throw boom.boomify(err);
  }
};
