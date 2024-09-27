const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
})
const User = mongoose.model("user",userSchema);

const homeSchema = new mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    bathroom:{
        type:String,
        required:true
    },
    kitchen:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    latitude:{
        type:Number,
    },
    longitude:{
        type:Number
    },
    pic:[{
        data:String,
        contentType:String,
    }],
});

const citiesSchema = new mongoose.Schema({
    cityName:{
        type:String,
        unique:true
    }
});

const Home = mongoose.model("home",homeSchema);

const City = mongoose.model("city",citiesSchema);

module.exports = {User,Home,City};