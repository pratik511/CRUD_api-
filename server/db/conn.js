const mongoose = require("mongoose");

const DB = "mongodb+srv://Pratik:Pratik1@cluster0.ujxob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(DB,{
    // useCreateIndex:true,
    // useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => console.log("connection start")).catch((error) => console.log(error.message));