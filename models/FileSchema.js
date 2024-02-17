const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    Base64Data: {
        type: String,
        required: true
    },
    public: {
        type: Boolean
    },
    id: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
})

fileSchema.pre('save', async function (next) {
    const modalDataSchema = this;
    console.log(modalDataSchema);
    next();
})
module.exports = mongoose.model("file", fileSchema)


