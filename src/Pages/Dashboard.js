import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MobileFooter, MachineFooter, MachineHeader } from '../Components/MobileFooter';
import { UserContext } from '../Context/UserContext';

import logo from '../Images/7ec111864f7539dce5362ccf235b61a4--app-logo-app-icon-logo.jpg';


export const Dashboard = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:5000` : url = `https://audiolive.herokuapp.com`;

  const { songList, viewAllSongs } = useContext(UserContext);


  const history = useHistory();
  const token = localStorage.getItem('token');

  const view = window.screen.width;

  const [state, setState] = useState({
    viewSize: '',
    songName: '',
    songLists: {
      songs: []
    },
    showSongs: false

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

    const res = await (await fetch(`${url}/user/viewSong?songId=${id}`, config)).json();

    if (res.status === 200) {
      localStorage.setItem('songId', id);
      localStorage.setItem('songName', res.songName);
      history.push(`/playsong/${res.songName}`);
    }
    else if (res.status === 401) {
      localStorage.clear();
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
                        <img src={logo} alt="logo" width="90" height="110" />
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
                      <div key={id.id} className="M-songs" onClick={(i) => playSong(id.id)}>
                        <ul >
                          <li><img src={logo} alt="logo" width="190" height="150" /></li>
                          <li>Song : {id.songName} </li>
                          <li>By : {id.sangBy}</li>
                        </ul>
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