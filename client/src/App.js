import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Landing from './components/Landing'
import Home from './components/Home'
import Create from './components/Create'
import CardDetail from './components/CardDetail'
import NotFound from './components/NotFound'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path ='/' element ={<Landing/>}/>
        <Route path = '/home' element ={<Home/>}/>
        <Route path = '/home/:id' element = {<CardDetail/>}/>
        <Route path ='/create' element ={<Create/>}/>
        <Route path = '*' element = {<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
