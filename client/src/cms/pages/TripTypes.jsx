import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import CmsNavbar from "../CmsComponents/CmsNavbar";    // Adjust path if needed
import CmsSidebar from "../CmsComponents/CmsSidebar";  // Adjust path if needed

function TripTypes() {
  const navigate = useNavigate();

  // Sample data for trip types, matching your screenshot
  const [tripTypes, setTripTypes] = useState([
    { id: 1, name: "Solo" },
    { id: 2, name: "Wildlife" },
    { id: 3, name: "Heritage" },
    { id: 4, name: "Bird Watching" },
    { id: 5, name: "Plantation" },
    { id: 6, name: "Rural" },
    { id: 7, name: "Rainforest" },
    { id: 8, name: "Waterfront" },
    { id: 9, name: "Romantic" },
    { id: 10, name: "Mountains" },
    { id: 11, name: "Historical" },
    { id: 12, name: "Nature Trails" },
  ]);

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");

  // Handlers
  const handleLogout = () => {
    console.log("Logged out");
  };

  const handleAddNew = () => {
    console.log("Add New Trip Type clicked");
    // You could navigate to an "Add Trip Type" page: navigate("/trip-types/add");
  };

  const handleEdit = (id) => {
    console.log("Edit trip type with id:", id);
    // For example, navigate(`/trip-types/edit/${id}`);
  };

  const handleDelete = (id) => {
    console.log("Delete trip type with id:", id);
    // Remove from state or handle via API
    setTripTypes((prev) => prev.filter((type) => type.id !== id));
  };

  // Filter trip types based on search term
  const filteredTripTypes = tripTypes.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <CmsSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <CmsNavbar onLogout={handleLogout} />

        <main className="p-4">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Trip Types</h1>
              <p className="text-sm text-gray-500">Trip Types &gt; All Trip Types</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-3 sm:mt-0">
              <button
                onClick={handleAddNew}
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 rounded mb-2 sm:mb-0"
              >
                Add New
              </button>
              <input
                type="text"
                placeholder="Search Destinations"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          {/* Trip Types Table */}
          <div className="overflow-x-auto bg-white shadow rounded">
            <table className="w-full table-auto">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">#</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Trip Type</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTripTypes.map((type, index) => (
                  <tr key={type.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{type.name}</td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(type.id)} title="Edit">
                          <FaEdit className="text-blue-500 hover:text-blue-700" />
                        </button>
                        <button onClick={() => handleDelete(type.id)} title="Delete">
                          <FaTrash className="text-red-500 hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredTripTypes.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                      No trip types found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TripTypes;
