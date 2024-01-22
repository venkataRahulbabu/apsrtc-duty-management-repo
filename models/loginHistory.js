import mongoose from "mongoose";
const Schema=mongoose.Schema;

const loginSchema=new Schema({
    id:{
        type:String,
        required:true,
    },
    timestamp:{
        type:String,
        required:true,
    },
    data:{
        type:mongoose.Schema.Types.Mixed,
        required:true,
    }
});

// module.exports=mongoose.model("Login History",loginSchema);
const loginHistory=mongoose.model("Login History",loginSchema);
export default loginHistory;
