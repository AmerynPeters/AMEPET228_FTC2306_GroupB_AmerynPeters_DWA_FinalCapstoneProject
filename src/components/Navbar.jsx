/**
 * Nav buttons for different sections of the app.
 * Switch between Home, Favorites, Preview, and History pages.
 */
import React from "react";
import PropTypes from 'prop-types';

/** 
 *  Navbar 
 */
const Navbar = ({ onNavigate }) => {
  /**
   *  handles navigation to different pages
   */
  const handleNav = (page) => {
    onNavigate(page);
  };

  /** 
   * Render Navbar 
   */
  return (
    <div className="navbar-container">
      {/* Button to navigate to the 'home' page */}
      <button onClick={() => handleNav('home')}>Home</button>
      {/* Button to navigate to the 'favorite' page */}
      <button onClick={() => handleNav('favorite')}>Favorites</button>
      {/* Button to navigate to the 'preview' page */}
      <button onClick={() => handleNav('preview')}>Preview</button>
      {/* Button to navigate to the 'history' page */}
      <button onClick={() => handleNav('history')}>History</button>
    </div>
  );
};

Navbar.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

/** 
 * Exports Navbar component as the default export
 */
export default Navbar;