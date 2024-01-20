const mongoose=require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    category:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true
    },
    depo:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    createddate:{
        type:String,
        required:true,
    }
});




userSchema.plugin(passportLocalMongoose);

// module.exports = User;

module.exports=mongoose.model("User",userSchema);

// const UserModel=mongoose.model("User",userSchema);
// module.exports=UserModel;