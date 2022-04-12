const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      require: true,
      maxlength: 32,
    },
    lastName: {
      type: String,
      trim: true,
      require: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: 32,
    },
    password: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

UserSchema.methods.authenticate = async function authenticate(plainText) {
  const match = await bcrypt.compare(plainText, this.password);

  if (match) {
    return true;
  }

  return false;
};

const Model = mongoose.model('User', UserSchema);

module.exports = Model;
