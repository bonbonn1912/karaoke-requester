import { IoMusicalNotesSharp } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import {Fa0} from "react-icons/fa6";

const SelectedSong = ({ selectedSong, handleDelete }) => {
    return (
        <>
        <div className="flex bg-gray-300 m-2 p-2 rounded-2xl items-center">
            <img className="rounded-xl" src={selectedSong.imgUrl}/>
            <div className="flex flex-col items-center w-full ml-2">
                <div className="flex w-full font-semibold">
                    {selectedSong.title}
                </div>
                <div className="w-full">
                    {selectedSong.artist}
                </div>
            </div>

        </div>
            <div className="flex justify-center mb-2">
                <button className="bg-red-400 hover:bg-red-700 rounded-xl w-32 h-8 font-semibold" onClick={() => handleDelete(selectedSong)}>Entfernen</button>
            </div>

        </>
    )

}

export default SelectedSong