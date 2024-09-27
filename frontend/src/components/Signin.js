import {useRef} from 'react'
import {Link} from 'react-router-dom';

export default function Signin(props){

    const pass = useRef();
    const handleSubmit=(event)=>{
        if(pass.current.value === props.passwordS.current.value){
            props.handleSignin(event);
        }
        else{
            props.showMsg("Please check your password")
        }
    }

    return (
        <>
        <div className=" mt-20 border border-black rounded-md w-[300px] md:w-[600px] m-auto py-5 pr-5 shadow-md shadow-black">
            <form method="POST" className="w-auto p-2 pr-4 flex flex-col" onSubmit={(event)=>{ event.preventDefault();handleSubmit(event)}}>
                <label htmlFor="name" className="ml-2">Name</label>
                <input type="text" required ref={props.nameS} className="border border-black mt-[1px] m-2 w-full"  />
                <label htmlFor="eamil" className="ml-2">eamil</label>
                <input type="eamil" required ref={props.emailS}  className="border border-black mt-[1px] m-2 w-full" />
                <label htmlFor="password" className="ml-2">password</label>
                <input type="password" required ref={props.passwordS}  className="border border-black mt-[1px] m-2 w-full"  />
                <label htmlFor="password" className="ml-2">password</label>
                <input type="text" required ref={pass}  className="border border-black mt-[1px] m-2 w-full" />
                <label htmlFor="contact" className="ml-2">Contact</label>
                <input type="text" pattern="^\+\d{1,3}?\s?\d{10}$" required ref={props.contactS}  className="border border-black mt-[1px] m-2 w-full"  />
                <button type="submit"  className="border border-black m-2 mx-auto rounded-md p-2" >Sign up</button>
                <Link to="/Login" classNmae="mx-auto">Proceed to Login</Link>
            </form>
            </div>
        </>
    )
}