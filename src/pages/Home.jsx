import React from "react";

const Home = () => {
  let user = null;
  try{
    const userData = localStorage.getItem('user');
    if(userData){
      user = JSON.parse(userData);
    }
  } catch (error) {
    localStorage.removeItem('user');
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <main className="flex-grow flex items-center justify-center">
        <section className="text-center">
          {
            user ? (
              <h1 className="text-4xl font-bold mb-4">
                Welcome back, <span className="text-blue-600">{user.username || user.name}</span>!
              </h1>
            ) : (
              <h1 className="text-4xl font-bold mb-4">Welcome to EventHub!</h1>
            )
          }
          <p className="text-lg text-gray-600 mb-8">
            Discover, create, and manage events with ease.
          </p>
          <a
            href="/events"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-500 transition font-semibold"
          >
            Explore Events
          </a>
        </section>
      </main>
      <footer className="bg-gray-100 text-gray-500 text-center py-4">
        &copy; {new Date().getFullYear()} EventHub. All rights reserved.
        
      </footer>
    </div>
  );
};

export default Home;