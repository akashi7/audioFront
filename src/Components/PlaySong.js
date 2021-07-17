import { useState, useRef } from 'react';
import playButton from '../Images/play.png';
import pauseButton from '../Images/video-pause-button.png';
import { useHistory } from 'react-router-dom';



export const PlaySong = ({ url }) => {

  let urlss;

  process.env.NODE_ENV === 'development' ? urls = `http://localhost:5000` : urlss = `https://audiolive.herokuapp.com`;

  const songId = localStorage.getItem('songId');
  const token = localStorage.getItem('token');


  const history = useHistory();
  const durationFunction = (sec) => {
    return (sec - (sec %= 60)) / 60 + (9 < sec ? ':' : ':0') + ~~sec;
  };

  const [state, setState] = useState({
    playing: false,
    duration: 0,
    currentTime: 0
  });

  const audio = useRef(null);


  const numberOfPlays = async (songId, token) => {

    const config = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    try {
      const res = await (await fetch(`${urlss}/user/view?songId=${songId}`, config)).json();
      if (res.status === 200) {
        console.log("OKK..");
      }
      else if (res.status === 401) {
        localStorage.clear();
        history.push('/');
      }


    } catch (error) {
      console.log("err", error);
    }
  };


  const toggle = async () => {
    setState({ ...state, duration: audio.current.duration });
    if (state.playing) {
      setState({ ...state, playing: false });
      audio.current.pause();
    }
    else if (!(state.playing)) {
      audio.current.play();
      await numberOfPlays(songId, token);
      setState({ ...state, playing: true });
    }
  };



  const handleProgess = (e) => {
    let time = ((e.target.value) * state.duration) / 100;
    setState({ ...state, currentTime: time });
    audio.current.currentTime = time;
  };

  return (
    <div className='controlss'>
      <audio
        ref={audio}
        src={url}
        onCanPlay={e => setState({ ...state, duration: e.target.duration })}
        onTimeUpdate={e => setState({ ...state, currentTime: e.target.currentTime })}
      />

      <input
        type="range"
        className="progressBar"
        onChange={handleProgess}
        value={(state.currentTime * 100) / state.duration}
      />
      <div className="controls">
        <span className="tyui">
          {durationFunction(state.currentTime)}
        </span>
        {
          state.playing ? <img
            src={pauseButton}
            className="playbutton"
            alt="play music"
            onClick={() => { setState({ ...state, playing: false }); toggle(); }} />
            : <img
              src={playButton}
              className="playbutton"
              alt="play music"
              onClick={() => { setState({ ...state, playing: true }); toggle(); }} />
        }
        <span className="tyui">
          {durationFunction(state.duration)}
        </span>

      </div>

    </div>
  );
};
