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
        }, 1000); // Simulate loading delay
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800 tracking-tight">
          Upcoming Events
        </h1>
        {events.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-lg">
            No events found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="border p-5 rounded-2xl shadow-xl bg-white flex flex-col transition-transform hover:scale-105 hover:shadow-2xl duration-200"
              >
                {/* Image display */}
                <div className="mb-4 h-44 w-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
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
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-1 truncate">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  By <span className="font-semibold">{event.createdByName || "Unknown"}</span>
                  <span className="ml-2 text-xs text-gray-400">
                    ({event.createdByEmail || "No Email"})
                  </span>
                </p>
                <p className="text-gray-600 flex-1 mb-2 line-clamp-3">{event.description}</p>
                <p className="text-xs text-gray-400 mb-3">
                  {new Date(event.date).toLocaleString()}
                </p>
                {event.createdByName !== user?.username && user ? (
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-green-500 hover:to-blue-500 transition-colors duration-200"
                    onClick={() => navigate(`/register/${event._id}`)}
                  >
                    Register
                  </button>
                ) : (
                  <span className="text-xs text-green-600 font-semibold mt-2">
                    {user ? "Your Event" : ""}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;