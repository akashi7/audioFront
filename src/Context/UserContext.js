import { createContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { UserReducer } from '../Context/UserReducer';

const initialState = {

  songList: {
    songs: []
  },
  song: {
    songName: []
  },
  userProfile: {
    user: []
  },
  allUsers: {
    Users: []
  }

};


export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {

  let url;

  process.env.NODE_ENV === 'development' ? url = `http://localhost:5000` : url = `https://audiolive.herokuapp.com`;

  const history = useHistory();

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const viewAllSongs = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/user/allSongs`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'SONG_LISTS',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/');
    }

  };

  const viewSong = async (token, songId) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/user/viewSong?songId=${songId}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'VIEW_SONG',
        payload: res.data
      });
    }

    else if (res.status === 401) {
      localStorage.clear();
      history.push('/');
    }

  };

  const profile = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/user/viewProfile`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'PROFILE',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/');
    }
  };

  const viewAll = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/admin/all`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'ALL',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/');
    }
  };






  return (
    <UserContext.Provider value={{ ...state, viewAllSongs, viewSong, profile, viewAll }}>
      {children}
    </UserContext.Provider>

  );

};

