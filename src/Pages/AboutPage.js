import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MobileAboutHeader, MobileFooter, MachineFooter, MachineHeaderTwo } from '../Components/MobileFooter';

import me from '../Images/me.JPG';
import instagram from '../Images/instagram.png';
import linkedIn from '../Images/linkedin.png';

export const AboutPage = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const view = window.screen.width;

  const [state, setState] = useState({
    viewSize: ""
  });


  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else if (view <= 480) {
        setState({ ...state, viewSize: 'mobile' });
        document.title = "Mobile | about";
      }
      else {
        document.title = "About";
      }
    })();
  }, []);
  return (

    <>
      {state.viewSize ? (
        <>
          <MobileAboutHeader />
          <div className="ab">
            <div className="aboutContent">
              <div className="aui">
                <p className="foo">About  App</p>
                <p>Just another App for Fun for playing Music
                Not fancy but cool in some way
                </p>
                <p className="foo">About Developer</p>
                <p>Name is Akashi</p>
                <img src={me} alt="me" className="me" />
              </div>
              <div className="follow">
                <ul>
                  <li>
                    <a href="https://www.instagram.com/akashi__chris/">
                      <img src={instagram} className="social" alt="Insta" />
                    </a>

                      Instagram
                    </li>
                  <li>
                    <a href="https://www.linkedin.com/in/nseko-christian-b505b7201/">
                      <img src={linkedIn} className="social" alt="In" />
                    </a>

                      LinkedIn
                    </li>
                </ul>
              </div>
            </div>
          </div>
          <MobileFooter />
        </>
      ) : (
          <>
            <div className="abi">
              <MachineHeaderTwo />
              <div style={{ textAlign: "center", padding: 10 }}>
                <p className="foo">About  App</p>
                <p>Just another App for Fun for playing Music
                Not fancy but cool in some way
                </p>
                <p className="foo">About Developer</p>
                <p>Name is Akashi</p>
                <img src={me} alt="me" className="me" />
              </div>
              <div className="follow">
                <ul>
                  <li>
                    <a href="https://www.instagram.com/akashi__chris/">
                      <img src={instagram} className="social" alt="Insta" />
                    </a>

                      Instagram
                    </li>
                  <li>
                    <a href="https://www.linkedin.com/in/nseko-christian-b505b7201/">
                      <img src={linkedIn} className="social" alt="In" />
                    </a>

                      LinkedIn
                    </li>
                </ul>
              </div>
            </div>
            <MachineFooter />
          </>
        )}
    </>

  );
};
