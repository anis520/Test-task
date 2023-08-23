import mongoose from "mongoose";

// create category schema

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    sector: {
      type: String,
    },
    subsector: {
      type: String,
    },
    microsector: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// export category

export default mongoose.model("user", userSchema);
