const {User,Home,City} = require("../models/photo");
const {getUser,setUser} = require("../services/Auth");



//User signin
async function createUser(req,res){
    const body = req.body;
    try{
        console.log(body)
   await User.create({
        name:body.name,
        email:body.email,
        password:body.password,
        contact:body.contact
    }).then(()=>res.json({msg:"successfully created"}));
}
    catch(err){console.log(err);res.json({msg:"User already exists"})}
}


//User login
async function handleLogin(req,res){
    const body = req.body;
    const user = await User.findOne({email:body.email,password:body.password});
    if(user){
        console.log(user);
        res.cookie("hnd",setUser(user))
       return res.json({msg:"succesfully logged in"})
    }
    res.json({msg:"Invalid"});
    
}

//To create an house
async function houseCreate(req,res){
    if(res.user===""){
        return res.json({msg:"login required"});
    }
    const pictures = req.files.map(file=>
        ({
          data: file.buffer.toString('base64'),
          contentType:file.mimetype
        })
      );
    const body = req.body;
    const home = Home({
        city:body.city.toUpperCase(),
        district:body.district.toUpperCase(),
        cost:body.cost,
        bedrooms:body.bedrooms,
        bathroom:body.bathroom,
        kitchen:body.kitchen,
        description:body.description,
        user:res.user.id,
        latitude:body.latitude,
        longitude:body.longitude,
        pic:pictures

    });
    await home.save();
    try{
        await City.create({
            cityName:body.city.toUpperCase()
        })
    }catch{}
    res.json({msg:"Done"})
}

//to get a particular house
async function getHouse(req,res){
    const id = req.params.id;
    const house = await Home.findById(id);
    const user = await User.findById(house.user);
    return res.json({data:house,user:user});
}

//to get all houses of user
async function userHouses(req,res){
    const id = res.user.id;
    const houses = await Home.find({user:id});
    return res.json({data:houses});
}

//to get houses of a city
async function cityHouses(req,res){
    const city = req.params.id;
    const houses = await Home.find({city:city});
    let users=[];
    for(const house of houses){
        const us = await User.findById(house.user);
        users.push(us);
    }
    return res.json({data:houses,users:users})
}

//to logout
async function userLogout(req,res){
    res.clearCookie("hnd");
    console.log("Logged out");
    return res.json({msg:"logout sucessfull"});
}

//get all cities registered
async function getAllCities(req,res){
    const cities = await City.find({});
    return res.json({data:cities})
}

//delete house
async function deleteHouse(req,res){
    const id = req.params.id;
    await Home.deleteOne({_id:id});
    return res.json({msg:"delted"});
}

//get the current user
async function getCurrentUser(req,res){
    console.log("Resquest made")
    if(res.user===""){
        return res.json({msg:"please Login"})
    }
    const user = await User.findById(res.user.id);
    return res.json({msg:"Hello",user:user});
}


module.exports={
    createUser,
    handleLogin,
    houseCreate,
    getCurrentUser,
    getHouse,
    deleteHouse,
    userLogout,
    cityHouses,
    userHouses,
    getAllCities
}