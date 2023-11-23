
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
            <div className="flex justify-center items-baseline md:items-center h-screen bg-gray-100 rounded-3xl">
                <div className="w-full md:w-1/2 grid grid-cols-3 bg-gray-200 rounded-xl">
                    {
                        isSongSelected ? (
                            <div className="col-span-3">
                                <SelectedSong
                                    selectedSong={song}
                                    handleDelete={handleSongDelete}/>
                            </div>
                        ) : (
                            <div className="col-span-3"><InputField
                                handleSongSelect={handleSongSelect}/></div>
                        )
                    }
                    <div className="h-fit flex col-span-3"><UserInput
                        addUser={addUser}
                        removeUser={removeUser}
                        users={users}
                    /></div>
                        {
                            queueOpen && (
                                <div className="text-red-500 col-span-3 flex justify-center">Momentan können keine Songs hinzugefügt werden</div>
                                )
                        }
                    <div className="h-fit col-span-3"
                    ><SubmitQ
                        isEnabled={(song && users.length > 0)}
                        submitSongAndSinger={submitSongAndSinger}
                    /></div>
                </div>
            </div>
        </>

    )
}

export default Home;