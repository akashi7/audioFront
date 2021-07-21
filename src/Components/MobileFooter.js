import { useContext, useEffect, useState } from 'react';
import userLogo from '../Images/user.png';
import { useHistory } from 'react-router-dom';
import Home from '../Images/home.png';
import { UserContext } from '../Context/UserContext';
import logOut from '../Images/logout.png';
import search from '../Images/search.png';
import icon from '../Images/wireless_headset.png';


export const MobileFooter = () => {



  const history = useHistory();

  const dashBoard = () => {
    history.push('/dashboard');
  };

  const logingOut = () => {
    localStorage.clear();
    history.push('/');
  };


  return (
    <div className="mobFooter">
      <ul>
        <li onClick={dashBoard} >
          <img src={Home} className="playlogo" alt="playlist" />
          Home</li>

        <li>
          <img src={userLogo} className="playlogo" alt="user"
            onClick={() => history.push('/profile')} />
          Account</li>
        <li
          onClick={() => history.push('/search')}>
          <img src={search} className="playlogo" alt="search" />
          Search</li>
        <li onClick={logingOut}>
          <img src={logOut} className="playlogo" alt="playlist" />
          Log Out</li>
      </ul>
    </div>
  );
};

export const MachineFooter = () => {
  return (
    <div className="Mfooter">
      Copyright Akashi  &copy;2021
    </div>
  );
};
export const MachineHeader = ({ SearchSongs }) => {


  const token = localStorage.getItem('token');

  const { userProfile, profile } = useContext(UserContext);





  const [state, setState] = useState({
    songs: []
  });


  useEffect(() => {
    (async () => {
      await profile(token);
    })();
    //eslint-disable-next-line
  }, []);


  const setSearch = (text) => {

    if (!text) {
      setState({ ...state, songs: [] });
    }
    else {
      let matches = SearchSongs.filter(({ songName }) => {
        const regex = new RegExp(`${text}`, 'gi');
        return songName.match(regex);
      });
      setState({ ...state, songs: matches });
    }

  };





  const history = useHistory();


  const goToSong = (songName, id) => {
    localStorage.setItem('songId', id);
    history.push(`/playsong/${songName}`);
    window.location.reload();
  };

  const dashBoard = () => {
    history.push('/dashboard');
  };
  const logingOut = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div className="MachineHeader" style={{ color: "white" }}>
      <ul className="nav-links">
        <li onClick={dashBoard} className="iu" ><b>Akashi</b> <img src={icon} alt="rrr" width="20px" />  Audio</li>
        <li onClick={() => history.push('/about')} ><p className="abuy"> <b>About</b></p></li>
      </ul>

      <ul className="nav-links ">
        <input
          placeholder="Search song name"
          onChange={(e) => setSearch(e.target.value)}
          className="jb"
        />
      </ul>

      {(state.songs.length !== 0) ? <div className="ssonglist" >
        {state.songs && state.songs.map(({ songName, id, sangBy }) => {
          return (
            <ul key={id} className="songd" >
              <li onClick={() => goToSong(songName, id)} >{songName} by :{sangBy} </li>
            </ul>
          );
        })}
      </div>
        : ""}

      <div className="songPlaying">
        <ul className="nav-links">
          {userProfile.user.map(({ id, username, pic }) => {
            return (
              <ul key={id} className="nav-link">
                <li onClick={() => history.push('/profile')} style={{ borderBottom: "1px solid yellow" }} ><b>{username}</b></li>
                <li onClick={logingOut}>Log Out</li>
              </ul>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export const MachineHeaderTwo = () => {
  const history = useHistory();
  const dashBoard = () => {
    history.push('/dashboard');
  };
  const logingOut = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div className="mobileHeader" style={{ color: "black" }}>
      <div className="back" onClick={dashBoard}>
        Home
      </div>
      <div className="songPlaying">
        <ul className="nav-links">
          <li onClick={() => history.push('/profile')}>Profile</li>
          <li onClick={() => history.push('/about')}>About</li>
          <li onClick={logingOut}>Log Out</li>
        </ul>
      </div>
    </div>
  );
};

export const MobileHeader = ({ songName }) => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="mobileHeader">
      <div className="back" onClick={goBack}>
        &#8592;
      </div>
      <div className="songPlaying">
        <ul className="nav-links">
          <li>{songName}</li>
        </ul>
      </div>
    </div>
  );
};


export const MobileAboutHeader = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="mobileHeader">
      <div className="back" onClick={goBack}>
        &#8592;
      </div>
      <div className="songPlaying">
        <ul className="nav-links">
          <li>About</li>

        </ul>
      </div>
    </div>
  );
};



export const MobileUserHeader = ({ userName }) => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="mobileHeader">
      <div className="back" onClick={goBack}>
        &#8592;
      </div>
      <div className="songPlaying">
        <ul className="nav-links">
          <li>{userName}</li>
        </ul>
      </div>
    </div>
  );
};

