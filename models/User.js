import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
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
// module.exports = User;
// module.exports=mongoose.model("User",userSchema);

const User=mongoose.model("User",userSchema);
export default User;