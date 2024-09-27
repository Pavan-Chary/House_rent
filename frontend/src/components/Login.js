
function Login(props){

    const handleSubmit=(event)=>{
        props.handleLogin(event);
    }

    return (
        <>
            <div className=" mt-20 border border-black rounded-md w-[300px] md:w-[500px] m-auto py-5 shadow-md shadow-black">
                <form method="POST" className="w-auto p-2 pr-4 flex flex-col" onSubmit={(event)=>{ event.preventDefault();handleSubmit(event)}}>
                    <label htmlFor="email" className="ml-2">Email</label>
                    <input type="email" required  className="border border-black mt-[1px] m-2 w-full" ref={props.emailL}  />
                    <label htmlFor="password" className="ml-2">Password</label>
                    <input type="password" required  className="border border-black mt-[1px] m-2 w-full" ref={props.passwordL} />
                    <button type="submit" className="border w-24 border-black m-auto mt-5 rounded-md p-2">Login</button>
                </form>
            </div>
        </>
    )
}
export default Login