const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
    },
    token:{
        type:String
    }
});

const userModal = mongoose.model("signup", userSchema);

module.exports = userModal;