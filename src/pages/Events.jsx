import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get('/events')
      .then((res) => setEvents(res.data))
      .catch((err) => alert('Failed to load events'));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      <ul className="space-y-2">
        {events.map((event) => (
          <li key={event._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-sm text-gray-600">{new Date(event.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
