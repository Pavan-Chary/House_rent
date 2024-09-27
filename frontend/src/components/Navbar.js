import {useState} from 'react'
import { IoMenu } from "react-icons/io5";
import {Link} from 'react-router-dom';

export default function Navbar(props){
    console.log(window.innerWidth)
    const [showMenu,setShowMenu] = useState(false);
    const handleMenu=()=>{
        if(showMenu)setShowMenu(false);
        else
        setShowMenu(true);
    }
    return (
        <>
            <div className="w-full m-0 h-24 shadow-lg shadow-black flex flex-col md:flex-row justify-between bg-[#21232555] static" >
                    <div className="my-auto flex p-1 justify-around w-full">
                    <Link to="/"><h1 className="mx-3" onClick={()=>{setShowMenu(false);}}> logo </h1></Link>
                    <h1 className="my-auto mx-3" onClick={()=>{props.setShowProfile(!props.showProfile);setShowMenu(false);}}>Profile</h1>
                    </div>
                    <div className="my-auto flex p-1">
                    <input className="my-auto w-full md:min-w-[500px] px-5 py-[4px] rounded-full focus:outline-none" ref={props.searchValue} onFocus={()=>{setShowMenu(false);props.setShowSuggestions(true);}} placeholder="Your Preffered City" onChange={props.handleSearchChange}/>
                    <div className="my-auto m-4 md:hidden text-2xl" onClick={()=>{handleMenu();props.setShowSuggestions(false);}}>
                        <IoMenu/>
                    </div>
                    </div>
                    <div className="my-auto justify-between w-[250px] hidden md:flex">
                    {!props.user?<Link to="/Login"><button className="w-auto h-auto my-auto m-2 p-2 rounded-xl bg-[#105e5ee6]">Login</button></Link>:
                    <button className="w-auto h-auto m-2 my-auto p-2 rounded-xl bg-[#105e5ee6]" onClick={props.handleLogout}>Logout</button>}
                   <Link to="/Signin"><button className="w-auto h-auto m-2 my-auto p-2 rounded-xl bg-[#105e5ee6]">Signup</button></Link>
                    </div>
    
            </div>
                {
                   showMenu?<div className="my-auto mb-0 flex flex-col justify-between w-52 right-0 absolute p-0">
                        {!props.user?<Link to="/Login" ><button className="w-36 h-auto my-1 p-1 mx-0 rounded-xl bg-[#105e5ee6]" onClick={()=>setShowMenu(false)}>Login</button></Link>:
                        <Link to="/"><button className="w-36 h-auto my-1 p-1 mx-0 rounded-xl bg-[#105e5ee6]" onClick={()=>{props.handleLogout();setShowMenu(false);}} >Logout</button></Link>}
                        <Link to="/Signin" className="right-0 relative"><button className="w-36 h-auto mx-0 my-1 p-1 rounded-xl bg-[#105e5ee6]" onClick={()=>setShowMenu(false)}>Signup</button></Link>
                    </div>:<></>
                }  
                
                    {/* <input type="text" ref={props.searchValue} className="border border-black" onChange={props.handleSearchChange}/> */}
       
        </>
    )
}