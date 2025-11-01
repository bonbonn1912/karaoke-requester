import { useState} from "react";
import { FaUserCheck } from "react-icons/fa6";
import {FaRegTrashAlt} from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
const UserInput = ({users, addUser, removeUser}) =>{
    const [name, setName] = useState("");
    const [addButtonDisabled, setAddButtonDisabled] = useState(true);

    const validateInput = () => {
        if(name.length > 0){
            setAddButtonDisabled(false);
        }else{
            setAddButtonDisabled(true);
        }
    }

    const submit = () => {
        addUser(name);
        setName("");
        setAddButtonDisabled(true);
    }


    return (
        <div className="w-full h-fit grid">
          {/* USER LISTE */}
          <div className="max-h-[200px] overflow-auto col-span-full">
            {users.map((user, index) => (
              <div
                key={index}
                className="grid grid-cols-10 gap-2 items-center bg-white border border-[#283583]/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-2 mt-2"
              >
                {/* ICON-BEREICH */}
                <div className="flex justify-center items-center col-span-1">
                  <FaUserCheck size={36} color={"#283583"} />
                </div>
      
                {/* NAME */}
                <p className="col-span-8 text-[#283583] font-semibold ml-1 truncate">
                  {user.name}
                </p>
      
                {/* DELETE ICON */}
                <div className="flex justify-center items-center col-span-1">
                  <button
                    onClick={() => removeUser(index)}
                    className="p-2 rounded-lg hover:bg-[#283583]/10 transition-all duration-200"
                    aria-label="Benutzer entfernen"
                  >
                    <FaRegTrashAlt size={26} color={"#283583"} />
                  </button>
                </div>
              </div>
            ))}
          </div>
      
          {/* INPUT + ADD BUTTON */}
          <div className="flex col-span-full justify-center mt-5">
  <div className="relative flex w-full items-center">
    {/* INPUT: Name */}
    <input
      onChange={(e) => {
        validateInput();
        setName(e.target.value);
      }}
      type="text"
      name="name"
      id="name"
      value={name}
      placeholder="Name..."
      className="block w-full h-12 rounded-xl border border-[#283583]/40 bg-white px-3 text-[#1e1e1e] placeholder:text-gray-400 focus:border-[#283583] focus:ring-2 focus:ring-[#283583]/40 shadow-sm transition-all duration-200 sm:text-sm sm:leading-6"
    />

    {/* BUTTON + RAHMEN */}
    <div
      className={`ml-3 flex items-center justify-center h-12 w-14 rounded-xl border border-[#283583]/40 bg-white shadow-sm ${
        addButtonDisabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-[#283583]/10 transition-all duration-300"
      }`}
    >
      <button
        disabled={addButtonDisabled}
        onClick={submit}
        className="flex items-center justify-center w-full h-full rounded-xl"
        aria-label="Benutzer hinzufügen"
      >
        <IoAddCircle
          size={28}
          color={addButtonDisabled ? "grey" : "#283583"}
        />
      </button>
    </div>
  </div>
</div>
        </div>
      );
}


export default UserInput;