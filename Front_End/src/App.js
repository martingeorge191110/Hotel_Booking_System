import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router
  , Route
  , Switch }
   from 'react-router-dom';
import Header from './Components/Header/header';
import MainPage from './Components/Main/main';
import Hotel from './Components/Hotel/hotel';
import Register from './Components/Register/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Flight from './Components/Flight/flight';
import Result from './Components/Flight/Result/result';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
          <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/hotels" exact component={Hotel}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/flights" exact component={Flight}/>
          {/* <Route path="/result" exact component={Result}/> */}
          <Route exact component={MainPage}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
