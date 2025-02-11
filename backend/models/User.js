import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedPasswords: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserPasswords" }] // Reference to SavedPasswords model
});

const User = mongoose.model("User", UserSchema);
export default User;
