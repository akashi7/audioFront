import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FoundMusic } from '../Components/FoundMusic';

import { MachineHeader, MobileFooter } from '../Components/MobileFooter';
import search from '../Images/search.png';
export const SearchSongs = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:5000` : url = `https://audiolive.herokuapp.com`;

  const history = useHistory();
  const token = localStorage.getItem('token');

  const view = window.screen.width;
  const [state, setState] = useState({
    songName: '',
    songLists: {
      songs: []
    },
    viewSize: ''
  });


  async function getToken() {
    if (!token) {
      history.push('/');
    }
    else if (view <= 480) {
      document.title = "mobile web | Search";
      setState({ ...state, viewSize: 'mobile' });

    }
    else {
      document.title = "Search";

    }
  }

  useEffect(() => {
    getToken();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    let SongName = state.songName;

    const res = await (await fetch(`${url}/user/searchSong?songName=${SongName}`, config)).json();

    if (res.status === 200) {
      setState({ ...state, songLists: res.data });
    }
    else if (res.status === 401) {
      localStorage.clear();
      history.push('/');
    }
    else if (res.status === 205) {
      history.push('/notFound');
    }

  };


  return (
    <>
      {state.viewSize ? (
        <>
          <div className="msea">
            <div>
              <form className="searchFormM" onSubmit={handleSearch}  >
                <input
                  placeholder="Search Song"
                  onChange={(e) => setState({ ...state, songName: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  className="search" >
                  <img src={search} alt="search" width='25' />
                </button>
              </form>
            </div>
            <div className='M-allSos'>
              <FoundMusic songList={state.songLists} />
            </div>

          </div>
          <MobileFooter />
        </>
      ) : (
        <>
          <div className="wse">
            <MachineHeader />
            <div>
              <form className="searchForm" onSubmit={handleSearch}  >
                <input
                  placeholder="Search Song"
                  onChange={(e) => setState({ ...state, songName: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  className="search" >
                  <img src={search} alt="search" width='30' />
                </button>
              </form>
            </div>
            <div className='M-allSos'>
              <FoundMusic songList={state.songLists} />
            </div>

          </div>
        </>
      )}

    </>
  );
};
