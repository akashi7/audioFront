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

  const history = useHistory();

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const viewAllSongs = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`https://audiolive.herokuapp.com/user/allSongs`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'SONG_LISTS',
        payload: res.data
      });
    }
    else if (res.status === 401) {
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
    const res = await (await fetch(`https://audiolive.herokuapp.com/user/viewSong?songId=${songId}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'VIEW_SONG',
        payload: res.data
      });
    }

    else if (res.status === 401) {
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
    const res = await (await fetch(`https://audiolive.herokuapp.com/user/viewProfile`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'PROFILE',
        payload: res.data
      });
    }
    else if (res.status === 401) {
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
    const res = await (await fetch(`https://audiolive.herokuapp.com/admin/all`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'ALL',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      history.push('/');
    }
  };






  return (
    <UserContext.Provider value={{ ...state, viewAllSongs, viewSong, profile, viewAll }}>
      {children}
    </UserContext.Provider>

  );

};

