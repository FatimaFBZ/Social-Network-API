const { Thought, User } = require('../models');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => { 
        User.findOneAndUpdate(
        {user:req.body.userId},
        {$addToSet:{thoughts:thought._id}},
        {new: true}
      ).then ((user) => res.json(thought));
        })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      })
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.deleteMany(
            { thoughts: req.params.thoughtId },
            { $pull:{thoughts:req.params.thoughtId}  },
            {  new: true }
          )
      )
      .then((user) =>
      !user
      ? res.status(404).json({
        message:'thought is deleted as well as the user'
      })
      
      :res.json({ message: 'Thought and Users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


  // Add a reaction

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet:{reactions: req.body} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


  // Delete a reaction by id
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: {reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
}