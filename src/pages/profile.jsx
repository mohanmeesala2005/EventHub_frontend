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

    return (
        <div className=" p-8 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
            <p className="mb-2"><strong>User ID:</strong> {user._id}</p>
            {/* Add more profile details here if needed */}
        </div>
    );
};

export default Profile;