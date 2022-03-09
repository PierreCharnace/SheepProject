const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: String, required: true },
    imageUrl: { type: String, required: false, default:0 },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    undisplay: { type: Boolean, required: false}
});
 module.exports = mongoose.model('Post', postSchema);

 //"title" : "Kikou",
 //"description" : "Youhou",
 //"userId" : "6225d14fa5528b3fc9cd0b6a",
 //"imageUrl": "IPy-iYt-L/icon-grey.png",
//"

//"title : Kikou",
 //  "description : Youhou",
//   "userId : 6225d14fa5528b3fc9cd0b6a",
//   "imageUrl: IPy-iYt-L/icon-grey.png",6225e35f173137a00cd4bd54
//"}