
import { FaEdit } from "react-icons/fa";
const SelectedSong = ({ selectedSong, handleDelete }) => {
    return (
        <>
        <div className="grid grid-cols-10 bg-gray-300 m-2 p-2 rounded-2xl items-center border-dashed border-red-200 border-rad">
            <img className="rounded-xl col-span-2" src={selectedSong.imgUrl}/>
            <div className="col-span-6 flex-col items-center ml-3">
                <div className="flex w-full font-semibold">
                    {selectedSong.title}
                </div>
                <div className="w-full">
                    {selectedSong.artist}
                </div>
            </div>
            <div>
                <button className="col-span-3 rounded-xl font-semibold" onClick={() => handleDelete(selectedSong)}>
                    <FaEdit size={40} color={"#283583"}/>
                </button>
            </div>
        </div>
        </>
    )

}

export default SelectedSong