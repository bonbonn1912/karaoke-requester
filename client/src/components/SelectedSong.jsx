
import { FaEdit } from "react-icons/fa";
const SelectedSong = ({ selectedSong, handleDelete }) => {
    return (
        <div className="flex flex-row items-center justify-between w-full p-3 bg-[#f5f7fa] border-2 border-[#283583]/30 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          {/* Song Details: Cover + Infos */}
          <div className="flex items-center min-w-0">
            {/* Song Cover */}
            <img
              className="rounded-xl w-20 h-20 sm:w-24 sm:h-24 object-cover border border-[#283583]/20"
              src={selectedSong.imgUrl}
              alt={selectedSong.title}
            />
      
            {/* Titel & Artist */}
            <div className="flex flex-col min-w-0 overflow-hidden">
              <h2 className="text-base ml-1 sm:text-lg md:text-xl font-semibold text-[#283583] truncate">
                {selectedSong.title}
              </h2>
              <p className="text-gray-600 ml-1 text-sm sm:text-base truncate">
                {selectedSong.artist}
              </p>
            </div>
          </div>
      
          {/* Edit Button */}
          <div className="flex-shrink-0">
            <button
              className="flex justify-center items-center rounded-xl w-10 h-10 sm:w-12 sm:h-12 bg-[#283583] hover:bg-[#3b4eb0] text-white transition-all duration-300 hover:scale-105"
              onClick={() => handleDelete(selectedSong)}
              aria-label="Edit song"
            >
              <FaEdit size={22} className="sm:size-[26px]" />
            </button>
          </div>
        </div>
      );
  };

export default SelectedSong