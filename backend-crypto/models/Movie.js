const mongoose  = require("mongoose");

const MovieSchema = new mongoose.Schema(
    {
        title:{ type: String, require: true, unique: true},
        desc: { type: String},
        img: { type: String},
        imgTitle: { type: String,},
        imgSmall: { type:Boolean, default: false},
        trailer: { type:String},
        video: { type:String},
        year: { type:Number },
        ageLimit: {type: String},
        genre : { type: String},
        isSeries: { type: Boolean, default: false}
    },
    { timestamps: true}
)

module.exports = mongoose.model("Movie", MovieSchema)