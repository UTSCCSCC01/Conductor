import React from 'react';
import PropTypes from 'prop-types';
import PageApp from '../PageApp';
import './HomePage.css';

/**
 * UI for **Home Page** of Orchestra.
 * 
 * * If the user is not logged in, then Fullpage with a simple navigation bar will appear.
 * 
 * * If the user is logged in, user dashboard with a sidebar will appear.
 */
export default function HomePage({ login }) {
    return (
        <PageApp 
            login={login}
            page={
                <div className={!login ? "home-pre" : "home"}>
                    HomePage
                </div>
            }
        />
    );
}

HomePage.propTypes = {
  /**
   * If user logged in
   */
  login: PropTypes.bool,
};

HomePage.defaultProps = {
  login: true,
};