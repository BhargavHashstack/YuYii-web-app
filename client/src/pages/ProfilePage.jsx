import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  fetchUserByPhoneStart,
  fetchUserByPhoneSuccess,
  fetchUserByPhoneFailure,
} from "../redux/user/userSlice";
import profilebanner from "/assets/images/profile-banner.png";
import PartnerSection from "../components/RepeatedComponents/Partners";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  // Local form state and errors
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    preferredLanguage: "",
    location: "",
    password: "",
    avatar: "",
    mobileAlerts: false,
    emailAlerts: false,
  });
  const [errors, setErrors] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Flag to ensure we initialize form data only once
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle file uploads
  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  // Initialize form data based on currentUser only once.
  useEffect(() => {
    if (currentUser && !isFormInitialized) {
      if (currentUser.phone) {
        // If phone exists, fetch additional data.
        dispatch(fetchUserByPhoneStart());
        fetch(`/property-api/user/phone/${currentUser.phone}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              dispatch(fetchUserByPhoneSuccess(data.user));
              setFormData({
                firstName: data.user.firstName ?? "",
                lastName: data.user.lastName ?? "",
                email: data.user.email ?? "",
                phone: data.user.phone ?? "",
                gender: data.user.gender ?? "",
                dateOfBirth: data.user.dateOfBirth ?? "",
                preferredLanguage: data.user.preferredLanguage ?? "",
                location: data.user.location ?? "",
                password: "", // ignore password updates
                avatar: data.user.avatar ?? "",
                mobileAlerts: data.user.mobileAlerts ?? false,
                emailAlerts: data.user.emailAlerts ?? false,
              });
              setIsFormInitialized(true);
            } else {
              dispatch(fetchUserByPhoneFailure(data.message));
            }
          })
          .catch((err) => dispatch(fetchUserByPhoneFailure(err.message)));
      } else {
        // For OAuth logins (without phone), use currentUser directly.
        setFormData({
          firstName: currentUser.firstName || "",
          lastName: currentUser.lastName || "",
          email: currentUser.email || "",
          phone: currentUser.phone || "",
          gender: currentUser.gender || "",
          dateOfBirth: currentUser.dateOfBirth || "",
          preferredLanguage: currentUser.preferredLanguage || "",
          location: currentUser.location || "",
          password: "", // do not update password here
          avatar: currentUser.avatar || "",
          mobileAlerts: currentUser.mobileAlerts || false,
          emailAlerts: currentUser.emailAlerts || false,
        });
        setIsFormInitialized(true);
      }
    }
  }, [currentUser, isFormInitialized, dispatch]);
  
  // Upload file to Firebase Storage and update avatar
  const handleFileUpload = (file) => {
    // Correctly get the storage instance from Firebase
    const storage = getStorage(app);
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // Update the avatar field in formData with the new URL
        const updatedData = { ...formData, avatar: downloadURL };
        setFormData(updatedData);

        try {
          dispatch(updateUserStart());
          const res = await fetch(
            `/property-api/user/update/${currentUser._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(updatedData),
            }
          );
          const data = await res.json();

          if (data.success) {
            dispatch(updateUserSuccess(data.user));
            setUpdateSuccess(true);
          } else {
            if (data.message.includes("Phone number already exists")) {
              setErrors((prev) => ({ ...prev, phone: data.message }));
            }
            if (data.message.includes("Email already exists")) {
              setErrors((prev) => ({ ...prev, email: data.message }));
            }
            dispatch(updateUserFailure(data.message));
          }
        } catch (error) {
          dispatch(updateUserFailure(error.message));
        }
      }
    );
  };

  // Track changes in form inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // For toggles (mobileAlerts/emailAlerts)
  const handleToggleChange = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Validate and submit updates (omitting the password field)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name cannot remain empty!";
    }
    if (currentUser.phone && !formData.phone.trim()) {
      newErrors.phone = "Phone number cannot remain empty!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const { password, ...updatePayload } = formData;

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/property-api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatePayload),
      });

      const data = await res.json();
      if (!data.success) {
        if (data.message.includes("Phone number already exists")) {
          setErrors((prev) => ({ ...prev, phone: data.message }));
        }
        if (data.message.includes("Email already exists")) {
          setErrors((prev) => ({ ...prev, email: data.message }));
        }
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data.user));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  // Sign out user
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/property-api/auth/signout", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // Scroll to a specific section by ID
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Profile Banner */}
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

      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Sidebar */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h4 className="text-xl font-serif mb-6">Your Profile</h4>
          <div className="flex flex-col items-center">
            <img
              src={formData.avatar || currentUser?.avatar}
              alt="Profile"
              referrerPolicy="no-referrer"
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="mt-4 w-full text-sm bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
            >
              Upload new photo
            </button>
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
            />
          </div>

          {/* Navigation Buttons */}
          <button
            className="text-center mt-4 text-base font-Merriweather font-[400] p-2 w-full rounded-lg hover:bg-gray-200"
            onClick={() => scrollToSection("personal-settings")}
          >
            Edit personal settings
          </button>

          <button
            className="text-center mt-4 text-base font-Merriweather font-[400] p-2 w-full rounded-lg hover:bg-gray-200"
            onClick={() => scrollToSection("notification-settings")}
          >
            Notifications settings
          </button>

          <button
            onClick={handleSignOut}
            className="mt-12 w-full bg-pink-700 text-white py-3 rounded-lg"
          >
            Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
          {/* Personal Settings Section */}
          <div id="personal-settings" className="mt-2 scroll-mt-28">
            <h4 className="text-xl font-serif mb-6">Edit your personal settings</h4>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Your first name"
                    className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none bg-transparent"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Your surname"
                    className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none bg-transparent"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none bg-transparent"
                    placeholder="example@domain.com"
                  />
                </div>

                {/* Phone number */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 555-123-4567"
                    className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none bg-transparent"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold mb-1">Gender</label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none bg-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Date of birth */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Date of birth
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none bg-transparent"
                  />
                </div>

                {/* Preferred language */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Preferred language
                  </label>
                  <select
                    id="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none bg-transparent"
                  >
                    <option value="">Select Language</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State or City, Country"
                    className="w-full p-2 border-b border-gray-300 focus:border-pink-500 outline-none bg-transparent"
                  />
                </div>
              </div>

              {updateSuccess && (
                <p className="mt-4 p-3 bg-green-100 text-green-700 rounded">
                  Profile updated successfully!
                </p>
              )}

              <button
                type="submit"
                className="mt-6 px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
              >
                Update information
              </button>
            </form>
          </div>

          {/* Notification Settings Section */}
          <div id="notification-settings" className="mt-8 scroll-mt-28">
            <h4 className="text-xl font-serif mb-6">Notification settings</h4>
            <div className="space-y-4">
              {/* Mobile toggle */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Receive alerts on mobile</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.mobileAlerts}
                    onChange={() => handleToggleChange("mobileAlerts")}
                    className="sr-only peer"
                  />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-pink-300
                    rounded-full peer peer-checked:after:translate-x-full after:content-['']
                    after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full
                    after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"
                  ></div>
                </label>
              </div>

              {/* Email toggle */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Receive alerts on email</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emailAlerts}
                    onChange={() => handleToggleChange("emailAlerts")}
                    className="sr-only peer"
                  />
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-pink-300
                    rounded-full peer peer-checked:after:translate-x-full after:content-['']
                    after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full
                    after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"
                  ></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PartnerSection />
    </div>
  );
}
