import {useEffect, useState} from "react";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";


const QueueElement = ({songs}) =>{
    const [ song, setSong ] = useState(songs);
    const [ crossedOut, setCrossedOut ] = useState(song.map((singleSong) => singleSong.done));
    const [showCrossedOut, setShowCrossedOut] = useState(false);
    const [queueOpen, setQueueOpen] = useState(true);
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
    const openQueue = async (value) => {
        const res = await fetch("/api/open-queue",{
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({open: value})
        });
        const data = await res.json();
        if(res.status === 200){
            console.log(data);
            setQueueOpen(!data);
        }
    }


    const crossOut = async (index, _id) => {
        const newCrossedOut = crossedOut.map((item, i) => {
            if(i === index){
                return !item;
            }else{
                return item;
            }
        });
        const newSong = song.map((item, i) => {
            if(i === index){
                return {...item, done: !item.done};
            }else{
                return item;
            }
        });
        const res = await fetch("/api/cross-out", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({_id: _id, done: newCrossedOut[index]})
        });
        if(res.status === 200){
            setSong(newSong);
            setCrossedOut(newCrossedOut);
        }

    }
    const convertTimeStamp = (timestamp) => {
        const datum = new Date(timestamp);

        const tag = datum.getDate();
        const monat = datum.getMonth() + 1; // Monate beginnen bei 0, daher +1
        const jahr = datum.getFullYear();

        const stunden = datum.getHours();
        const minuten = datum.getMinutes();

        const formatierterTag = (tag < 10) ? '0' + tag : tag;
        const formatierterMonat = (monat < 10) ? '0' + monat : monat;
        const formatierteStunden = (stunden < 10) ? '0' + stunden : stunden;
        const formatierteMinuten = (minuten < 10) ? '0' + minuten : minuten;

        const formatierterZeitstempel = `${formatierterTag}.${formatierterMonat}.${jahr} - ${formatierteStunden}:${formatierteMinuten}`;

        return formatierterZeitstempel;
    }
    const [isChecked, setChecked] = useState(false);

    const handleToggle = () => {
        setShowCrossedOut(!showCrossedOut)
        setChecked(!isChecked);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center w-1/2 justify-evenly">
                <h2 className="text-lg leading-6 font-medium text-gray-900 mr-2">Queue</h2>
                <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={isChecked}
                            onChange={handleToggle}
                        />
                        <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer ${isChecked ? 'peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white' : ''} after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
                        ></div>
                        <span className="ms-3 text-sm font-medium text-black">
        Zeige Abgeschlossene
      </span>
                    </label>
                </div>
                <div>
                    {
                        queueOpen ?
                            <button onClick={() => {openQueue(false)}} className="mt-2 mb-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                <CiLock size={20} color={"white"} className="mr-2"/>

                            </button>
                            :
                            <button onClick={() => {openQueue(true)}} className="mt-2 mb-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <CiUnlock size={20} color={"white"} className="mr-2"/>
                            </button>
                    }
                </div>

            </div>

            <div className=" flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Title
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Artist
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Singer
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Zeit
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {song.map((singleSong, index) => (
                                <tr key={singleSong._id} className={`${singleSong.done && !showCrossedOut ? "hidden" : ""}`}>
                                    <td className="whitespace-nowrap py-2 pl-2 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                        <img className="rounded-xl w-12" src={singleSong.imgUrl} alt=""/>
                                    </td>
                                    <td className={`whitespace-nowrap px-3 py-4 text-sm text-black ${crossedOut[index] ? "line-through" : "font-semibold"}`}>{singleSong.title}</td>
                                    <td className={`whitespace-nowrap px-3 py-4 text-sm text-black ${crossedOut[index] ? "line-through" : "font-semibold"}`}>{singleSong.artist}</td>
                                    <td className={`whitespace-nowrap px-3 py-4 text-sm text-black ${crossedOut[index] ? "line-through" : "font-semibold"}`}>{singleSong.singer}</td>
                                    <td className={`whitespace-nowrap px-3 py-4 text-sm text-black ${crossedOut[index] ? "line-through" : "font-semibold"}`}>{convertTimeStamp(singleSong.requestTime)}</td>
                                    <td className="whitespace-nowrap py-4 pl-3 pr-4rounded-xl flex items-center justify-center mt-2">
                                        <div className="flex items-center justify-center bg-red-300 h-full">
                                            <input
                                                id="default-checkbox"
                                                type="checkbox"
                                                value=""
                                                defaultChecked={crossedOut[index]}
                                                onClick={() => {crossOut(index, singleSong._id)} }
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QueueElement;