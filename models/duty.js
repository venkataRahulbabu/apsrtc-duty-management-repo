import mongoose from "mongoose";

const Schema=mongoose.Schema;

const dutySchema=new Schema({
    district:{
        type:String,
        required:true
    },
    depo:{
        type:String,
        required:true
    },
    dutyname:{
        type:String,
        required:true,
    },
    startdate:{
        type:String,
        required:true
    },
    enddate:{
        type:String,
        required:true
    },
    starttime:{
        type:String,
        required:true
    },
    endtime:{
        type:String,
        required:true
    },
    bustype:{
        type:String,
        required:true
    }
});

const duty=mongoose.model("Duty Detail",dutySchema);
export default duty;