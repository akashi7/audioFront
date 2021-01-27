import { useEffect, useContext, useState, } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { MobileFooter, MachineFooter, MobileHeader, MachineHeader } from '../Components/MobileFooter';
import { PlaySong } from '../Components/PlaySong';

import music from '../Images/music.png';

export const ViewSong = () => {



  const { song, viewSong } = useContext(UserContext);
  const view = window.screen.width;
  const token = localStorage.getItem('token');
  const history = useHistory();
  const songId = localStorage.getItem('songId');
  const SongNames = localStorage.getItem('songName');
  const [state, setState] = useState({
    viewSize: '',
    newSong: '',
  });

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else if (view <= 480) {
        setState({ ...state, newSong: SongNames });
        document.title = "mobile | song";
        await viewSong(token, songId);
      }
      else {
        setState({ ...state, viewSize: 'machine' });
        document.title = "Song";
        await viewSong(token, songId);
        console.log('size', state.viewSize);
      }
    })();
  }, []);






  return (
    <>
      {state.viewSize === 'machine' ? (
        <>
          <div className="M-whole">
            <MachineHeader />
            <div className="Mplay">
              <img src={music} className="Mlogo" alt="music" />
            </div>
            <div className="Mplaying">
              {song.songName.map(id => {
                return (
                  <div key={id.id} className="M-songs"  >
                    <p>Song : {id.songName}</p>
                    <p>By : {id.sangBy} </p>
                    <div className="Mss">
                      <PlaySong url={id.audioUrl} />
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
          <MachineFooter />
        </>
      ) : (
          <>
            <MobileHeader songName={state.newSong} />
            <div className="playSong" >
              <div>
                {song.songName.map(id => {
                  return (
                    <div key={id.id} className="songplaying"  >
                      <p>Song playing : {id.songName}</p>
                      <p>Artist : {id.sangBy} </p>
                      <PlaySong url={id.audioUrl} />
                    </div>
                  );
                })}
              </div>
            </div>
            <MobileFooter />

          </>
        )}
    </>
  );
};
