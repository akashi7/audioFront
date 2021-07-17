import { useEffect, useContext, useState, } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { MachineHeader } from '../Components/MobileFooter';
import { PlaySong } from '../Components/PlaySong';

import music from '../Images/wall.jpg';

export const ViewSong = () => {



  const { song, viewSong, SearchSongs, SearchAllSongs } = useContext(UserContext);
  const token = localStorage.getItem('token');
  const history = useHistory();
  const songId = localStorage.getItem('songId');

  ;

  const [state, setState] = useState({
    viewSize: '',
    newSong: '',
  });

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else {
        setState({ ...state, viewSize: 'machine' });
        document.title = "Song";
        await viewSong(token, songId);
        await SearchAllSongs(token);

      }
    })();
    //eslint-disable-next-line
  }, []);






  return (
    <div className="M-wholes">
      <MachineHeader SearchSongs={SearchSongs} />
      <div className="plm">
        <div className="Mplay">
          <img
            src={music}
            className="Mlogo"
            alt="music" />
          {song.songName.map(id => {
            return (
              <div key={id.id} className="M-songss"  >
                <p style={{ color: "white" }} > <b> {id.songName} </b>/ <b> {id.sangBy}</b>  / <b> {id.genre}</b></p>
                <PlaySong url={id.audioUrl} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
