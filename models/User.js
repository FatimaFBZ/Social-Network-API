const { Schema, model } = require('mongoose');

// Schema to create a user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true,
      trimmed:true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    thoughts: [
      {
      type: Schema.Types.ObjectId,
       

      ref:'thought',
    },
  ],
    
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);



userSchema
.virtual('friendsCount').get(function(){
    return this.friends.length
})
const User = model('user', userSchema);

module.exports = User;
