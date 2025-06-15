import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Creating event...');

    let user = null;
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        user = JSON.parse(userData);
      }
    } catch (error) {
      localStorage.removeItem('user');
    }

    if (!user) {
      navigate('/login');
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);
    data.append('createdBy', user.id || user._id);
    data.append('createdByName', user.username);
    data.append('createdByEmail', user.email);
    if (image) {
      data.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await API.post('/events/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        alert('Event created successfully!');
        setFormData({ title: '', description: '', date: '' });
        setImage(null);
        setMessage('');
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
      <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
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
        <div>
          <label className="block">Event Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
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