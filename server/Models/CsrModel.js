const mongoose = require("mongoose")

const CsrSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
})

const Csr = mongoose.model("Csr", CsrSchema)

module.exports = Csr