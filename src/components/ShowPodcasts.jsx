import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// import { Link } from 'react-router-dom';
import PreviousButton from "../assets/previous.png";


const ShowPodcast = ({
    podcastId,
    onFavoriteClick,
    onEpisodeComplete,
    onEpisodeProgress,
}) => {
    /**
     * create variables
     */
    const [podcast, setPodcast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSeason, setSelectedSeason] = useState(null);

    /**
     * Fetch podcast data when the podcastId changes
     */
    useEffect(() => {
        if (podcastId) {
            axios
                .get(`https://podcast-api.netlify.app/id/${podcastId}`)
                .then((response) => {
                    setPodcast(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching podcast data:", error);
                    setLoading(false);
                });
        }
    }, [podcastId]);


    if (loading) {
        return <p className="loading--text">Loading...</p>;
    }

    if (!podcast) {
        // eslint-disable-next-line react/no-unescaped-entities
        return <p>Oops! There's been a problem on our side. </p>;
    }

    /**
     * favorite button 
     */
    const handleFavoriteClick = () => {
        if (podcast) {
            onFavoriteClick(podcast);
        }
    };

    /**
     * time to update an episode
     */
    const handleEpisodeMovement = (currentTime) => {
        onEpisodeProgress(podcast, currentTime);
    };

    /**
     * wjen user completes an episode
     */
    const handleEpisodeComplete = () => {
        onEpisodeComplete(podcast);
    };

    /**
     * Handle season button click to expand/collapse episodes
     */
    const handleSeasonClick = (season) => {
        setSelectedSeason((prevSeason) =>
            prevSeason === season ? null : season
        );
    };

    /**
     * Render the ShowPodcast component
     */
    return (
        <div className="showPodcast--container">
            <div className="titles">
                {/* <Link to="./components/Home">Go to Home</Link>         */}
                <img className="previous--icon" src={PreviousButton}></img>
                <h1>Preview Podcast</h1>
            </div>
            {/* Display podcast title and description */}
            <h2>{podcast.title}</h2>
            <p>{podcast.description}</p>
            {/* Render each season and its episodes */}
            {Array.isArray(podcast.seasons) ? (
                podcast.seasons.map((season, index) => (
                    <div key={index}>
                        {/* Use a button to show/hide episodes for the season */}
                        <button onClick={() => handleSeasonClick(season)}>
                            <h2>Season: {season.season}</h2>
                            <h3>Title: {season.title}</h3>
                            <img
                                src={season.image}
                                className="show--image--showPodcast"
                                alt={season.title}
                            />
                        </button>

                        {/* List of episodes for the selected season */}
                        <ul
                            className={`episodes--list ${
                                selectedSeason === season
                                    ? "show--episodes"
                                    : ""
                            }`}
                        >
                            {season.episodes.map((episode, episodeIndex) => (
                                <li key={episodeIndex}>
                                    <h4>{episode.title}</h4>
                                    <p>{episode.description}</p>
                                    {/* Audio player for the episode */}
                                    <audio
                                        controls
                                        onEnded={handleEpisodeComplete}
                                        onTimeUpdate={(e) =>
                                            handleEpisodeMovement(
                                                e.target.currentTime
                                            )
                                        }
                                    >
                                        <source
                                            src={episode.file}
                                            type="audio/mp3"
                                        />
                                    </audio>
                                    {/* Favorite button */}
                                    <button onClick={handleFavoriteClick}>
                                        Favorite
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No seasons found for this podcast.</p>
            )}
        </div>
    );
};

/**
 * Prop type validation for the showPodcast component
 * By defining these propTypes, you can ensure that
 * the showPodcast component is used correctly and that it
 * receives the necessary information to function properly
 *
 * episodeId: The ID of the episode that is being played.
 * podcastId: The ID of the podcast that the episode belongs to.
 * currentTime: The current playback position in seconds.
 * duration: The total duration of the episode in seconds.
 */
ShowPodcast.propTypes = {
    podcastId: PropTypes.number.isRequired,
    onFavoriteClick: PropTypes.func.isRequired,
    onEpisodeComplete: PropTypes.func.isRequired,
    onEpisodeProgress: PropTypes.func.isRequired,
};

/**
 * Export the showPodcast component as the default export
 */
export default ShowPodcast;

/**
 * Shows detailed information about a selected podcast.
 * Allows users to listen to episodes, mark them as favorites, and track progress.
 * Offers episode completion tracking and progress updates
 */
