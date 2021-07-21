import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import me from '../Images/pp.jpg';
import instagram from '../Images/instagram.png';
import linkedIn from '../Images/linkedin.png';

import about from '../Images/about.png';

export const AboutPage = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');



  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else {
        document.title = "About";
      }
    })();
    //eslint-disable-next-line
  }, []);

  const goBack = () => {
    history.goBack();
  };


  return (
    <div className="yesss">
      <div className="homePaget">
        <div className="cardHeader"><img src={about} alt="about" width="20px" />   About</div>
        <div style={{ textAlign: "center", padding: 10 }}>
          <p className="opqw" onClick={goBack} ><b> &larr;Go</b> Back</p>
          <br></br>
          <p className="foo">About  App</p>
          <p>App for Fun for streaming Music online
            Not fancy but just there.
            Will be adding new Features.
          </p>
          <p className="foo">Developer</p>
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


  );
};
