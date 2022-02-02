const { User, Thought } = require('../models')



module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
    
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove them by id
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
    .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
  },
//update a user
updateUser(req, res){
  User.findByIdAndUpdate(
    {_id: req.params.userId},
    {$set: req.body},
    {runValidators:true, new:true}
  ).then((user)=>!user
  ?res.status(404).json({message: 'this id doesnt have a user!'})
  :res.json(user)).catch((err)=>res.status(500).json(err))
},
  // Add a friend to a user's friend list using id
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      {runValidators:true ,new: true}
    
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  // Remove friend
  removeFriend(req, res) {
    //console.log(req.params.UserId)
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: {friends: req.params.friendId }},
      { runValidators:true, new: true }
    )
    .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
