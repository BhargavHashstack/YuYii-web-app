import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import profilebanner from "/assets/images/profile-banner.png";

const NewProfile = () => {
  const [user, setUser] = useState({
    firstName: 'Niharika',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: 'male',
    dateOfBirth: '',
    language: 'english',
    location: 'Patna, Bihar',
    picture: 'https://placehold.co/70',
    mobileAlerts: true,
    emailAlerts: true,
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(false);
  const fileRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({
          ...prev,
          picture: reader.result
        }));
        setFileUploadSuccess(true);
        setTimeout(() => setFileUploadSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative w-full h-64">
        <img 
          src={profilebanner}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-8 left-8 text-white">
          <p className="text-xs uppercase tracking-wide">Your Profile</p>
          <h1 className="text-2xl font-serif font-bold">About yourself</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h4 className="text-xl font-serif mb-8">Your profile</h4>
              
              {/* Profile Picture */}
              <div className="flex items-start space-x-4">
                <div className="relative rounded-full border border-gray-200 p-0.5">
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-medium">{`${user.firstName}`}</h5>
                  <p className="text-sm text-gray-600">{user.location}</p>
                  <button 
                    onClick={() => fileRef.current?.click()}
                    className="text-sm mt-2 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  >
                    Upload new photo
                  </button>
                  <input
                    type="file"
                    ref={fileRef}
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*"
                  />
                </div>
              </div>

              {fileUploadSuccess && (
                <div className="mt-3 p-3 bg-green-100 text-green-700 rounded">
                  Profile picture updated successfully!
                </div>
              )}

              {/* Navigation Links */}
              <div className="mt-8 space-y-2">
                {['Edit personal settings', 'Notification settings'].map((text) => (
                  <a 
                    key={text}
                    href={`#${text.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block p-3 text-gray-800 hover:bg-gray-100 rounded transition-colors"
                  >
                    {text}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 md:border-l border-gray-200 pl-6">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {/* Personal Settings */}
              {/* Personal Settings */}
<section id="edit-personal-settings">
  <h4 className="text-xl font-serif mb-12">Edit your personal settings</h4>
  <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                    {/* Left Column */}
                    <div className="space-y-10">
                      <div className="relative">
                        <label className="absolute -top-6 left-0 text-sm text-gray-600">
                          First name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          value={user.firstName}
                          onChange={handleInputChange}
                          className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none transition-colors bg-transparent"
                          required
                        />
                      </div>

                      <div className="relative">
                        <label className="absolute -top-6 left-0 text-sm text-gray-600">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={user.email}
                          className="w-full p-2 border-b border-gray-300 bg-transparent cursor-not-allowed"
                          disabled
                        />
                      </div>

                      <div className="relative">
                        <label className="text-sm text-gray-600 block mb-2">Gender</label>
                        <div className="relative">
                          <select
                            id="gender"
                            value={user.gender}
                            onChange={handleInputChange}
                            className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none appearance-none bg-transparent"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                      </div>

                      <div className="relative">
                        <label className="text-sm text-gray-600 block mb-2">Preferred language</label>
                        <div className="relative">
                          <select
                            id="language"
                            value={user.language}
                            onChange={handleInputChange}
                            className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none appearance-none bg-transparent"
                          >
                            <option value="english">English</option>
                            <option value="hindi">Hindi</option>
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-10">
                      <div className="relative">
                        <label className="absolute -top-6 left-0 text-sm text-gray-600">
                          Last name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          value={user.lastName}
                          onChange={handleInputChange}
                          className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none transition-colors bg-transparent"
                        />
                      </div>

                      <div className="relative">
                        <label className="absolute -top-6 left-0 text-sm text-gray-600">
                          Phone number
                        </label>
                        <input
                          id="phoneNumber"
                          type="tel"
                          value={user.phoneNumber}
                          onChange={handleInputChange}
                          maxLength={10}
                          className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none transition-colors bg-transparent"
                          required
                        />
                      </div>

                      <div className="relative">
                        <label className="text-sm text-gray-600 block mb-2">Date of birth</label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          value={user.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none bg-transparent"
                        />
                      </div>

                      <div className="relative">
                        <label className="absolute -top-6 left-0 text-sm text-gray-600">
                          Location
                        </label>
                        <input
                          id="location"
                          type="text"
                          value={user.location}
                          onChange={handleInputChange}
                          className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none transition-colors bg-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {updateSuccess && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
                      Profile updated successfully!
                    </div>
                  )}

                  <button
                    type="submit"
                    className="mt-8 px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
                  >
                    Update information
                  </button>
                </form>
              </section>

              
              {/* Notification Settings */}
              <section id="notification-settings" className="mt-12">
                <h4 className="text-xl font-serif mb-6">Notification settings</h4>
                <div className="space-y-4">
                  {['mobile', 'email'].map((type) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-gray-700">Receive alerts on {type}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user[`${type}Alerts`]}
                          onChange={() => setUser(prev => ({
                            ...prev,
                            [`${type}Alerts`]: !prev[`${type}Alerts`]
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProfile;