import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  let user = null;
try {
  const userData = localStorage.getItem('user');
  if (userData) {
    user = JSON.parse(userData);
  }
} catch (error) {
  console.error('Failed to parse user data:', error);
  // Optional: Clear corrupted data
  localStorage.removeItem('user');
}

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white px-6 py-3">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">EventHub</Link>
      </div>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/events" className="hover:underline">Events</Link>
            <Link to="/create-event" className="hover:underline" > Create Event </Link>
            <span className="text-sm">Hi, {user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/events" className="hover:underline">Events</Link>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;