import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Preloader from "../components/Preloader";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.post("/events/getevent")
      .then((res) => {
        setEvents(res.data);
        setFilteredEvents(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => alert("Failed to load events"));
  }, [navigate]);

  // Filter events based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.createdByName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [searchQuery, events]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <Preloader />;

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
        {/* Header with Title and Search Bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Upcoming Events
          </h1>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-4 text-center text-gray-600">
            {filteredEvents.length > 0
              ? `Found ${filteredEvents.length} event${
                  filteredEvents.length !== 1 ? "s" : ""
                } matching "${searchQuery}"`
              : `No events found matching "${searchQuery}"`}
          </div>
        )}

        {filteredEvents.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-lg">
            {searchQuery ? "No events match your search." : "No events found."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="border p-5 rounded-2xl shadow-xl bg-white flex flex-col transition-transform hover:scale-105 hover:shadow-2xl duration-300"
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
                    <span className="text-gray-400">Event Image</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-1 truncate">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  By{" "}
                  <span className="font-semibold">
                    {event.createdByName || "Unknown"}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">
                    ({event.createdByEmail || "No Email"})
                  </span>
                </p>
                <p className="text-gray-600 flex-1 mb-2 line-clamp-3">
                  {event.description}
                </p>
                {event.cost > 0 ? (
                  <p className="text-gray-600 flex-1 mb-2 line-clamp-3">
                    Registration Fee: ₹{event.cost}
                  </p>
                ) : null}
                <p className="text-xs text-gray-400 mb-3">
                  {new Date(event.date).toLocaleString()}
                </p>
                {event.createdByName !== user?.username && user ? (
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-green-500 hover:to-blue-500 transition-colors duration-300"
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
