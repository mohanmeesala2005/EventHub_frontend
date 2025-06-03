import React, { useState } from 'react';
import API from '../api/axios'; // axios instance, assumed already configured with baseURL & auth

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
  
    try {
      const response = await API.post('/events', formData);
      if (response.status === 201) {
        alert('Event created successfully!');
        // Optionally reset form or redirect
        setFormData({ title: '', description: '', date: '' });
        // You can navigate to /events or refresh the events list here
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
