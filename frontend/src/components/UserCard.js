export default function(props){
    const loa = "https://www.google.com/maps/@"+props.home.latitude+","+props.home.longitude+",52m"+"?"+"q="+props.home.latitude+","+props.home.longitude ;
    return (
        <>
            <div className="border border-black w-fit h-auto m-auto mt-5 p-3 flex flex-col">
                <div className="bg-red-500 text-black m-2 self-end p-1 w-fit" onClick={()=>props.handleDeleteHouse(props.home._id)}>delete</div>
                {props.home.pic.map((image)=>
                    <img alt="loading.." src={"data:"+image.contentType+";base64,"+image.data} className=" w-96 h-72 object-fit-cover rounded-lg"/>)
                }
                <h1>{props.home.bedrooms}BH{props.home.kitchen==="None"?"0":"1"}K</h1>
                <h1>{props.home.city}{", "}{props.home.district}</h1>
                {props.home.kitchen!=="None"?<h1>Kitchen:{" "+props.home.kitchen}</h1>:<></>}
                {props.home.bathroom}
                <h1>{props.home.description}</h1>
                <a href={loa}>Click here to view in maps</a>
            </div>
        </>
    )
}