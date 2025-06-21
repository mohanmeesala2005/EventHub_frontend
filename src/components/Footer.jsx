import React from 'react';

const Footer = () => (
    <footer className="bg-gray-900 text-white py-4 text-center fixed left-0 bottom-0 w-full z-50">
        <div>
            &copy; {new Date().getFullYear()} EventHub. All rights reserved.
        </div>
        <div className="text-sm mt-1">
            <a href="/privacy" className="text-gray-300 mx-2 hover:underline">Privacy Policy</a>
            <span className="text-gray-500">|</span>
            <a href="/terms" className="text-gray-300 mx-2 hover:underline">Terms of Service</a>
        </div>
    </footer>
);

export default Footer;