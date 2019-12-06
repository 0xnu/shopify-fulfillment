const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'invalid email'],
    createIndexes: { unique: true },
  },
  password: { type: String, required: true },
  phone: String,
  userStatus: String,
});

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
  if(!validatePassword) return res.status(400).send('Email or password is wrong!');
};

userSchema.methods.findEmail = async function findEmail(data) {
  return res.status(200).send(data, this.email);
  if(!user) return res.status(400).send('Email or password is wrong!');
};

module.exports = mongoose.model('User', userSchema);
