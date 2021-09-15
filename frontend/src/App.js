import "./App.css";
import Home from "./Pages/Home/Home";
import Profil from "./Pages/Profil/Profil";
import NotFound from "./Pages/404/404";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';


function App() {
  let loggedIn = false
  const token =localStorage.getItem('Token')
  if(token != null){loggedIn= true}
 
  return (
    <>
      <Router>
        <Switch>
        <Route path="/" exact component={Home} >{loggedIn ? <Home/>: <Redirect to="/login" />  }  </Route>
        <Route path="/profil" exact component={Profil} >{loggedIn ? <Profil/>: <Redirect to="/login" />  }  </Route>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} >{loggedIn ? <Home/>: <Redirect to="/login" />  }  </Route>
        <Route path="/" component={NotFound} />
        </Switch>
      </Router>

    </>
  );
}

export default App;
