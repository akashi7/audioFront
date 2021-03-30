import { useState, useRef } from 'react';
import playButton from '../Images/play.png';
import pauseButton from '../Images/video-pause-button.png';





export const PlaySong = ({ url }) => {


  const durationFunction = (sec) => {
    return (sec - (sec %= 60)) / 60 + (9 < sec ? ':' : ':0') + ~~sec;
  };

  const [state, setState] = useState({
    playing: false,
    duration: 0,
    currentTime: 0
  });

  const audio = useRef(null);


  const toggle = () => {
    setState({ ...state, duration: audio.current.duration });
    if (state.playing) {
      setState({ ...state, playing: false });
      audio.current.pause();
    }
    else if (!(state.playing)) {
      audio.current.play();
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
        onTimeUpdate={e => setState({ ...state, currentTime: e.target.currentTime })} />
      <input
        type="range"
        className="progressBar"
        onChange={handleProgess}
        value={(state.currentTime * 100) / state.duration} />
      <span className="time">{durationFunction(state.currentTime)}</span>
      <span className='dur'>{durationFunction(state.duration)}</span>
      <div className="controls">

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

      </div>
    </div>
  );
};
