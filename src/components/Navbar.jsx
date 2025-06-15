import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  let user = null;
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (error) {
    localStorage.removeItem('user');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="sticky top-0 w-full z-50">
      <nav className=" bg-gray-800 text-white px-6 py-3 flex items-center justify-between relative z-10 shadow-md">
      {/* Logo/Brand */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="font-bold text-xl hover:text-gray-300">EventHub</Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/events" className="hover:underline">Events</Link>
        {user ? (
          <>
            
            <button
                    onClick={handleLogout}
                    className="blockl text-left px-2 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-1 hover:underline focus:outline-none"
              >
                <span>Hi, {user.username || user.name}</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/myEvents"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Events
                  </Link>
                  <Link to="/create-event" className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setProfileOpen(false)}>Create Event</Link>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 text-white flex flex-col items-start md:hidden z-30">
          <Link to="/" className="w-full px-6 py-2 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/events" className="w-full px-6 py-2 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Events</Link>
          {user ? (
            <>
              <Link to="/create-event" className="w-full px-6 py-2 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Create Event</Link>
              <Link to="/profile" className="w-full px-6 py-2 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button
                onClick={() => { setMenuOpen(false); handleLogout(); }}
                className="w-full text-left px-6 py-2 hover:bg-gray-700 text-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="w-full px-6 py-2 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="w-full px-6 py-2 hover:bg-gray-700" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
    </div>
  );
};

export default Navbar;