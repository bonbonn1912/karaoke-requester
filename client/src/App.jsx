import { useState } from "react";
import { useEffect } from "react";
import InputField from "./components/InputField.jsx";
import SelectedSong from "./components/SelectedSong.jsx";
import UserInput from "./components/UserInput.jsx";
import SubmitQ from "./components/SubmitQ.jsx";




function App() {
    const [ song, setSong ] = useState();
    const handleSongSelect = (song) => {
        console.log(song);
         setIsSongSelected(true);
        setSong(song);
    }

    const handleSongDelete= () => {
        setIsSongSelected(false);
        setSong(null);
    }

    const [isSongSelected, setIsSongSelected] = useState(false);
    const [users, setUsers] = useState([]);

    const addUser = (newName) => {
        setUsers([...users, {name: newName}]);
    }
    const removeUser = (index) => {
        setUsers(users.filter((user, i) => i !== index));
    }

    const submitSongAndSinger = async () => {
        const joinedSingerList = users.map((user) => user.name).join(", ");
        const data = {
            title: song.title,
            artist: song.artist,
            singer: joinedSingerList
        }
        console.log(data);
        const res = await fetch("/api/add", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
            body: JSON.stringify(data)
        });
        const resData = await res.json();
        console.log(resData)

    }

    return (
    <>
    <div className="w-full md:grid md:grid-cols-2">
        {
            isSongSelected ? (
                <div>
                    <SelectedSong
                        selectedSong={song}
                        handleDelete={handleSongDelete}/>
                </div>
            ) : (
                <div className=""><InputField
                    handleSongSelect={handleSongSelect}/></div>
            )
        }
        <div className="h-fit flex"><UserInput
            addUser={addUser}
            removeUser={removeUser}
            users={users}
        /></div>
        <div className="h-fit"
        ><SubmitQ

        submitSongAndSinger={submitSongAndSinger}
        /></div>
    </div>

    </>
    
  )
}

export default App
