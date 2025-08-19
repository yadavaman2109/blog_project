import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>ज्ञान सागर</h1>
            <span className="logo-subtitle">Knowledge Ocean</span>
          </Link>
          <nav className="nav">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
            <Link to="/" className={location.pathname.includes('/blog/') ? 'active' : ''}>
              Articles
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 