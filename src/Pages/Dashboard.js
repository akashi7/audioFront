import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MachineHeader } from '../Components/MobileFooter';
import { UserContext } from '../Context/UserContext';

import logos from '../Images/about_2.png';
import music from '../Images/headphones.png';


export const Dashboard = () => {



  const { viewAllSongs, SearchSongs, SearchAllSongs, allPlays, viewPlays } = useContext(UserContext);


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
        <div className='Mabout'>
          <div className="cardHeader"><img alt="iimage" src={logos} width="20px" />what</div>
          <div className="abop" >
            Share your  Musics
            let others know your preferences
            and have fun streaming music online.
            New features and design in work
          </div>
        </div>
        <div className='Mabouts'>
          <div className="cardHeaderui"><img alt="iimage" src={music} width="20px" />most played</div>
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