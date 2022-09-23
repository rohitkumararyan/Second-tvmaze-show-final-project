import './App.css';
import Main from './Components.js/Main';
import Navbar from './Components.js/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';




const App = () => {
   return(
    <>
     
    <Router>
       <Navbar/>
       <Main/>
       
    </Router>
      
    </>
   )
}

export default App
