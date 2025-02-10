import mongoose from "mongoose";

const SiteProfileScheme = new mongoose.Schema({
    website: String,
    username: String,
    password: String
});

const SiteProfile = mongoose.model("SiteProfile", SiteProfileScheme);
export default SiteProfile;