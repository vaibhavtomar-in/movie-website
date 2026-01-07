import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({ siteName }) => {
  // Array of navigation links
  const navLinks = ['Home', 'Movies', 'TV Shows', 'My List'];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2>{siteName || 'MovieHub'}</h2>
        </div>
        <ul className="navbar-links">
          {navLinks.map((link, index) => (
            <li key={index} className="navbar-link">
              {link}
            </li>
          ))}
        </ul>
        <div className="navbar-search">
          <input type="text" placeholder="Search movies..." />
        </div>
      </div>
    </nav>
  );
};

// PropTypes for type checking
Navbar.propTypes = {
  siteName: PropTypes.string,
};

// Default props
Navbar.defaultProps = {
  siteName: 'MovieHub',
};

export default Navbar;