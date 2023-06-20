import './Styles.css';
import Notifications from './components/Notifications';
import Options from './components/Options';
import VideoPlayer from './components/VideoPlayer';


   
function App() {


  return (
    <div className='App' >
      <div className="nav_space"></div>

      <div className="video-options-container">

      <VideoPlayer  />

      <Options>
        <Notifications />
      </Options>

      </div>

    </div>

  );
}

export default App;