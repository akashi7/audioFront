import React, { useEffect, useState } from 'react';

const Stream = () => {

  let audioCtx = new AudioContext();

  const [state, setState] = useState({
    recording: false
  });

  useEffect(() => {

  }, []);

  function toggleD() {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then((Audio) => {
        if (state.recording) {
          let tracks = Audio.getTracks();
          tracks[0].stop();
          console.log('audio stoping...');
          window.location.reload();
        }
        else if (!(state.recording)) {

          console.log('audio', Audio);
          let source = audioCtx.createMediaStreamSource(Audio);
          let filter = audioCtx.createBiquadFilter();
          filter.type = "lowshelf";
          filter.frequency.value = "1000";
          filter.gain.value = "5";
          source.connect(filter);
          filter.connect(audioCtx.destination);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });

  }


  return (
    <div>
      {state.recording ?
        <button onClick={() => { setState({ ...state, recording: false }); toggleD(); }}  >Stop</button>
        : <button onClick={() => { setState({ ...state, recording: true }); toggleD(); }}  >Start</button>
      }
    </div>
  );
};

export default Stream;
