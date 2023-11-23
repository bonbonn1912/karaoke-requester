import { useState} from "react";
import { FaUserCheck } from "react-icons/fa6";
import {FaRegTrashAlt} from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
const UserInput = ({users, addUser, removeUser}) =>{
    const [name, setName] = useState("");

    const submit = () => {
        addUser(name);
        setName("");
    }


    return (
        <div className="w-full h-fit grid ml-2 mr-">
            <div className="min-h-0 max-h-[200px] overflow-auto cols-span-full">
            {users.map((user, index) => (
                <div key={index} className="bg-fatschi hover:bg-blue-400 grid grid-cols-10 mt-1 rounded-xl p-2 mr-2 col-span-full" >
                    <div className="flex items-center ml-2 col-span-1">
                        <FaUserCheck size={40} color={"white"} />
                    </div>
                    <p className="flex items-center col-span-6 font-semibold ml-2 text-white">{user.name}</p>
                    <div className="flex items-center"> {/* Neuer Container für die Buttons */}
                        <button onClick={() => {removeUser(index)}} className="w-fit h-11 p-2 rounded-xl ml-8"><FaRegTrashAlt color={"white"} size={30} /></button>
                    </div>
                </div>
            ))}
            </div>
            <div className="flex col-span-full justify-center mt-5">
                <div className="relative flex w-full">
                    <input
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        className="block w-full h-12 rounded-md mr-1 border-0 py-2.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6"
                        placeholder="Name..."
                    />
                    <div className="ml-2"> {/* Neuer Container für den Hinzufügen-Button */}
                        <button onClick={() => {submit()}} className="w-fit h-11 p-2 rounded-xl"><IoAddCircle size={40} color={"#283583"}/></button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default UserInput;