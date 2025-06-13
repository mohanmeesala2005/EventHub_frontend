import React, { useState } from 'react';
import API from '../api/axios';

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Creating event...');

    let user = null;
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        user = JSON.parse(userData);
        console.log('User data:', user);
      }
    } catch (error) {
      localStorage.removeItem('user');
    }

    if (!user || !user._id || !user.username || !user.email) {
      setMessage('User not found. Please log in again.');
      return;
    }

    const eventData = {
      ...formData,
      createdBy: user._id,
      createdByName: user.username,
      createdByEmail: user.email,
    };

    try {
      const response = await API.post('/events/create', eventData);
      if (response.status === 201) {
        alert('Event created successfully!');
        setFormData({ title: '', description: '', date: '' });
      } else {
        setMessage('Failed to create event.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(`Error: ${error.response.data.message}`);
      } else {
        setMessage('Network or server error. Try again.');
      }
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Event</h1>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block">Event Name</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div>
          <label className="block">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;