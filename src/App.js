import "./App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NoteState from "./context/note/noteState";

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
       
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
