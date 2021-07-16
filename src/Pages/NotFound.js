import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MachineFooter, MachineHeader, MobileFooter } from '../Components/MobileFooter';
export const NotFound = () => {
  const [state, setState] = useState({
    viewSize: ''
  });
  const view = window.screen.width;
  const token = localStorage.getItem('token');
  const history = useHistory();

  async function getToken() {
    if (!token) {
      history.push('/');
    }
    else if (view <= 480) {
      document.title = "mobile web | Not found";
      setState({ ...state, viewSize: 'mobile' });

    }
    else {
      document.title = "Not  found";

    }
  }
  useEffect(() => {
    getToken();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      {state.viewSize ? (
        <>
          <div className='msea'>
            <p style={{ color: 'white' }}>Song not found</p>
          </div>
          <MobileFooter />
        </>
      ) : (
        <>
          <div className='not'>
            <MachineHeader />
            Song not found
          </div>
          <MachineFooter />
        </>
      )}

    </>
  );
};
