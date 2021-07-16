import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../Images/59f93175ba67187444ad6ae3b35e040f.png';

export const SplashScreen = () => {

  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/home');
    }, 5000);
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="splash">
        <div className="splashText">
          <img src={logo} className="logo" alt="logo" />
        </div>
      </div>
    </>
  );
};