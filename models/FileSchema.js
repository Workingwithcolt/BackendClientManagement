const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    file: {
        type: Buffer,
        required: true
    }

})
fileSchema.pre('save', async function (next) {
    const modalDataSchema = this;
    console.log(modalDataSchema);
    next();
})
module.exports = mongoose.model("file", fileSchema)


