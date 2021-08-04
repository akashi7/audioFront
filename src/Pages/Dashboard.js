import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MachineHeader } from '../Components/MobileFooter';
import { UserContext } from '../Context/UserContext';

import logos from '../Images/about_2.png';
import music from '../Images/headphones.png';
import wire from '../Images/wireless_headset.png';
import icon from '../Images/59f93175ba67187444ad6ae3b35e040f.png';


export const Dashboard = () => {



  const { viewAllSongs, SearchSongs, SearchAllSongs, allPlays, viewPlays, songList } = useContext(UserContext);


  const history = useHistory();
  const token = localStorage.getItem('token');



  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else {
        document.title = "Dashboard";
        await viewAllSongs(token);
        await SearchAllSongs(token);
        await viewPlays(token);
      }
    })();
    //eslint-disable-next-line
  }, []);

  const goToSong = (songName, id) => {
    localStorage.setItem('songId', id);
    history.push(`/playsong/${songName}`);
  };


  return (
    <div className="M-whole">
      <MachineHeader SearchSongs={SearchSongs} />
      <div className="werty">
        <div className='leftBar'>
          {/* <div className="cardHeader"><img alt="iimage" src={logos} width="20px" />what</div> */}
          <div className="ssty" ><img alt="iimage" src={wire} width="20px" />Songs List</div>
          <div className="abops" >
            {songList.songs.length === 0 ? <p>No songs</p>
              : songList.songs.map(({ id, songName }) => {
                return (
                  <>
                    <p key={id} className="goToplay" onClick={() => goToSong(songName, id)} > <img src={icon} alt="icon" width="20px" /> {songName}</p>
                    <hr></hr>
                  </>
                );
              })}
          </div>
        </div>
        <div className='Mabout'>
          {/* <div className="cardHeader"><img alt="iimage" src={logos} width="20px" />what</div> */}
          <div className="ssty" ><img alt="iimage" src={logos} width="20px" />what</div>
          <div className="abop" >
            Share your  Musics
            let others know your preferences
            and have fun streaming music online.
            New features and design in work
          </div>
        </div>
        <div className='Mabouts'>
          {/* <div className="cardHeader"><img alt="iimage" src={music} width="20px" />most played</div> */}
          <div className="ssty" ><img alt="iimage" src={music} width="20px" />most played</div>
          <div className="abop" >
            {allPlays.plays.length === 0 ? <p>No plays yet</p>
              : allPlays.plays.map(({ songName, id, plays }) => {
                return (
                  <div key={id}>
                    <p onClick={() => goToSong(songName, id)} className="popy" > <b> {songName} </b>played {plays} times </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>

  );
};