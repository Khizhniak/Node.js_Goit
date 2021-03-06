const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const gravatar = require('gravatar');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const SALT = 7;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: { type: String, required: true },
    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
      default: 'free',
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true);
      },
    },
    token: { type: String, default: null },
    verify: { type: Boolean, default: false },
    verifyToken: { type: String, required: [true, 'Verify token is required'] },
  },
  { versionKey: false }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(SALT));
  next();
});

class User {
  constructor() {
    this.db = mongoose.model('user', userSchema);
  }

  findByEmail = async email => {
    const data = await this.db.findOne({ email: email });
    return data;
  };

  findById = async id => {
    const data = await this.db.findOne({ _id: id });
    return data;
  };

  findByField = async field => {
    const data = await this.db.findOne(field);
    return data;
  };

  updateUser = async (id, data) => {
    return await this.db.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
  };

  //for register
  createUser = async data => {
    const user = new this.db(data);
    console.log(user);
    return user.save();
  };

  updateToken = async (id, token) => {
    return await this.db.updateOne({ _id: id }, { token });
  };

  login = async user => {
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await this.updateToken(id, token);
    return token;
  };

  logout = async userId => {
    return await this.updateToken(userId, null);
  };
}

module.exports = new User();
