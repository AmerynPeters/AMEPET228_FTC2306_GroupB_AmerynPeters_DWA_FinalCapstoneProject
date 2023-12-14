/**
 * Manages overall app functionality and navigation.
 * Uses the Navbar to help users navigate between different sections.
 * Provides a seamless experience for users to explore podcasts, manage favorites, and track listening history.
 */
import { useEffect, useState } from 'react';
// import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/homePage';
import Favorite from './components/Favourites';
import ShowPodcast from './components/ShowPodcasts';
import History from './components/History';
import Authentication from './components/loginForm';
import SocialMediaLinks from './components/SocialMediaLinks';

export default function App() {
  /**  
   * State variables for managing the current page, selected podcast, and favorite episodes
   */
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage') || 'home');
  const [selectedPodcast, setSelectedPodcast] = useState(
    JSON.parse(localStorage.getItem('selectedPodcast')) || null
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favoriteEpisodes')) || []
  );

  /** 
   * Function to handle navigation to different pages
   */
  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  /** 
   * State variables for listening history and the last listened episode
   */
  const [listeningHistory, setListeningHistory] = useState([]);
  const [setLastListened] = useState(null);
  const [email ,setEmail] = useState('')
  const [password ,setPassword] = useState('')
  const [isAuthenticated , setIsAuthenticated] = useState(false)

  /** 
   * Function to handle episode completion and update listening history
  */
  const handleEpisodeComplete = (episode) => {
    if (!listeningHistory.some((item) => item.id === episode.id)) {
      setListeningHistory((prevHistory) => [...prevHistory, episode]);
    }
  };

  /** 
   * Function to handle episode progress and set last listened episode
   */
  const handleEpisodeProgress = (episode, currentTime) => {
    if (currentTime >= episode.duration - 10) {
      setLastListened({
        show: episode.show,
        episode: episode.title,
        progress: currentTime,
      });
    }
  };

  /** 
   * Function to handle favorite button click and update favorites
   */
  const handleFavoriteClick = (episode) => {
    if (!favorites.some((fav) => fav.id === episode.id)) {
      setFavorites((prevFavorites) => [...prevFavorites, episode]);
    }
  };

  /** 
   * Save the current page and selected podcast in localStorage whenever they change
   */
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    localStorage.setItem('selectedPodcast', JSON.stringify(selectedPodcast));
  }, [currentPage, selectedPodcast]);

  /** 
   * Save the favorite episodes in localStorage whenever the favorites change
   */
  useEffect(() => {
    localStorage.setItem('favoriteEpisodes', JSON.stringify(favorites));
  }, [favorites]);

  /**
   *  Add event listener for the beforeunload event to reset the current page when leaving the app
   */
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentPage !== 'home') {
        setCurrentPage('home');
      }
    };
    /**
     * The 'beforeunload' event is triggered just before the document is about to be unloaded, 
     * which can happen when the user closes the browser tab or window, navigates to a different page, or attempts to close the browser
     */
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentPage]);

  /** 
   * Render the App component with conditional rendering based on the current page
   */
 return (
    <> 
  {/* <switch> */}
   { isAuthenticated === false ?  <Authentication
     email={email}
     setEmail={setEmail}
     password={password}
     setPassword={setPassword}
     isAuthenticated={isAuthenticated}
     setIsAuthenticated={setIsAuthenticated}
     /> : <>
     <Navbar onNavClick={handleNavigation} />
      <br />
      
      {currentPage === 'home' && (
        <>
        <Home onPodcastClick={setSelectedPodcast} selectedPodcast={selectedPodcast} />
        {/* <Route path="/Home" exact component={Home} /> */}
        </>
      )};

      {currentPage === 'favorite' && (
        <>
          <Favorite favorites={favorites} setFavorites={setFavorites} />
          {/* <Route path="/Favorite" component={Favorite} /> */}
        </>
      )};

      {currentPage === 'preview' && (
        <ShowPodcast
          podcastId={selectedPodcast?.id}
          onFavoriteClick={handleFavoriteClick}
          onEpisodeComplete={handleEpisodeComplete}
          onEpisodeProgress={handleEpisodeProgress}
        />
      )};

      {currentPage === 'history' && <History />}
      {/* <Route path="/History" component={History} /> */}
      <SocialMediaLinks />
     </>}
     {/* </switch> */}
}</>)};