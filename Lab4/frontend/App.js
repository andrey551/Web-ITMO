import './App.css';
import Mainpage from './pages/main';
import LoginPage from './pages/authentication/login';
import {useSelector} from "react-redux"


function App() {

  const { loggedUser } = useSelector((state) => state.auth)

  return (
    <div className="App">
      {loggedUser ? <Mainpage/> : <LoginPage />}
    </div>
  );
}

export default App;
