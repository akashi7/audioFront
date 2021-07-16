import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../Images/7ec111864f7539dce5362ccf235b61a4--app-logo-app-icon-logo.jpg';

export const FoundMusic = ({ songList }) => {

  const [state, setState] = useState({
    viewSize: ''
  });

  const view = window.screen.width;
  function windowSize() {
    if (view <= 480) {
      setState({ ...state, viewSize: 'mobile' });
    }
    else {
      document.title = "Search";
    }
  }


  useEffect(() => {
    windowSize();
    //eslint-disable-next-line
  }, []);


  const history = useHistory();
  let url;
  process.env.NODE_ENV === "development" ? url = `http://localhost:5000` : url = `https://audiolive.herokuapp.com`;
  const token = localStorage.getItem('token');

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
          {songList.songs.map(id => {
            return (
              <div key={id.id} className="mmm" onClick={(i) => playSong(id.id)} >
                <ul>
                  <li><img src={logo} alt="logo" width="120" height="90" /></li>
                  <li>Song : {id.songName}</li>
                  <li>Artist : {id.sangBy}</li>
                </ul>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {songList.songs.map(id => {
            return (
              <div key={id.id} className="M-song" onClick={(i) => playSong(id.id)} >
                <ul>
                  <li><img src={logo} alt="logo" width="120" height="90" /></li>
                  <li>Song : {id.songName}</li>
                  <li>Artist : {id.sangBy}</li>
                </ul>
              </div>
            );
          })}
        </>
      )}

    </>
  );
};
