import React from 'react'
import { useState, useEffect } from 'react';
import PreviousButton from '../assets/previous.png'
// import { Link } from 'react-router-dom';

const History = () => {
  /**
   * State to store listening history and the last listened episode
   * 
   * This code essentially sets up a React state variable 
   * (listeningHistory) with an initial value based on the data stored in localStorage
   */
  const [listeningHistory, setListeningHistory] = useState(
    JSON.parse(localStorage.getItem('listeningHistory')) || []
  );
  const [lastListened, setLastListened] = useState(
    JSON.parse(localStorage.getItem('lastListened')) || {}
  );

  /**
   * Effect to update 'listeningHistory' in local storage when it changes
   * 
   * This setup ensures that the local storage is updated whenever 
   * listeningHistory changes, helping to keep the local storage in sync with the component's state.
   */
  useEffect(() => {
    localStorage.setItem('listeningHistory', JSON.stringify(listeningHistory));
  }, [listeningHistory]);

  /**
   * Effect to update 'lastListened' in local storage and add to history
   * 
   * useEffect hook in a React component, and its purpose is to update the local storage whenever 
   * the lastListened variable changes. This is similar to the previous example you provided for 
   * updating the listeningHistory in local storage.
   */
  useEffect(() => {
    localStorage.setItem('lastListened', JSON.stringify(lastListened));

 const timer = setTimeout(() => {
  if (lastListened.show && lastListened.episode && lastListened.progress) {
    setListeningHistory((prevHistory) => [
      ...prevHistory,
      {
        show: lastListened.show,
        episode: lastListened.episode,
        progress: lastListened.progress,
        timestamp: new Date().toISOString(),
      },
    ]);
  }
}, 10 * 60 * 1000);
/**
 * The return statement indicates that the function inside it will be used as the cleanup function.
 * The arrow function () => clearTimeout(timer) is the cleanup function itself.
 * clearTimeout(timer) is called to clear the timeout identified by the timer variable
 * 
 * Clean up the timer if component unmounts or 'lastListened' changes
 */
return () => clearTimeout(timer);
/**
 * This structure ensures that the timer is cleared if the 
 * component is unmounted or if lastListened changes before the timeout expires, 
 * preventing potential issues related to state updates on an unmounted component
 */
}, [lastListened]);

  /** Function to reset listening history and last listened episode 
  */
  const handleResetProgress = () => {
    setListeningHistory([]);
    setLastListened({});
  };

  /**
   *  Render the History component
  */
  return (
    <div className="history-container">
      <div className='titles'>
        {/* <Link to="./components/Home">Go to Home</Link>         */}
        <img className='previous--icon' src={PreviousButton}></img>
        <h1>Listening History</h1>
      </div>
      {listeningHistory.length > 0 ? (
        <ul>
          {listeningHistory.map((episode, index) => (
            <li key={index}>
              <p>Show: {episode.show}</p>
              <p>Episode: {episode.episode}</p>
              <p>Progress: {episode.progress} seconds</p>
              <p>Timestamp: {episode.timestamp}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No listening history found.</p>
      )}
      <button onClick={handleResetProgress}>Reset Listening Progress</button>
    </div>
  );
};

export default History;
/**
 * Displays a user's listening history.
 * Lists the podcasts and episodes they've listened to, along with progress and timestamps.
 * Users can reset their listening history.
 */