import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.post('/events/getevent')
      .then((res) => setEvents(res.data))
      .catch((err) => alert('Failed to load events'));
  }, []);

  return (
    // ...existing imports...
<ul className="space-y-2">
  {events.map((event) => (
    <li key={event._id} className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">
        An event by {event.createdByName || "Unknown"} ({event.createdByEmail || "No Email"})
      </h2>
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p>{event.description}</p>
      <p className="text-sm text-gray-600">{new Date(event.date).toLocaleString()}</p>
    </li>
  ))}
</ul>
  );
};

export default Events;
