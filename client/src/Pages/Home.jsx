
import {useEffect, useState} from "react";
import SelectedSong from "../components/SelectedSong.jsx";
import InputField from "../components/InputField.jsx";
import UserInput from "../components/UserInput.jsx";
import SubmitQ from "../components/SubmitQ.jsx";

const Home = () =>{
    const [ song, setSong ] = useState();
    const [isSongSelected, setIsSongSelected] = useState(false);
    const [users, setUsers] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [queueOpen, setQueueOpen] = useState(false);

    useEffect(() => {
        checkQueueStatus();
    }, []);

    const checkQueueStatus = async () => {
        const res = await fetch("/api/is-queue-open");
        const data = await res.json();
        if(res.status === 200){
            setQueueOpen(!data)
        }
    }

    const handleSongSelect = (song) => {
        console.log(song);
        setIsSongSelected(true);
        setSong(song);
        checkIfButtonShouldBeEnabled();

    }
    const handleSongDelete= () => {
        setIsSongSelected(false);
        setSong(null);
    }

    const addUser = (newName) => {
        setUsers([...users, {name: newName}]);

    }
    const removeUser = (index) => {
        setUsers(users.filter((user, i) => i !== index));
    }

    const checkIfButtonShouldBeEnabled = () => {
        console.log(users);
        if(users.length > 0 && song){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }

    const submitSongAndSinger = async () => {
        const joinedSingerList = users.map((user) => user.name).join(", ");
        const data = {
            title: song.title,
            artist: song.artist,
            singer: joinedSingerList,
            imgUrl: song.imgUrl
        }
        console.log(data);
        const res = await fetch("/api/add", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        });
        console.log(res.status)
        if(res.status === 200){
            // reload page
            window.location.reload();
        }


    }

    return (
        <>
          <div className="flex flex-col mt-20 items-center min-h-screen bg-[#1d223c] px-4 py-6 space-y-4">
            
            {/* LOGO / HEADER-BILD */}
            <div className="flex justify-center">
              <img
                src="/50years.png"
                alt="SV Fatschenbrunn Logo"
                className="w-44 h-auto object-contain bg-[#1d223c] p-2"
              />
            </div>
      
            {/* Hauptcontainer */}
            <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col bg-white border border-[#283583]/20 rounded-3xl shadow-xl p-5 md:p-8 gap-4">
              {/* SONG-BEREICH */}
              {isSongSelected ? (
                <div className="col-span-3">
                  <SelectedSong
                    selectedSong={song}
                    handleDelete={handleSongDelete}
                  />
                </div>
              ) : (
                <div className="col-span-3">
                  <InputField handleSongSelect={handleSongSelect} />
                </div>
              )}
      
              {/* USER INPUT */}
              <div className="col-span-3">
                <UserInput
                  addUser={addUser}
                  removeUser={removeUser}
                  users={users}
                />
              </div>
      
              {/* WARNUNG, FALLS WARTESCHLANGE GESCHLOSSEN */}
              {queueOpen && (
                <div className="col-span-3 flex justify-center">
                  <p className="text-[#d32f2f] font-semibold text-sm md:text-base bg-[#ffebee] rounded-md px-4 py-2 border border-[#d32f2f]/30">
                    Momentan können keine Songs hinzugefügt werden
                  </p>
                </div>
              )}
      
              {/* SUBMIT BUTTON */}
              <div className="col-span-3 flex justify-center mt-3">
                <SubmitQ
                  isEnabled={song && users.length > 0}
                  submitSongAndSinger={submitSongAndSinger}
                />
              </div>
            </div>
          </div>
        </>
      );
}

export default Home;