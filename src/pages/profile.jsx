import React, { useEffect, useState } from 'react';

const Profile = () => {
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
        return (
            <div className="p-8 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
                <p className="text-red-600">You need to be logged in to view this page.</p>
            </div>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/'; // Redirect to home page
    }

    return (
        <div className=" p-8 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">User Name:{user.username}</h1>
            <p className="mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            <button className="mt-4 bg-blue-500 text-white mx-2 px-4 py-2 rounded hover:bg-green-600" onClick={() => window.location.href='/myEvents'}>View your events</button>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;