import { useState } from 'react';
import { useHistory } from 'react-router-dom';


export const HomePage = () => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:5000` : url = `https://audiolive.herokuapp.com`;
  const history = useHistory();


  const [state, setState] = useState({
    isSignForm: false,
    isLoading: false,
    errors: '',
    username: '',
    password: "",
    confirmPassword: ''
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    setState({ ...state, isLoading: true });
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };
    const res = await (await fetch(`${url}/auth/signUp`, config)).json();
    if (res.status === 200) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      history.push('/dashboard');
    }

    if (res.status === 302) {
      setState({ ...state, isLoading: false });
      setState({ ...state, errors: res.message });
    }
    if (res.status === 204) {
      setState({ ...state, isLoading: false });
      setState({ ...state, errors: res.message });
    }

    if (res.status === 409) {
      setState({ ...state, isLoading: false });
      setState({ ...state, errors: res.error });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setState({ ...state, isLoading: true });
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state)
    };

    const res = await (await fetch(`${url}/auth/Login`, config)).json();
    if (res.status === 200) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      history.push('/dashboard');
    }
    if (res.status === 700) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.username);
      history.push('/admin');
    }
    else if (res.status === 204) {
      setState({ ...state, isLoading: false });
      setState({ ...state, errors: res.message });
    }
    if (res.status === 300) {
      setState({ ...state, isLoading: false });
      setState({ ...state, errors: res.message });
    }
    if (res.status === 409) {
      setState({ ...state, isLoading: false });
      setState({ ...state, errors: res.error });
    }

  };

  return (
    <>
      <div className="homePage" >
        <div className="forms">
          {state.isSignForm ? <form onSubmit={handleSignUp}>
            {state.errors ? <div className="errors">
              {state.errors}
            </div>
              : <p style={{ color: 'blueviolet' }}>Sign Up</p>}

            <input
              placeholder="Username"
              type="text"
              required
              onChange={e => setState({ ...state, username: e.target.value })}
            />
            <input
              placeholder="Password"
              type="password"
              required
              onChange={e => setState({ ...state, password: e.target.value })} />
            <input
              placeholder="Confirm password"
              type="password"
              required
              onChange={e => setState({ ...state, confirmPassword: e.target.value })}
            />
            {state.isLoading ? <button type="submit">Loading.....</button>
              : <button type="submit">Sign Up</button>}
            <p >have account?</p>
            <p onClick={() => setState({ ...state, isSignForm: false })} style={{ color: 'blueviolet' }}>Sign In</p>
          </form>
            : <form onSubmit={handleLogin}>
              {state.errors ? <div className="errors">
                {state.errors}
              </div>
                : <p style={{ color: 'blueviolet' }}>Sign In</p>}

              <input
                placeholder="Username"
                type="text"
                onChange={e => setState({ ...state, username: e.target.value })}
                required
              />
              <input
                placeholder="Password"
                type="password"
                required
                onChange={e => setState({ ...state, password: e.target.value })}
              />
              {state.isLoading ? <button type="submit">Loading.....</button>
                : <button type="submit">Log In</button>}

              <p >Do not have account?</p>
              <p onClick={() => setState({ ...state, isSignForm: true })} style={{ color: 'blueviolet' }}>Sign Up</p>
            </form>}

        </div>

      </div>
    </>

  );
};