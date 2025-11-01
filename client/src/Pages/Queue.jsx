import {useEffect, useState} from "react";
import QueueElement from "../components/QueueElement.jsx";

const Queue = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [songs, setSongs] = useState([]);
  
    const initQueue = async () => {
      const res = await fetch("/api/get-queue");
      const data = await res.json();
      setSongs(data);
      setIsLoading(false);
    };
  
    useEffect(() => {
      initQueue();
  
      const interval = setInterval(async () => {
        const res = await fetch("/api/get-queue");
        const data = await res.json();
  
        // You update directly here — no need to compare in this log
        setSongs(data);
        console.log("From API:", data);
        console.log("from state: ", songs)
      }, 10000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <div>
            <QueueElement songs={songs} />
          </div>
        )}
      </div>
    );
  };
  
  export default Queue;