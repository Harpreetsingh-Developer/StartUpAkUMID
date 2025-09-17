import mongoose from "mongoose";

const pollOptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [pollOptionSchema],
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length >= 2;
        },
        message: 'A poll must have at least two options',
      },
    },
    createdBy: {
      type: String, // Could be a ref to a User model if implemented
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(+new Date() + 7*24*60*60*1000) // Default to 7 days from creation
    }
  },
  {
    timestamps: true,
  }
);

pollSchema.virtual('totalVotes').get(function() {
  return this.options.reduce((sum, option) => sum + option.votes, 0);
});

pollSchema.set('toJSON', { virtuals: true });

export const Poll = mongoose.model("Poll", pollSchema);
