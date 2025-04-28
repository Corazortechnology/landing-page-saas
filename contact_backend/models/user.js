import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required for sign-up"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required for sign-up"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

// Apply the uniqueValidator plugin to userSchema
userSchema.plugin(uniqueValidator);

// Create a virtual id field
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised
userSchema.set("toJSON", {
  virtuals: true,
});

// Pre-save hook to remove confirmPassword from database
userSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
