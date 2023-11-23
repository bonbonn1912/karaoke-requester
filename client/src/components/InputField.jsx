import {useState} from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import LoadingSpinner from './LoadingSpinner';

const InputField = (props) =>{

    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };
    const delayedFetchSuggestions = debounce(async (searchTerm) => {
        setIsLoading(true)
        const response = await fetch(`/api/suggest?term=${searchTerm}`);
        const data = await response.json();
        if(data.length === 0){
            setSuggestions([]);
        }
        // map throw data and remove Quotes
        const sanitizedData = data.map((item) => {
            const imgUrl = item.imgUrl === "" ? "http://www.karaoke-version.com/i/img/01/72/51/23_b75c66_sq100.jpg" : item.imgUrl;
           return {title: item.title.replace(/['"]+/g, ''), artist: item.artist.replace(/['"]+/g, ''), imgUrl: imgUrl};

        });
        setSuggestions(sanitizedData);
        setIsLoading(false);
        return data;
    }, 500);

    const handleSongSelect = (song) => {
        props.handleSongSelect(song);
    }
    return (
        <div>
            <div className="grid grid-cols-10 w-full mt-4 h-fit">
                <div className="relative w-full col-span-8">
                    <input
                        onChange={(e) => {
                            delayedFetchSuggestions(e.target.value);
                        }}
                        type="text"
                        name="song"
                        id="Song"
                        className="block w-full ml-2 rounded-md border-0 py-2.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 sm:text-sm sm:leading-6 mb-2"
                        placeholder="Dein Liederwunsch..."
                    />
                </div>
            </div>
            {isLoading && <LoadingSpinner/>}
            {suggestions.length === 0 && !isLoading && <p className="text-center mt-2"></p>}
            {suggestions.length > 0 &&
                <div className="h-[500px] w-full flex overflow-auto">
                    <ul className="w-full">
                        {suggestions.map((suggestion, index) => (
                            <li
                                className="flex min-h-16 max-h-fit justify-between items-center rounded-xl bg-gray-100 p-2 m-2 relative hover:bg-gray-300"
                                key={index}
                            >
                                <div className="rounded-xl">
                                    <img className="rounded-xl" src={suggestion.imgUrl} alt=""/>
                                </div>
                                <div className="w-3/4 ml-2">
                                    <p className="font-semibold">{suggestion.title}</p>{suggestion.artist}
                                </div>
                                <button
                                    onClick={() => {handleSongSelect(suggestion)}}
                                    className="rounded-full w-12 h-12 font-bold flex justify-center items-center">
                                    <IoMdAddCircleOutline color={"limegreen"} size={40}/>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            }


        </div>
    )
}

export default InputField