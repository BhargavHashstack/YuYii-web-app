import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import CmsNavbar from "../CmsComponents/CmsNavbar";   // Adjust import path as needed
import CmsSidebar from "../CmsComponents/CmsSidebar"; // Adjust import path as needed

function AllZones() {
  // Example zone data (matching your screenshot)
  const [zones, setZones] = useState([
    { id: 1, name: "North" },
    { id: 2, name: "West" },
    { id: 3, name: "South" },
    { id: 4, name: "East" },
  ]);

  // Search state (if you want to implement filtering)
  const [searchTerm, setSearchTerm] = useState("");

  // Handlers for edit/delete
  const handleEdit = (id) => {
    console.log("Edit zone with id:", id);
    // Implement edit logic or navigation here
  };

  const handleDelete = (id) => {
    // Remove the zone from state
    const updated = zones.filter((zone) => zone.id !== id);
    setZones(updated);
  };

  const handleAddNew = () => {
    console.log("Add new zone clicked");
    // Implement your add-new logic or navigation here
  };

  // Filtered zones based on search term (if desired)
  const filteredZones = zones.filter((zone) =>
    zone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <CmsSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <CmsNavbar onLogout={() => console.log("Logged out")} />

        <main className="p-4">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">All Destinations</h1>
              <p className="text-sm text-gray-500">Destinations &gt; All Destinations</p>
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

          {/* Zones Table */}
          <div className="overflow-x-auto bg-white shadow rounded">
            <table className="w-full table-auto">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">#</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Zone</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredZones.map((zone, index) => (
                  <tr key={zone.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{zone.name}</td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(zone.id)} title="Edit">
                          <FaEdit className="text-blue-500 hover:text-blue-700" />
                        </button>
                        <button onClick={() => handleDelete(zone.id)} title="Delete">
                          <FaTrash className="text-red-500 hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredZones.length === 0 && (
                  <tr>
                    <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                      No zones found.
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

export default AllZones;
