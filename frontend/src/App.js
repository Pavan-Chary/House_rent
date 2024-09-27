import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Signin from './components/Signin'
import AddHome from './components/AddHome'
import Profile from './components/Profile'
import UserHousesList from './components/UserHousesList'
import Navbar from './components/Navbar'
import {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  const [msg,setMsg] = useState("");

  const showMsg=(data)=>{
      setMsg(data);
      setTimeout(()=>setMsg(""),2000);
  }


    const [im,setIm] = useState();

    // current user details

    const [currentUser,setCurrentUser] = useState(null);

    const getCurrentUser = async()=>{
      
       await fetch("/api/getUser").then(res=>res.json())
      .then(res=>{
        if(res.msg!=="please Login"){
          setCurrentUser(res.user);
        }
        else{
          setCurrentUser(null);
        }
      });
      console.log(currentUser);
    }

   

    //Login

    const emailL = useRef();
    const passwordL = useRef();
    const handleLogin= async(event)=>{
      event.preventDefault();
      const data={
        email:emailL.current.value,
        password:passwordL.current.value
      }
      await fetch("/api/login",{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
          },
        body:JSON.stringify(data)
      }).then(res=>res.json()).then(res=>showMsg(res.msg));
      emailL.current.value="";
      passwordL.current.value="";
      await getCurrentUser();
    }


    //Sigin

    const emailS = useRef();
    const passwordS = useRef();
    const nameS = useRef();
    const contactS = useRef();

    const handleSignin=(event)=>{
      event.preventDefault();
      console.log("Sign in success")
      const data={
        name:nameS.current.value,
        email:emailS.current.value,
        password:passwordS.current.value,
        contact:contactS.current.value
      }
      fetch("/api/signin",{
        method:"POST",
        headers:{
        'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
      }).then(res=>res.json()).then(res=>showMsg(res.msg));
      nameS.current.value="";
      emailS.current.value="";
      passwordS.current.value="";
      contactS.current.value="";
    }

    //Logout

    const handleLogout= async()=>{
      await fetch("/api/logout").then(res=>res.json()).then(res=>{showMsg(res.msg);getCurrentUser();});
    }
    
    // get All cities
    const allCities = useRef([]);
    const searchValue = useRef();
    const setInitialCities =()=>{
      let newCities=[];
      allCities.map(city=>newCities.push(city.cityName));
      allCities.current=newCities;
      setCurrentCities(newCities);
    }
    const handleSearchChange=()=>{
      let newCities=[];
      allCities.current.map(city=>{
        if(city.cityName.includes(searchValue.current.value.toUpperCase()) && searchValue.current.value){
          newCities.push(city.cityName);
        }
       
      });
      searchValue.current.value?console.log(searchValue.current.value):console.log("hello");
      setCurrentCities(newCities);
    }
    const [currentCities,setCurrentCities]=useState([])
    const getAllCities= async()=>{
      await fetch("/api/getCities").then(res=>res.json())
      .then(res=>{allCities.current=res.data;console.log(allCities)})
    }
    //Show by city name

    const [showHomes,setShowHomes]=useState([]);
    const [showUsers,setShowUsers]=useState([]);
    const getHomesByCity =(city)=>{
      fetch("/api/cityHouses/"+city).then(res=>res.json())
      .then(res=>{setShowHomes(res.data);setShowUsers(res.users);})
    }

    
    // get All the houses of a user
    const [userHouses,setUserHouses] = useState([])
    const getAllHousesOfUser= async()=>{
      await fetch("/api/userHouses/"+currentUser._id)
      .then(res=>res.json())
      .then(res=>setUserHouses(res.data));
    }

    //delete house

    const handleDeleteHouse= async(id)=>{
      await fetch("/api/deleteHouse/"+id).then(res=>res.json())
      .then(res=>{showMsg(res.msg)});
      getAllHousesOfUser();

    }

    

    //Add new House
    const city = useRef();
    const district = useRef();
    const  cost = useRef();
    const bedrooms = useRef();
    const bathrooms = useRef();
    const kitchen = useRef();
    const description = useRef();
    const latitude = useRef();
    const longitude = useRef();
    const pic = useRef();
    


  const  handleAddHouse=(event)=>{

    console.log("Recieved...")
    event.preventDefault();
    const data={
      city:city.current.value,
      district:district.current.value,
      cost:cost.current.value,
      bedrooms:bedrooms.current.value,
      bathroom:bathrooms.current.value,
      kitchen:kitchen.current.value,
      description:description.current.value,
      latitude:latitude.current.value,
      longitude:longitude.current.value

    }
    const form_data = new FormData();
    let i=0;
    for(i=0;i<pic.current.files.length;i++){
    form_data.append('pic',pic.current.files[i])
    }
    for (const [key, value] of Object.entries(data)) {
      form_data.append(key, value);
    } 
    axios.post("/api/addHome/",form_data)
    .then(res=>{showMsg("successfuly added");console.log(res);})
    .catch(res=>console.log(res));

    city.current.value="";
    district.current.value="";
    cost.current.value="";
    bedrooms.current.value="";
    bathrooms.current.value="";
    kitchen.current.value="";
    description.current.value="";
    latitude.current.value="";
    longitude.current.value="";
  }

  const startWith=()=>{
    getCurrentUser();
    getAllCities();
    //setInitialCities();

  }
  const [showSuggestions,setShowSuggestions] = useState(false);
  const [showProfile,setShowProfile] = useState(false);

  
 useEffect(startWith,[]);
  return (
    <>
    <BrowserRouter>
      <Navbar user={currentUser} handleLogout={handleLogout} searchValue={searchValue} handleSearchChange={handleSearchChange} currentCities={currentCities} getHomesByCity={getHomesByCity} setShowSuggestions={setShowSuggestions} setShowProfile={setShowProfile} showProfile={showProfile}/>
      <div className="h-12 mt-0 flex place-content-center">
          <h1 className="text-red-500 m-10">{""+msg}</h1>
      </div>
      
      
{/*     {showSuggestions?<div className="border border-black h-auto w-80 mt-10 mx-auto rounded-md">
    {currentCities.length===0?<h1>No results found</h1>:
    <>{currentCities.map(city=>
      <div onClick={()=>{getHomesByCity(city);setShowSuggestions(false);}}>
        <h1>{city}</h1>
        </div>
    )}</>}
  </div>:<></> } */}
      <Routes>
        <Route path='/' element={<>
          
        {showSuggestions?<div className="border border-black h-auto w-80 mt-10 mx-auto rounded-md">
        {currentCities.length===0?<h1>No results found</h1>:
        <>{currentCities.map(city=>
          <div onClick={()=>{getHomesByCity(city);setShowSuggestions(false);}}>
            <h1>{city}</h1>
            </div>
        )}</>}
  </div>:<></>}
        {showProfile?<Profile getAllHousesOfUser={getAllHousesOfUser} currentUser={currentUser} setShowProfile={setShowProfile}/>:<></>}
        
    </>
      }></Route>
        <Route path='/Login' element={ <Login emailL={emailL} passwordL={passwordL}  handleLogin={handleLogin} showMsg={showMsg} />}>
        </Route>
        <Route path='/Signin' element={<Signin emailS={emailS} passwordS={passwordS} nameS={nameS} contactS={contactS} handleSignin={handleSignin} showMsg={showMsg}/>}>
        </Route>
        <Route path="/UserHomes" element={<UserHousesList userHouses={userHouses} handleDeleteHouse={handleDeleteHouse}/>}
        ></Route>
        <Route path="/AddHome" element={<AddHome city={city} district={district} cost={cost} bedrooms={bedrooms} bathrooms={bathrooms} kitchen={kitchen} description={description} latitude={latitude} longitude={longitude} pic={pic} handleAddHouse={handleAddHouse} showMsg={showMsg}/> }></Route>
      </Routes>
    </BrowserRouter>
      {/* <div className="h-24 w-full ring ring-black m-5">
      
      <h1 className="text-red-500 m-10">{""+msg}</h1>
      </div>
      <button onClick={handleLogout}>Logout</button>
      <h1>search</h1>
      <input type="text" ref={searchValue} className="border border-black" onChange={handleSearchChange}/>
      <div className="border border-black h-auto w-80">
       {currentCities.length===0?<h1>No results found</h1>:<>{currentCities.map(city=>
          <div onClick={()=>getHomesByCity(city)}>
            <h1>{city}</h1>
            </div>
        )}</>}
      </div>
      <UserHousesList userHouses={showHomes}/>
      
      <Profile getAllHousesOfUser={getAllHousesOfUser} currentUser={currentUser} />
      <UserHousesList userHouses={userHouses} handleDeleteHouse={handleDeleteHouse}/>
      {/* {im?<h1 className="text-amber-200">hello!{im.name}</h1>:<h1></h1>}
      {im?im.pic.map((image)=><img alt="loading.." src={"data:"+image.contentType+";base64,"+image.data} className=" w-96 h-96 object-fit-cover"/> ):<h1></h1>} 
      <AddHome city={city} district={district} cost={cost} bedrooms={bedrooms} bathrooms={bathrooms} kitchen={kitchen} description={description} latitude={latitude} longitude={longitude} pic={pic} handleAddHouse={handleAddHouse} showMsg={showMsg}/> */}
    </>
  );
}

export default App;
