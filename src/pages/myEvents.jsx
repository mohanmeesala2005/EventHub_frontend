import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  let user = null;
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (error) {
    localStorage.removeItem('user');
  }

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    API.post('/events/getevent')
      .then((res) => setEvents(res.data))
      .catch((err) => alert('Failed to load events'));
  }, [navigate]);

  const handleDeleteEvent = async (eventid) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to delete events.');
        return;
      }
      await API.delete(`/events/${eventid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter(event => event._id !== eventid));
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
        'Failed to delete event'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events
          .filter(event => event.createdByName === user?.username)
          .map(event => (
            <div key={event._id} className="border p-4 rounded shadow bg-white flex flex-col">
              {/* Image display */}
              <div className="mb-4 h-40 w-full bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                {event.image ? (
                  <img
                    src={`/${event.image.replace(/\\/g, '/')}`}
                    alt="Event"
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <span className="text-gray-400">Event Image</span>
                )}
              </div>
              <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
              <p className="mt-1">{event.description}</p>
              <p className="text-sm text-gray-600 mt-1">{new Date(event.date).toLocaleString()}</p>
              <button
                className='mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'
                onClick={() => handleDeleteEvent(event._id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyEvents;