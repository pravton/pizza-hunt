const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// schema for replies
const ReplySchema = new Schema(
  { 
    // set custom id to avaoid confusion with parent comment_id
    replyId: {
      type: Schema.Types.ObjectId,
      defaut: () => new Types.ObjectId()
    },
    replyBody: {
      type: String
    },
    writtenBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String
    },
    commentBody: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  },
);

// Get total count of comments and replies on retrieval
CommentSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;