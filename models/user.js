const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

// Create the user schema attributes
// Types requires constructor objects
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, rerquired: true },
  profile: {
    name: { type: String, default: '' },
    picture: { type: String, default: '' }
  },
  address: String,
  history: [
    {
      date: Date,
      paid: { type: Number, default: 0 }
      // item: {type: Schema.Types.ObjectId, ref: ''}
    }
  ]
})

// Hash the password before we save it to the DB
UserSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    user.password = await bcrypt.hash(user.password, salt)
    return next()
  } catch (err) {
    return next(err)
  }
})

// Compare password in the DB with the password typed by the user
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
