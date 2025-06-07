import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import NavMenu from './NavBar';
import Home from './Components/Home';
import News from './Components/News';

function App() {


  return (
    <>
     <NavMenu />
     <Home />
     <News />
    </>
  )
}

export default App
