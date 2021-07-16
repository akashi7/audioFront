import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../Context/UserContext';

export const Admindash = () => {
  const { allUsers, viewAll } = useContext(UserContext);
  const history = useHistory();
  const token = localStorage.getItem('token');
  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else {
        await viewAll(token);
      }
    })();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="bbb">
        <p onClick={() => { history.push('/'); localStorage.clear(); }}>Log out</p>
      </div>
      {allUsers.Users.map(id => {
        return (
          <div key={id.id}>
            <p>{id.id} : {id.username}</p>
          </div>
        );
      })}
    </div>
  );
};
