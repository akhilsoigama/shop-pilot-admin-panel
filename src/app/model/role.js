// app/model/role.js
import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  permissions: [{ type: String, required: true }] 
});

const Role = mongoose.models.Role || mongoose.model("Role", RoleSchema);
export default Role;