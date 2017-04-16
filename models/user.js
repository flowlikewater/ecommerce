var mongoose = require('mongoose');
/* elegant mongodb object modeling for node.js, kind of the same as RAKE*/
var bcrypt = require('bcrypt-nodejs');
/* bcrypt is a library to hash a password before it is saved to the database,
eg. abc123 --> saved as --> 12312sbac12 */
var Schema = mongoose.Schema;

/* STEP 1: Create the user schema attributes / characteristics / fields
e.g. class Human -> characteristics = hair, weight, height, name */
var UserSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,
  profile: {
    name: { type: String, default: ''},
    picture: {type: String, default: ''}
  },
  address: String,
  history: [{
    date: Date,
    paid: {type: Number, default: 0},
    // item: {type: Schema.Types.ObjectId, ref: ''}
  }]
  // History: when users purchases something, we push the cost and quantity of item and date etc.
});

/* STEP 2: Hash the password before it is saved to the database */
UserSchema.pre('save', function(next){
// save the password before password is even saved
 var user = this;
 // declaring a variable - this is equal to UserSchema
 if (!user.isModified('password')) return next();

 bcrypt.genSalt(10, function(err, salt) {
  // generate salt with 10 different random data
  if (err) return next(err);
  // if there is an error, return with a callback
  bcrypt.hash(user.password, salt, null, function(err, hash){
    // apply salt (which generates 10 different data to password)
    if (err) return next(err);
    user.password = hash;
    next();
  })
 })
});

/* Compare password in the database and the one that users type in */
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};



module.exports = mongoose.model('User', UserSchema);
// I want to export the entire schema so that other files can use it
