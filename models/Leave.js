const mongoose = require("mongoose");

const Schema=mongoose.Schema;

const leaveSchema= new Schema({
    username:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true
    },
    problem:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model("Leave",leaveSchema);