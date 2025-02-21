import mongoose from "mongoose";

const SavedPasswordsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    website: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const UserPasswords = mongoose.model("UserPasswords", SavedPasswordsSchema);
export default UserPasswords;
