import mongoose from "mongoose";

const Schema=mongoose.Schema;

const previousDutySchema=new Schema({
    id:{
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

// module.exports=mongoose.model("Previous Duty",previousDutySchema);
const previousDuty=mongoose.model("Previous Duty",previousDutySchema);
export default previousDuty;