import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', date: '', image: null });
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

  const startEdit = (event) => {
    setEditingEvent(event._id);
    setEditForm({
      title: event.title,
      description: event.description,
      date: event.date ? event.date.slice(0, 10) : '',
      image: null,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEditForm(prev => ({ ...prev, image: files[0] }));
    } else {
      setEditForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (eventid) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to edit events.');
        return;
      }
      const data = new FormData();
      data.append('title', editForm.title);
      data.append('description', editForm.description);
      data.append('date', editForm.date);
      if (editForm.image) {
        data.append('image', editForm.image);
      }
      await API.put(`/events/${eventid}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh events
      API.post('/events/getevent')
        .then((res) => setEvents(res.data))
        .catch((err) => alert('Failed to load events'));
      setEditingEvent(null);
    } catch (error) {
      alert('Failed to update event');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Your Events</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {events
          .filter(event => event.createdByName === user?.username)
          .map(event => (
            <div key={event._id} className="border p-4 rounded shadow bg-white flex flex-col">
              {editingEvent === event._id ? (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleEditSubmit(event._id);
                  }}
                  className="flex flex-col gap-2"
                  encType="multipart/form-data"
                >
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    className="p-2 border rounded"
                    required
                  />
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                    className="p-2 border rounded"
                    required
                  />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleEditChange}
                    className="p-2 border rounded"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                      Save
                    </button>
                    <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEditingEvent(null)}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="mb-4 h-40 w-full bg-gray-200 rounded flex items-center justify-center overflow-hidden">
                    {event.image ? (
                      <img src={`http://localhost:5000/${event.image.replace(/\\/g, '/')}`} alt="Event" className="object-cover h-full w-full" />
                    ) : (
                      <span className="text-gray-400">Event Image</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
                  <p className="mt-1">{event.description}</p>
                  <p className="text-sm text-gray-600 mt-1">{new Date(event.date).toLocaleString()}</p>
                  <div>
                    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded " onClick={() => navigate(`/registrations/${event._id}`)}>
                      View Registrations
                    </button>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700'
                      onClick={() => startEdit(event)}
                    >
                      Edit
                    </button>
                    <button
                      className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'
                      onClick={() => handleDeleteEvent(event._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyEvents;