import {useState} from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import LoadingSpinner from './LoadingSpinner';

const InputField = (props) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
  
    // debounce helper
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    };
  
    // API call with debounce
    const delayedFetchSuggestions = debounce(async (searchTerm) => {
      if (!searchTerm || searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }
  
      setIsLoading(true);
      const response = await fetch(`/api/suggest?term=${searchTerm}`);
      const data = await response.json();
  
      const sanitizedData = data.map((item) => {
        const imgUrl =
          item.imgUrl === ""
            ? "http://www.karaoke-version.com/i/img/01/72/51/23_b75c66_sq100.jpg"
            : item.imgUrl;
        return {
          title: item.title.replace(/['"]+/g, ""),
          artist: item.artist.replace(/['"]+/g, ""),
          imgUrl: imgUrl,
        };
      });
  
      setSuggestions(sanitizedData);
      setIsLoading(false);
    }, 500);
  
    const handleSongSelect = (song) => {
      props.handleSongSelect(song);
      setShowSuggestions(false);
    };
  
    return (
      <div className="w-full mt-4 h-fit">
        <div className="relative w-full">
          {/* INPUT FIELD */}
          <input
            onChange={(e) => {
              delayedFetchSuggestions(e.target.value);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            type="text"
            name="song"
            id="song"
            className="block w-full rounded-xl border border-[#283583]/40 bg-white px-3 py-2.5 text-[#1e1e1e] placeholder:text-gray-400 focus:border-[#283583] focus:ring-2 focus:ring-[#283583]/40 shadow-sm transition-all duration-200 sm:text-sm sm:leading-6 mb-2"
            placeholder="Dein Liederwunsch oder Interpret ..."
          />
  
          {/* LADESPINNER */}
          {isLoading && <LoadingSpinner />}
  
          {/* AUTOCOMPLETE-LISTE */}
          {showSuggestions && suggestions.length > 0 && !isLoading && (
            <ul className="absolute top-[110%] w-[calc(100%-1rem)] bg-white border border-[#283583]/30 rounded-xl shadow-lg z-50 max-h-72 overflow-auto">
              {suggestions.map((suggestion, index) => (
  <li
    key={index}
    className="flex flex-row items-center justify-between rounded-xl bg-white hover:bg-[#283583]/10 transition-all duration-300 p-3 cursor-pointer"
    onMouseDown={() => handleSongSelect(suggestion)} // mouseDown verhindert Blur-Kollision
  >
    {/* SONG INFOS-GRUPPE: Bild + Text */}
    <div className="flex items-center min-w-0 flex-shrink overflow-hidden">
      {/* SONG COVER */}
      <img
        className="rounded-xl w-14 h-14 object-cover border border-[#283583]/30 flex-shrink-0"
        src={suggestion.imgUrl}
        alt={suggestion.title}
      />

      {/* SONG INFOS */}
      <div className="ml-3 overflow-hidden">
        <p className="font-semibold text-[#283583] truncate text-sm sm:text-base md:text-lg">
          {suggestion.title}
        </p>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base truncate">
          {suggestion.artist}
        </p>
      </div>
    </div>

    {/* ADD BUTTON */}
    <div className="flex-shrink-0 ml-3">
      <button
        className="flex justify-center items-center rounded-xl w-10 h-10 border border-[#283583]/30 bg-white hover:bg-[#283583]/10 hover:scale-105 transition-all duration-200"
        aria-label={`Song ${suggestion.title} auswählen`}
      >
        <IoMdAddCircleOutline size={26} color={"#283583"} />
      </button>
    </div>
  </li>
))}
            </ul>
          )}
        </div>
  
        {/* keine Anzeige bei leeren Resultaten */}
      </div>
    );
  };
  
  export default InputField;
