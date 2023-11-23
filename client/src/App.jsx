import Home from "./Pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Queue from "./Pages/Queue.jsx";


function App() {
   return (
       <Router>
              <Routes>
                <Route path="/" element={<Home/>}/>
                  <Route path="/queue" element={<Queue/>}/>
              </Routes>
       </Router>
   )
}

export default App
