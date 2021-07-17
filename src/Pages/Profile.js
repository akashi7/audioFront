import { useEffect, useState, useContext, createRef } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { MachineHeader } from '../Components/MobileFooter';


import icon from '../Images/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg';



export const Profile = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:5000` : url = `https://audiolive.herokuapp.com`;

  const { userProfile, profile, SearchSongs, SearchAllSongs, userSongs, userAllSongs } = useContext(UserContext);

  const token = localStorage.getItem('token');
  const user = localStorage.getItem('username');


  const audioRef = createRef();
  const picRef = createRef();

  const [state, setState] = useState({
    viewSize: "",
    userName: user,
    mo: '',
    profilePic: {},
    uploadError: "",
    loading: false,
    selectName: '',
    uploading: false,
    cover: [],
    uploadedCover: "",
    uploadedsong: "",
    songName: "",
    sangBy: '',
    genre: "",
    audio: [],
    error: ""
  });

  const history = useHistory();
  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else {
        await profile(token);
        await SearchAllSongs(token);
        await userAllSongs(token);
        setState({ ...state, userName: user });
        document.title = "Profile";
      }
    })();
    //eslint-disable-next-line
  }, []);




  const UpdatePic = async (e) => {

    setState({ ...state, loading: true });

    e.preventDefault();

    let formData = new FormData();

    const profilePic = picRef.current.files[0];

    formData.append("profilePic", profilePic);


    const config = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    };
    const res = await (await fetch(`${url}/user/updatePic`, config)).json();

    if (res.status === 200) {
      window.location.reload();
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/');
    }
    else if (res.status === 300) {
      setState({ ...state, loading: false });
      setState({ ...state, uploadError: res.message });
    }



  };



  const handleAudio = (value) => {
    setState({ ...state, uploadedsong: value[0].name });
  };


  const uploadSong = async (e) => {

    e.preventDefault();
    setState({ ...state, uploading: true });

    const audio = audioRef.current.files[0];

    let Formdata = new FormData();

    Formdata.append('audio', audio);
    Formdata.append("songName", state.songName);
    Formdata.append("sangBy", state.sangBy);
    Formdata.append("genre", state.genre);

    console.log("form", Formdata);

    const config = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: Formdata
    };

    try {
      const res = await (await fetch(`${url}/user/uploadSong`, config)).json();
      if (res.status === 200) {
        window.location.reload();
      }
      else if (res.status === 401) {
        localStorage.clear();
        history.push('/');
      }
      else if (res.status === 208) {
        setState({ ...state, uploading: false });
        setState({ ...state, error: res.message });
      }
      else if (res.status === 300) {
        setState({ ...state, uploading: false });
        setState({ ...state, error: res.message });
      }

    } catch (error) {
      console.log("errr", error);
    }
  };


  return (
    <div className="Mty">
      <MachineHeader SearchSongs={SearchSongs} />
      <div className="Ko">
        <div className="homePages">
          {userProfile.user.map(({ username, id, pic, uploads }) => {
            return (
              <div key={id} className="formss">
                {pic ? <img alt={username} className="Micons" src={pic} /> : <img src={icon} className="Miconst" alt='default' />}
                <p className="names" >{username}</p>
                {uploads ? <p>{uploads} uploads</p> : <p>0 uploads</p>}
                <br></br>
                <form onSubmit={(e) => UpdatePic(e)} className="ft">
                  <input
                    type="file"
                    hidden
                    name="file"
                    required
                    id="file-u"
                    accept="image/*"
                    className="jb"
                    ref={picRef}
                    onChange={e => { setState({ ...state, profilePic: e.target.files }); setState({ ...state, selectName: e.target.files[0].name }); }}
                  />
                  <label
                    htmlFor="file-u"
                    className="choosefile">
                    Edit Photo
                  </label>

                  {state.selectName ? <p>Photo Name : {state.selectName}</p> : ""}

                  {state.loading ? <button
                    className="btk"
                    type="button">
                    Loading....
                  </button>
                    : <button
                      className="btk"
                      type="submit">
                      Upload
                    </button>}

                  {state.uploadError ? <p style={{ color: "red" }}> {state.uploadError}</p> : ""}
                </form>
              </div>
            );
          })}
        </div>

        <div className="kojt">
          <form className="UT" onSubmit={(e) => uploadSong(e)} >
            <input
              type="file"
              accept="audio/*"
              required
              id="file-k"
              hidden
              ref={audioRef}
              onChange={(e) => handleAudio(e.target.files)}
            />
            <label
              htmlFor="file-k"
              style={{ color: "yellow", backgroundColor: "red", padding: "3px" }}
            >
              CLICK HERE TO UPLOAD FILE
            </label>

            <input
              placeholder="Song Name"
              required
              className="jb"
              onChange={(e) => setState({ ...state, songName: e.target.value })}
            />

            <input
              placeholder="Gerne"
              required
              className="jb"
              onChange={(e) => setState({ ...state, genre: e.target.value })}
            />
            <input
              placeholder="Sang By"
              required
              className="jb"
              onChange={(e) => setState({ ...state, sangBy: e.target.value })}
            />
            {state.uploadedCover ? <p>Cover file : {state.uploadedCover}</p> : ""}
            {state.uploadedsong ? <p>song file : {state.uploadedsong}</p> : ""}

            {state.uploading ? <button type="button" className="bts" >Loading .....</button>
              : <button type="submit" className="bts" >upload</button>}

            {state.error ? <p style={{ color: "red" }} >{state.error}</p> : ""}
          </form>
        </div>

        <div className="qw">
          <label
            style={{ color: "yellow" }}
          >
            YOUR UPLOADS
          </label>
          <div className="qwe">
            {userSongs.Yoursongs.length === 0 ? <p style={{ marginTop: "20px" }} >No uploads yet</p>
              : userSongs.Yoursongs.map(({ id, songName }) => {
                return (
                  <div key={id}>
                    <p>{songName}</p>
                  </div>
                );
              })}
          </div>
        </div>

      </div>
    </div>

  );
};
