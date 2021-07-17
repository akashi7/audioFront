import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Dashboard } from './Pages/Dashboard';
import { HomePage } from './Pages/Home';
import { SplashScreen } from './Pages/SplashScreen';
import { UserProvider } from './Context/UserContext';
import { ViewSong } from './Pages/ViewSong';
import { AboutPage } from './Pages/AboutPage';
import { Profile } from './Pages/Profile';
import { Admindash } from './Pages/Admindash';
import { NotFound } from './Pages/NotFound';
import { SearchSongs } from './Pages/SearchSongs';


function App() {
  return (
    <Router>
      <Switch>
        <UserProvider>
          <Route path="/" component={SplashScreen} exact />
          <Route path="/home" component={HomePage} exact />
          <Route path="/dashboard" component={Dashboard} exact />
          <Route path="/playsong/:id" component={ViewSong} exact />
          <Route path="/about" component={AboutPage} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/admin" component={Admindash} exact />
          <Route path="/notFound" component={NotFound} exact />
          <Route path="/search" component={SearchSongs} exact />
        </UserProvider>
      </Switch>
    </Router>
  );
}

export default App;
