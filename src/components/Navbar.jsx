import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  let user = null;
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (error) {
    localStorage.removeItem("user");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-white shadow-md">
      <nav className="px-2 py-2 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/letter-e.png" alt="EventHub Logo" className="w-8 h-8" />
            <span className="font-semibold text-xl text-gray-800 tracking-tight">
              EventHub
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">
            Home
          </Link>
          <Link to="/events" className="text-gray-700 hover:text-indigo-600 font-medium transition">
            Events
          </Link>
          {user ? (
            <>
              <Link
                to="/create-event"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Create Event
              </Link>
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 px-3 py-1 rounded hover:bg-gray-100 transition focus:outline-none"
                >
                  <span className="bg-indigo-100 text-indigo-700 rounded-full px-2 py-1 text-sm font-semibold">
                    {user.username?.charAt(0).toUpperCase() || user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                  <span className="font-medium">{user.username || user.name}</span>
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/myEvents"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Events
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7 text-indigo-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col py-2 px-4 space-y-1">
            <Link
              to="/"
              className="block px-2 py-2 rounded hover:bg-indigo-50 text-gray-700 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/events"
              className="block px-2 py-2 rounded hover:bg-indigo-50 text-gray-700 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Events
            </Link>
            {user ? (
              <>
                <Link
                  to="/create-event"
                  className="block px-2 py-2 rounded hover:bg-indigo-50 text-gray-700 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Create Event
                </Link>
                <Link
                  to="/profile"
                  className="block px-2 py-2 rounded hover:bg-indigo-50 text-gray-700 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/myEvents"
                  className="block px-2 py-2 rounded hover:bg-indigo-50 text-gray-700 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  My Events
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-2 py-2 rounded text-red-600 hover:bg-red-50 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-2 py-2 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-2 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
