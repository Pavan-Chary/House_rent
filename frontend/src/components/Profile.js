import {Link} from 'react-router-dom'
export default function(props){

    return (
        <>
            <div className="border border-black w-fit h-auto p-4 m-3 mt-30">

                {props.currentUser?
                    <div>
                        <h1>{"Hello! "}{props.currentUser.name}</h1>
                       <Link to="/UserHomes"> <button className="border border-black" onClick={()=>{console.log("hello");props.getAllHousesOfUser();props.setShowProfile(false)}} >Manage your houses</button> </Link>
                       <Link to="/AddHome">Add a home</Link>
                    </div>:
                    <Link to="/Login">Login</Link>
                }

            </div>
        </>
    )
}