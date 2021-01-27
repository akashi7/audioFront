import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { MobileFooter, MobileUserHeader, MachineHeader, MachineFooter } from '../Components/MobileFooter';


import icon from '../Images/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg';


export const Profile = () => {

  const { userProfile, profile } = useContext(UserContext);

  const token = localStorage.getItem('token');
  const view = window.screen.width;
  const user = localStorage.getItem('username');


  const [state, setState] = useState({
    viewSize: "",
    userName: user,
    mo: ''
  });

  const history = useHistory();
  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else if (view <= 480) {
        await profile(token);
        setState({ ...state, viewSize: 'mobile' });
        document.title = "Mobile | Profile";
      }
      else {
        await profile(token);
        setState({ ...state, userName: user });
        document.title = "Profile";
      }
    })();
  }, []);

  return (

    <>
      {(state.viewSize === 'mobile') ? (
        <>
          <MobileUserHeader userName={state.userName} />
          <div className="viewAcc">
            <div className="propro">
              <img src={icon} className="icon" alt='default' />
              {userProfile.user.map(id => {
                return (
                  <div key={id.id}>
                    <p>Username : {id.username}</p>
                  </div>
                );
              })}
            </div>

          </div>
          <MobileFooter />
        </>
      ) :
        (
          <>
            <div className="Mty">
              <MachineHeader />
              <div className="sce">
                <img src={icon} className="Micons" alt='default' />
                {userProfile.user.map(id => {
                  return (
                    <div key={id.id}>
                      <p>Username : {id.username}</p>
                    </div>
                  );
                })}
              </div>


            </div>
            <MachineFooter />
          </>
        )}
    </>

  );
};
