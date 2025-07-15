import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col">
      <main className="flex-grow flex items-center justify-center">
        <section className="text-center max-w-xl mx-auto bg-white/80 rounded-xl shadow-lg p-10">
          {user ? (
            <h1 className="text-4xl font-bold mb-4">
              Welcome back,{" "}
              <span className="text-blue-600">
                {user.username || user.name}
              </span>
              !
            </h1>
          ) : (
            <h1 className="text-4xl font-bold mb-4">
              Welcome to <span className="text-blue-600">EventHub</span>!
            </h1>
          )}
          <p className="text-lg text-gray-600 mb-8">
            Discover, create, and manage events with ease.
            <br />
            Join a vibrant community and never miss out on exciting happenings!
          </p>
          <Link
            to="/events"
            className="inline-block bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-3 rounded-lg shadow-lg hover:from-green-500 hover:to-blue-600 transition font-semibold text-lg"
          >
            Explore Events
          </Link>
          {!user ? (
            <p className="text-grey-500 my-2">
              <Link className="text-blue-500" to="/login">
                Login
              </Link>{" "}
              to register for the events.
            </p>
          ) : null}
        </section>
      </main>
      <footer className="py-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} EventHub. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
