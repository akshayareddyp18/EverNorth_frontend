import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';
import evernorth from "../assets/evernorth.jpg"; 

function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state; // Retrieve the passed user data

  const heroImageStyle: React.CSSProperties = {
    backgroundImage:`url(${evernorth})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div 
            className="h-64"
            style={heroImageStyle} // Apply the correctly typed style object
          />
          
          {/* Content */}
          <div className="p-8">
            <div className="flex items-center justify-center -mt-20">
              <div className="bg-white p-2 rounded-full shadow-lg">
                <UserCircle2 size={64} className="text-teal-600" />
              </div>
            </div>
            <div className="text-center mt-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Welcome, {userData ? userData.name : 'User'}!
              </h1>
              <p className="text-gray-600 mb-8">
                A user-friendly platform to manage your health, track issues, and make payments
              </p>
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 rounded-xl inline-block">
                <p className="text-teal-100 text-sm">MEMBER ID</p>
                <p className="text-white text-2xl font-mono tracking-wider">
                  {userData ? userData.memberId : 'N/A'}
                </p>
              </div>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {/* Login */}
                <a 
                  href="/login" 
                  className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <h3 className="font-semibold text-gray-800">Login</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Access your account
                  </p>
                </a>
                {/* Profile */}
                <a 
                  href="/profile-setup" 
                  className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <h3 className="font-semibold text-gray-800">Profile</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    View and update your details
                  </p>
                </a>
                {/* Explore Features */}
                <a 
                  href="/explore" 
                  className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <h3 className="font-semibold text-gray-800">Explore Features</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Discover all available services
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
