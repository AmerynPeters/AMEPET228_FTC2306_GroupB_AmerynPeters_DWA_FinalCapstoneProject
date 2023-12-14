import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import About from "./About";

// import favoriteIcon from '../assets/filledStar.png';
import nonFavoriteIcon from "../assets/star.png";
// import PodcastCarousel from './PodcastCarousel'
import { genreData } from "./genreData";

const Home = ({ onPodcastClicks, selectedPodcast }) => {
    /**
     * All State variables for Home Componenet
     */
    const [showPodcast, setPodcast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("az");
    const [selectedGenre, setSelectedGenre] = useState("");

    useEffect(() => {
        /**
         * Fetch podcast data from a specified API endpoint when the component mounts
         *
         * this code fetches podcast data from the specified API when the component mounts,
         * updates the component's state with the fetched data, and handles any errors that
         * might occur during the API call. The loading state is used to track whether the data
         * is still being fetched or has been successfully loaded
         */
        axios
            .get("https://podcast-api.netlify.app/shows")
            .then((response) => {
                setPodcast(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching show data:", error);
                setLoading(false);
            });
    }, []);

    /**
     * Handle Podcast Click
     */
    const handlePodcastClicks = (podcast) => {
        onPodcastClicks(podcast);
    };

    /**
     *  Handle Search Input change
     */
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    /**
     * Handle genre selection change
     */
    const handleSortChanges = (event) => {
        setSortOption(event.target.value);
    };

    /**
     * Handle genre selection change
     */
    const handleGenreChanges = (event) => {
        const selectedGenreValues = event.target.value;
        setSelectedGenre(selectedGenreValues);
    };

    /**
     *  Format date as a string
     */
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = new Date(dateString).toLocaleDateString(
            undefined,
            options
        );
        return formattedDate;
    };

    /**
     *  Filter podcasts based on search term
     */
    const filteredPodcasts = showPodcast.filter((show) =>
        show.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    /**
     * Filter podcasts based on selected genre
     */
    const genreFilteredPodcasts = selectedGenre
        ? filteredPodcasts.filter((show) =>
              show.genres.some((genre) =>
                  genre.toLowerCase().includes(selectedGenre.toLowerCase())
              )
          )
        : filteredPodcasts;

    /**
     *  Sort Podcasts based on selected sort option
     */
    const sortedPodcasts = [...genreFilteredPodcasts].sort((a, b) => {
        if (sortOption === "az") {
            return a.title.localeCompare(b.title);
        } else if (sortOption === "za") {
            return b.title.localeCompare(a.title);
        } else if (sortOption === "ascDate") {
            return new Date(a.updated) - new Date(b.updated);
        } else if (sortOption === "descDate") {
            return new Date(b.updated) - new Date(a.updated);
        }
    });

    return (
        <div className="home-container">
            <h1>All Shows</h1>
            <div className="search--sort--container">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select value={sortOption} onChange={handleSortChanges}>
                    <option value="az">Sort A-Z</option>
                    <option value="za">Sort Z-A</option>
                    <option value="ascDate">Sort Ascending by Date</option>
                    <option value="descDate">Sort Descending by Date</option>
                </select>
            </div>
            <div className="genres--container">
                <h2>Genres</h2>
                {/*  This specifies that the handleGenreChanges function will 
        be called whenever the user selects a different option in the dropdown */}
                <select value={selectedGenre} onChange={handleGenreChanges}>
                    <option value="">Select a Genre</option>
                    {genreData.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>
            <About />
            {/* Loading beforer show-list */}
            {loading ? (
                <p>Loading podcast list...</p>
            ) : (
                // <PodcastCarousel podcastIds={podcastIds} />
                <ul className="show--list">
                    {sortedPodcasts.map((show) => (
                        // Trigger the handlePodcastClicks function with the corresponding show object when clicked
                        <li
                            key={show.id}
                            onClick={() => handlePodcastClicks(show)}
                        >
                            <div
                                className={`show--info ${
                                    show.id === selectedPodcast?.id
                                        ? "selected"
                                        : ""
                                }`}
                            >
                                <img
                                    src={show.image}
                                    className="show--image"
                                    alt={show.title}
                                />
                                <div className="show--details">
                                    <h3 className="show--title">
                                        {show.title}
                                    </h3>
                                    <p className="show--description">
                                        {show.description}
                                    </p>
                                    {/* <img
                       src={iconSrc}
                       alt={isFavorite ? 'Favorite' : 'Not Favorite'}
                       onClick={handleFavoriteClick}
                       style={{ cursor: 'pointer' }}
                    /> */}
                                    <img
                                        className="favorite--icon "
                                        src={nonFavoriteIcon}
                                        alt="Favorite"
                                    />
                                    {/* <img src={require('../public/images/star.png').default} alt="Favorite" />; */}
                                    <p className="show--seasons">
                                        Numbers of seasons: {show.seasons}
                                    </p>
                                    <p className="show--updated">
                                        Updated: {formatDate(show.updated)}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
          
        </div>
    );
};

/**
 * Render the Home component
 */
Home.propTypes = {
    onPodcastClicks: PropTypes.func.isRequired,
    selectedPodcast: PropTypes.object,
};

export default Home;

