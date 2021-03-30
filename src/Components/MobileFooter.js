import userLogo from '../Images/user.png';
import { useHistory } from 'react-router-dom';
import Home from '../Images/home.png';

import about from '../Images/about_2.png';
import logOut from '../Images/logout.png';
import search from '../Images/search.png';


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
export const MachineHeader = () => {
  const history = useHistory();
  const dashBoard = () => {
    history.push('/dashboard');
  };
  const logingOut = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div className="MachineHeader" style={{ color: "white" }}>
      <div className="back" onClick={dashBoard}>
        AkashiAudio
      </div>
      <div className="songPlaying">
        <ul className="nav-links">
          <li onClick={() => history.push('/search')}><img src={search} alt="search" width='30' /></li>
          <li onClick={() => history.push('/profile')}><img src={userLogo} alt="profile" width='30' /></li>
          <li onClick={logingOut}><img src={logOut} alt="log out" width='30' /></li>
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
