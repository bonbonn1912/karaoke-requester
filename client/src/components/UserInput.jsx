import { useState} from "react";
import { FaUserCheck } from "react-icons/fa6";
const UserInput = ({users, addUser, removeUser}) =>{
    const [name, setName] = useState("");
    return (
        <div className="w-full h-fit flex flex-col pl-2 pr-2">
            <div className="flex justify-center mt-5">
                <div className="relative flex w-full justify-center items-center">
                    <input
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        type="text"
                        name="name"
                        id="name"
                        className="block w-1/2 rounded-md border-0 py-2.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6"
                        placeholder="Name..."
                    />
                    <div className="ml-2"> {/* Neuer Container für den Hinzufügen-Button */}
                        <button onClick={() => {addUser(name)}} className="w-fit h-11 p-2 bg-green-400 hover:bg-green-600 rounded-xl">Hinzufügen</button>
                    </div>
                </div>
            </div>
            <div className="min-h-0 max-h-[200px] overflow-auto">
            {users.map((user, index) => (
                <div key={index} className="bg-blue-300 hover:bg-blue-400 grid grid-cols-10 mt-1 rounded-xl p-2">
                    <div className="flex items-center ml-2 col-span-1">
                        <FaUserCheck size={40} color={"darkblue"} />
                    </div>
                    <p className="flex items-center col-span-6 font-semibold ml-2">{user.name}</p>
                    <div className="flex items-center"> {/* Neuer Container für die Buttons */}
                        <button onClick={() => {removeUser(index)}} className="w-fit h-11 p-2 bg-red-400 hover:bg-red-600 rounded-xl">Entfernen</button>
                    </div>
                </div>
            ))}
            </div>

        </div>
    );
}


export default UserInput;