import {useRef,useState} from 'react';

const AddHome =(props)=> {
    

    const [msg,setMsg] = useState("");

    const [loc,setLoc] = useState(false);

    const handleSubmit=(event)=>{
        console.log("Reached...")
        if(!loc){
            props.showMsg("please give your location");
            return;
        }
        props.handleAddHouse(event);
        setLoc(false);
    }

    const handlePosition=()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            
            props.latitude.current.value=position.coords.latitude;
            props.longitude.current.value=position.coords.longitude;
            setLoc(true);

        },()=>alert("please allow for better results"));
    }



    return (
        <>
        <form className="m-10" onSubmit={(event)=>{event.preventDefault();handleSubmit(event)}} >
            <label>city</label><br/>
            <input type="text" required className="border border-black" name="city" ref={props.city} /><br/>
            <label>district</label><br/>
            <input type="text" required className="border border-black" name="district" ref={props.district} /><br/>
            <label>cost</label><br/>
            <input type="number" min="1" required className="border border-black"  name="cost" ref={props.cost} /><br/>
            <label>bedrooms</label><br/>
            <input type="number" min="1" required className="border border-black" name="bedrooms" ref={props.bedrooms}  /><br/>
            <label>bathroom</label><br/>
            <select className="border border-black" ref={props.bathrooms}  >
                <option>attached bathroom</option>
                <option>seperate bathroom</option>
                <option>both available</option>
            </select><br/>
            <label>kitchen</label><br/>
            <select className="border border-black" ref={props.kitchen} >
                <option>open kitchen</option>
                <option>Seperate room</option>
                <option>None</option>
            </select><br/>
            <label>description</label><br/>
            <textarea type="text" className="border border-black" name="description" ref={props.description} /><br/>
            <button onClick={handlePosition} type="button"  className="border border-black">Add current location</button><br/>
            <input disabled={loc} className="border border-black" required ref={props.latitude} /><br/>
            <input disabled={loc} className="border border-black" required ref={props.longitude} /><br/>
            <label>image</label><br/>
            <input type="file" className="border border-black" multiple name="pic" ref={props.pic} /><br/>
            <button type="submit" className="border border-black" >Submit</button>
        </form>
        </>
    )
}

export default AddHome