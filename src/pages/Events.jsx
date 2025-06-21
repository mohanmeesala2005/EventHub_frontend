import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Preloader  from "../components/Preloader";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.post("/events/getevent")
      .then((res) => {
        setEvents(res.data);
        setTimeout(() => {
          setLoading(false);
        }
        , 1000); // Simulate loading delay
      })
      .catch((err) => alert("Failed to load events"));
  }, [navigate]);

  if(loading ) return <Preloader />;

  let user = null;
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (error) {
    localStorage.removeItem("user");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="border p-4 rounded shadow bg-white flex flex-col"
          >
            {/* Image display */}
            <div className="mb-4 h-40 w-full bg-gray-200 rounded flex items-center justify-center overflow-hidden">
              {event.image ? (
                <img
                  src={`http://localhost:5000/${event.image.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt="Event"
                  className="object-cover h-full w-full"
                />
              ) : (
                <span className="text-gray-400">Event Image</span>
              )}
            </div>
            <h2 className="text-lg font-semibold">
              An event by {event.createdByName || "Unknown"} (
              {event.createdByEmail || "No Email"})
            </h2>
            <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
            <p className="mt-1">{event.description}</p>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(event.date).toLocaleString()}
            </p>
            {event.createdByName !== user?.username && user ? (
              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => navigate(`/register/${event._id}`)}
              >
                Register
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;