import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ["admin", "manager", "doctor"], 
        default: "doctor" 
    },
    speciality: {
        type: String,
        required: function() { return this.role === "doctor"; }
    },
    degree: {
        type: String,
        required: function() { return this.role === "doctor"; }
    },
    experience: {
        type: String,
        required: function() { return this.role === "doctor"; }
    },
    about: {
        type: String,
        required: function() { return this.role === "doctor"; }
    },
    available: { type: Boolean, default: true },
    fees: {
        type: Number,
        required: function() { return this.role === "doctor"; }
    },
    slots_booked: { type: Object, default: {} },
    address: {
        type: Object,
        required: function() { return this.role === "doctor"; }
    },
    date: { type: Number, required: true },
}, { minimize: false });

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
