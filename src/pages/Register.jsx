import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Register = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    // add more fields as needed
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event details
    API.post('/events/getevent')
      .then(res => {
        const found = res.data.find(ev => ev._id === eventId);
        setEvent(found);
      })
      .catch(() => setMessage('Failed to load event details'));
  }, [eventId]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration details to backend
      await API.post('/events/register', {
        eventId,
        ...form,
      });
      setMessage('Registered successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage('Registration failed');
    }
  };

  if (!event) return <div className="p-6">Loading event details...</div>;

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register for {event.title}</h1>
      <p className="mb-2 text-gray-600">{event.description}</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="phone"
          type="text"
          placeholder="Your Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {/* Add more fields as needed */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default Register;