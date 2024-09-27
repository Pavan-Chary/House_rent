import UserCard from './UserCard'

export default function UserHousesList(props){
    return (
        <>
            {
                props.userHouses.length===0?<h1>No results found..</h1>:
                <>
                   <div classNmae="w-fit p-4 ">
                     {props.userHouses.map((house)=><UserCard home={house} handleDeleteHouse={props.handleDeleteHouse}/>)}
                    </div>
                </>
            }
        </>
    )
}