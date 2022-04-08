const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    maxlength: 32
  },
  email: {
    type: String,
    trim: true,
    require: true,
    unique: 32
  },
  password: {
    type: String,
    default: ''
  },
  about: {
    type: String,
    require: true,
  },
  role: {
    type: Number,
    default: 0
  },
  history: {
    type: Array,
    default: []
  },
},
{ timestamps: true}
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
  console.log('plainText', plainText)
  console.log('this.password', this.password)
  console.log('compare', bcrypt.compare(plainText, this.password))
  const match = await bcrypt.compare(plainText, this.password);

  if(match) {
    console.log('match')
    return true;
  }
    console.log('not match')

  return false;
};

const Model = mongoose.model('User', UserSchema);

module.exports = Model;

// // Virtuals
// UserSchema
//     .virtual('password')
//     // set methods
//     .set(function (password) {
//         this._password = password;
//     });

// UserSchema.pre("save", function (next) {
//     // store reference
//     const user = this;
//     if (user._password === undefined) {
//         return next();
//     }
//     bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//         if (err) console.log(err);
//         // hash the password using our new salt
//         bcrypt.hash(user._password, salt, function (err, hash) {
//             if (err) console.log(err);
//             user.hashed_password = hash;
//             next();
//         });
//     });
// });

// /**
//  * Methods
// */
// UserSchema.methods = {
//     comparePassword: function(candidatePassword, cb) {
//         bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//             if (err) return cb(err);
//             cb(null, isMatch);
//         });
//     }
// }

// module.exports = mongoose.model('User', UserSchema);