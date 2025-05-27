import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    docId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctor",
        required: true,
    },
    slotDate: {
        type: String,
        required: true,
        trim: true,
    },
    slotTime: {
        type: String,
        required: true,
        trim: true,
    },
    userData: {
        type: Object,
        required: true,
    },
    docData: {
        type: Object,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
    payment: {
        type: Boolean,
        default: false,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});


const appointmentModel =
    mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default appointmentModel;
