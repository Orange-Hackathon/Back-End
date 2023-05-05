const mongoose = require("mongoose");
const validator = require("validator");

const crypto = require("crypto");
//const { default: isEmail } = require("validator/lib/isemail");

const userPrefsSchema = new mongoose.Schema({
  /*********************************************************************************
   * the attributes
   **********************************************************************************/

  emailPrivateMessage: {
    type: Boolean,
    default: true,
  } /* determine if the user will be emailed when there is a private message*/,
  countryCode:
    String /* the country code of the user may be used in validation the phone number and recommendations of the posts*/,
  commentsNum:
    Number /* the default num of comments of the post will be shown after the post*/,
  emailCommentReply: {
    type: Boolean,
    default: true,
  } /* determines if the user will be emailed when there is a reply on his commment */,
  emailUpVoteComment: {
    type: Boolean,
    default: false,
  } /* determines if the user will be emailed when there is an UP vote on his comment*/,
  emailPostReply: {
    type: Boolean,
    default: true,
  } /* determines if the user will be emailed when there is areply on his post */,
  emailUpVote: {
    type: Boolean,
    default: false,
  } /* determines if the user will be emailed when there is an UP vote in general*/,
  emailUnsubscripeAll: {
    type: Boolean,
    default: false,
  },
  publicVotes: {
    type: Boolean,
    default: true,
  } /* determine if the user will allow the public votes on his content or not */,
  enableFollowers: {
    type: Boolean,
    default: true,
  } /* determine if the user will enable any one to follow him */,
  highLightNewcomments: {
    type: Boolean,
    default: true,
  } /* determine if the new comments will be highlighted*/,
  defaultCommentSort: {
    /* determines the criteria of sorting comments*/ type: String,
    enum: ["top", "new", "random", "best", "hot"],
    default: "new",
  },
  labelNSFW: {
    type: Boolean,
    default: false,
  } /* determine if the user to label nsfw content in the feed*/,
  markMessagesRead: {
    type: Boolean,
    default: true,
  } /* indicate the reading of all messages of the user*/,
  liveOrangereds: {
    type: Boolean,
    default: true,
  } /* determine if the new notifications will be highlighted in red*/,
  showLinkFlair: {
    type: Boolean,
    default: true,
  } /* determine the show of link flair*/,
  showLocationBasedRecommendation: {
    type: Boolean,
    default: true,
  } /* show recommended content based on location of the user */,
  searchIncludeOver18: {
    type: Boolean,
    default: true,
  } /* determine the availability of searching over18*/,
  over18: {
    type: Boolean,
    default: true,
  } /* determine if the age over 18*/,
  language:
    String /* Interface language (IETF language tag, underscore separated) */,
  showPostInNewWindow: {
    type: Boolean,
    default: false,
  } /* showing the clicked posts in new window*/,
  emailMessages: {
    type: Boolean,
    default: true,
  } /* determine if the user will be eamiled when there is a new message */,
  threadedMessages: {
    type: Boolean,
    default: true,
  } /* determine the availability of the threaded messages */,
  prefShowTrending: {
    type: Boolean,
    default: true,
  },
});

const isBannedOrMutedSchema = mongoose.Schema({
  value: {
    type: Boolean,
    default: false,
  },
  date: Date,
});

const notificationSchema = mongoose.Schema({
  notificationID: {
    type: mongoose.Schema.ObjectId,
    ref: "Notification",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const memberSchema = new mongoose.Schema({
  communityId: {
    type: String /*mongoose.Schema.ObjectId,*/,
    ref: "Community",
  },
  isMuted: {
    type: isBannedOrMutedSchema,
    default: () => ({}),
  },
  isBanned: {
    type: isBannedOrMutedSchema,
    default: () => ({}),
  },
});

const voteSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
  },
  type: Number,
});
const voteCommentSchema = new mongoose.Schema({
  commentID: {
    type: mongoose.Schema.ObjectId,
    ref: "Comment",
  },
  type: Number,
});

const moderatorSchema = new mongoose.Schema({
  communityId: {
    type: String /*mongoose.Schema.ObjectId,*/,
    ref: "Community",
  },
  role: {
    type: String,
    enum: ["creator", "moderator"],
  },
});

const meSchema = new mongoose.Schema({
  /*********************************************************************************
   * the attributes
   **********************************************************************************/
  emailUserNewFollwer: {
    type: Boolean,
    default: true,
  },
  emailUsernameMention: {
    type: Boolean,
    default: true,
  },
  emailUpVotePost: {
    type: Boolean,
    default: true,
  },
});

const aboutSchema = new mongoose.Schema({
  /*********************************************************************************
   * the attributes
   **********************************************************************************/
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isMod: {
    type: Boolean,
    default: false,
  },
  prefShowTrending: {
    type: Boolean,
    default: true,
  },
  acceptFollowers: {
    type: Boolean,
    default: true,
  },
});

const userSchema = new mongoose.Schema({
  /*********************************************************************************
   * the attributes
   **********************************************************************************/
  _id: {
    type: String,
    minLength: [5, "the minimum length is 5 characters"],
    maxLength: [20, "the maximum length is 20"],
  },
 
  canCreateSubreddit: {
    type: Boolean,
    default: true,
  },
  friendsCount: Number,
  isDeleted: {
    type: Boolean,
    default: false,
    select: false,
  },
  avatar: {
    type: String,
    default: "default.jpg",
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  balance:{
    type:Number,
    default:0
  },
  phoneNumber: {
    type: String,
    unique: true,
    validate: [validator.isMobilePhone, "please provide a valid phone number"],
  },
  createdAt: {
    type: Date,
    required: [true, "missing the date of creation of the user"],
    default: Date.now(),
  },
  
  PIN: {
    type: String,
    
    minLength: [4, "the minimum length of PIN is 4"],
    maxLength: [4, "the max length of the PIN is 4"],
    /*we didn't put required field due to google and facebook signing in*/
  },
 

  type: {
    type: String,
    enum: ["bare email", "facebook", "gmail"],
    default: "bare email",
  },
  /*********************************************************************************
   * the relations
   **********************************************************************************/

  /***************************************
   * recursive relations
   ***************************************/
  friendRequestToMe: [
    {
      type: String /*mongoose.Schema.ObjectId,*/,
      ref: "User",
    },
  ],
  messages: [
    {
      type: String /*mongoose.Schema.ObjectId,*/,
      ref: "Message",
    },
  ],
  friendRequestFromMe: [
    {
      type: String,
      ref: "User",
    },
  ],
  friend: [
    {
      type: String /*mongoose.Schema.ObjectId,*/,
      ref: "User",
    },
  ],
  blocksFromMe: [
    {
      type: String /*mongoose.Schema.ObjectId,*/,
      ref: "User",
    },
  ],
  blocksToMe: [
    {
      type: String /*mongoose.Schema.ObjectId,*/,
      ref: "User",
    },
  ],
  follows: [
    {
      type: String /* mongoose.Schema.ObjectId,*/,
      ref: "User",
    },
  ],
  followers: [
    {
      type: String /* mongoose.Schema.ObjectId,*/,
      ref: "User",
    },
  ],
  /***************************************
   * communities relations
   ***************************************/
  member: [
    {
      type: memberSchema,
    },
  ],
  moderators: [
    {
      type: moderatorSchema,
    },
  ],
  /***************************************
   * category relation
   ***************************************/
  categories: [
    {
      type: String,
      // ref:'Category'
    },
  ],
  /***************************************
   * posts relations
   ***************************************/
  hasPost: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  ],
  hasComment: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
  hasReply: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
  hasVote: [
    {
      type: voteSchema,
    },
  ],
  followPost: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  ],
  hiddenPosts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  ],
  savedPosts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  ],
  mentionedInPosts: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
  ],
  /***************************************
   * notifications relations
   ***************************************/
  notifications: [
    {
      type: notificationSchema,
    },
  ],
  /***************************************
   * comment relations
   ***************************************/
  votedComments: [
    {
      type: voteCommentSchema,
    },
  ],
  mentionedInComments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
});

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes with millis
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
