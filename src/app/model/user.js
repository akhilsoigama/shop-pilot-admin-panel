import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }
  },
  { timestamps: true }
);

const UserModel = mongoose.models.UserPanel || mongoose.model("UserPanel", UserSchema);
export default UserModel;
 