import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MobileFooter, MachineFooter, MachineHeader } from '../Components/MobileFooter';
import { UserContext } from '../Context/UserContext';


export const Dashboard = () => {

  const { songList, viewAllSongs } = useContext(UserContext);


  const history = useHistory();
  const token = localStorage.getItem('token');

  const view = window.screen.width;

  const [state, setState] = useState({
    viewSize: ''
  });


  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }

      else if (view <= 480) {
        document.title = "mobile web | dashboard";
        setState({ ...state, viewSize: 'mobile' });
        await viewAllSongs(token);
      }
      else {
        document.title = "Dashboard";
        await viewAllSongs(token);

      }
    })();
  }, []);

  const playSong = async (id) => {

    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const res = await (await fetch(`https://audiolive.herokuapp.com/user/viewSong?songId=${id}`, config)).json();

    if (res.status === 200) {
      localStorage.setItem('songId', id);
      localStorage.setItem('songName', res.songName);
      history.push(`/playsong/${res.songName}`);
    }
    else if (res.status === 401) {
      history.push('/');
    }


  };


  return (
    <>
      {state.viewSize ? (
        <>
          <div className="mobileView">
            <div className="content">
              <div className="all-music">
                {songList.songs.length === 0 ? <p>No songs</p>
                  : songList.songs.map(id => {
                    return (
                      <div key={id.id} className="songs" onClick={(i) => playSong(id.id)}  >
                        <p>Song : {id.songName}</p>
                        <p>Artist : {id.sangBy} </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <MobileFooter />
        </>

      )
        : (
          <>
            <div className="M-whole">
              <MachineHeader />
              <div className='M-allSo'>
                {songList.songs.length === 0 ? <p>No songs</p>
                  : songList.songs.map(id => {
                    return (
                      <div key={id.id} className="M-songs" onClick={(i) => playSong(id.id)}  >
                        <p>Song : {id.songName}</p>
                        <p>By : {id.sangBy} </p>
                      </div>
                    );
                  })}
              </div>

            </div>
            <MachineFooter />
          </>

        )}

    </>

  );
};