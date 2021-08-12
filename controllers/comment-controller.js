const { Comment, Pizza } = require('../models');

const commentController = {
  // add comments to pizza
  addComment({ params, body }, res) {
    console.log(body);
    Comment.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return Pizza.findByIdAndUpdate(
          { _id: params.pizzaId },
          { $push: {comments: _id }},
          { new: true }
        )
      })
      .then(dbPizzaData => {
        if(!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  },

  // remove comment
  removeComment({ params }, res) {
    Comment.findByIdAndDelete({ _id: params.commentId })
    .then(deletedComment => {
      if(!deletedComment) {
        res.status(404).json({ message: 'No comment found with this id!'})
      }
      return Pizza.findByIdAndUpdate(
        { _id: params.pizzaId },
        { $pull: {comments: params.commentId}},
        { new : true}
      )
    })
    .then(dbPizzaData => {
      if(!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.json(err));
  }
};

module.exports = commentController;