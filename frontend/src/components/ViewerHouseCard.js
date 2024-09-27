
export default function ViewrHouseCard(props){
    const loa = "https://www.google.com/maps/@"+props.home.latitude+","+props.home.longitude+",52m"/* +"?"+"q="+props.home.latitude+","+props.home.longitude */;
    return (
        <>
            <div className="border border-black w-fit h-auto m-auto mt-20 p-3">
                {props.home.pic.map((image)=>
                    <img alt="loading.." src={"data:"+image.contentType+";base64,"+image.data} className=" w-96 h-72 object-fit-cover rounded-lg"/>)
                }
                <h1>{props.home.city}</h1>
                <h1>{props.homedistrict}</h1>
                <h1>{props.home.description}</h1>
                <a href={loa}>Click here to view in maps</a>
            </div>
        </>
    )
}