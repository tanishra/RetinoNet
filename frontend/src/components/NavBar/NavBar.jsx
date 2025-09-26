import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/clerk-react';
import '../NavBar/NavBar.css';

const NavBar = ({ navbarHidden }) => {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  useEffect(() => {
    console.log('NavBar loaded');
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className={`header ${navbarHidden ? 'hidden' : ''}`}>
      <Link to="/" className="logo">RetinoNet</Link>

      <nav className="navbar">
        <a href="#home" className="nav-item">Home</a>
        <a href="#about" className="nav-item">About</a>
        <a href="#contact" className="nav-item">Contact</a>

        {isSignedIn && (
          <Link to="/history" className="nav-item" id='history'>History</Link> // Conditionally render the History button
        )}

        <div className="nav-item">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button className="signup-btn">Create Account</button>
            </SignInButton>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
