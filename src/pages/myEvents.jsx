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
      .catch(() => alert('Failed to load events'));
  }, [navigate]);

  const handleDeleteEvent = async (eventid) => {
    const confirmDelete = window.confirm("Are you sure! you want to delete this event?");
    if(!confirmDelete) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to delete events.');
        return;
      }
      await API.delete(`/events/${eventid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter(event => event._id !== eventid));
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete event');
    }
  };

  const startEdit = (event) => {
    setEditingEvent(event._id);
    setEditForm({
      title: event.title,
      description: event.description,
      date: event.date ? event.date.slice(0, 10) : '',
      image: null,
      cost:event.cost,
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
      data.append('cost', editForm.cost);
      if (editForm.image) {
        data.append('image', editForm.image);
      }
      await API.put(`/events/${eventid}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      API.post('/events/getevent')
        .then((res) => setEvents(res.data))
        .catch(() => alert('Failed to load events'));
      setEditingEvent(null);
    } catch {
      alert('Failed to update event');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4">
      <h1 className="text-3xl font-extrabold text-center mb-5 text-blue-800">My Events</h1>
      <div className="flex justify-center align-center">
        <button className="text-balck-500 bg-purple-300 px-4 py-4 my-4 rounded-lg hover:bg-purple-500" onClick={() => navigate('/create-event')}>Create Events</button>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {events
          .filter(event => event.createdByName === user?.username)
          .map(event => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden"
            >
              {editingEvent === event._id ? (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleEditSubmit(event._id);
                  }}
                  className="flex flex-col gap-3 p-4"
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
                    type="number"
                    name="cost"
                    value={editForm.cost}
                    onChange={handleEditChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleEditChange}
                    className="p-2 border rounded"
                  />
                  <div className="flex gap-2 mt-2">
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
                  <div className="h-44 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {event.image ? (
                      <img
                        src={`http://localhost:5000/${event.image.replace(/\\/g, '/')}`}
                        alt="Event"
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col p-4">
                    <h3 className="text-xl font-bold text-blue-700 mb-1">{event.title}</h3>
                    <p className="text-gray-700 mb-2 line-clamp-2">{event.description}</p>
                    <p className="text-sm text-gray-500 mb-4">{new Date(event.date).toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mb-4">Cost: ₹{event.cost}</p>
                    <button
                      className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition mb-2"
                      onClick={() => navigate(`/registrations/${event._id}`)}
                    >
                      View Registrations
                    </button>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm"
                        onClick={() => startEdit(event)}
                      >
                        Edit
                      </button>
                      <button
                        className="flex-1 bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 text-sm"
                        onClick={() => handleDeleteEvent(event._id)}
                      >
                        Delete
                      </button>
                    </div>
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