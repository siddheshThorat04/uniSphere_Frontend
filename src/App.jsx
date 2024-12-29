import Home from './pages/Home';
import './App.css';

import {  Route, Routes ,Navigate} from 'react-router-dom';
import Chat from './pages/Chat';
import Socket from './Socket';
import { useAuthContext } from './contextApi/authContext.jsx';

import Toaster from 'react-hot-toast'


import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import News from "./pages/News.jsx"
import Events from "./pages/Events.jsx"
import Home2 from "./pages/Home2.jsx";
import Admin from "./pages/Admin.jsx"
import Leadboard from "./pages/Leadboard.jsx"
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx"
import StudyZone from './pages/StudyZone.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AboutUs from './pages/AboutUs.jsx';
import {useDarkThemeContext}  from './contextApi/DarkTheme.jsx';
function App() {
  const{authUser}=useAuthContext()
  const {isDark, setDark}=useDarkThemeContext()
  return (
    
    <div className={isDark === "false" ? 'main' : 'main darkMain'}>
      
      <Socket />
        <Routes>  
          <Route path="/" element={ authUser?  <Home2 />:<Navigate to="/signup"/>} />
          <Route path="/chatHome"  element={authUser? <Home/>:<Navigate to="/login"/>}/>
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={!authUser? <Login/>:<Navigate to="/"/>} />
          <Route path="/signup" element={!authUser? <Signup/>:<Navigate to="/"/>} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/study-zone" element={<StudyZone />} />
          <Route path="/OnlyForAdmin" element={<Admin />} />
          <Route path="/profile/:id" element={authUser?<ProfilePage />  :<Navigate to="/signup"/> } />
          <Route  path="/about-us" element={<AboutUs/>} ></Route>
          <Route  path="/Leadboard" element={<Leadboard/>} ></Route>
          <Route path="Privacy_policy"  element={<PrivacyPolicy />}  />

        </Routes>
        
    </div>
  );
}

export default App;
