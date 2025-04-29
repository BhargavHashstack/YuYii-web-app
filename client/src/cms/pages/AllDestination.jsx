import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import CmsNavbar from "../CmsComponents/CmsNavbar";
import CmsSidebar from "../CmsComponents/CmsSidebar";

function AllDestination() {
  const navigate = useNavigate();
  const [destinationList, setDestinationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Helper to pick the right ID field (id vs. _id)
  const getDestId = (dest) => dest.id ?? dest._id;

  // Fetch all destinations from the backend
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("/property-api/selecteddestinations");
        if (!res.ok) throw new Error("Failed to fetch destinations");
        const data = await res.json();
        setDestinationList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const handleLogout = () => {
    console.log("Logged out");
  };

  const handleEdit = (id) => {
    navigate(`/cms/EditDestination/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/property-api/selecteddestinations/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to delete destination");
      setDestinationList((prev) =>
        prev.filter((dest) => getDestId(dest) !== id)
      );
    } catch (err) {
      console.error("Error deleting destination:", err);
      alert(err.message);
    }
  };

  const handleAddNew = () => {
    navigate("/cms/AddDestination");
  };

  // Filter by name or state
  const filtered = destinationList.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-pink-600">Error</h1>
        <p className="mt-4 text-gray-700 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-white">
      <CmsSidebar />

      <div className="flex-1 flex flex-col">
        <CmsNavbar onLogout={handleLogout} />

        <main className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                All Destinations
              </h1>
              <p className="text-sm text-gray-500">
                Destinations &gt; All Destinations
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-3 sm:mt-0">
              <button
                type="button"
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 rounded mb-2 sm:mb-0"
                onClick={handleAddNew}
              >
                Add New
              </button>
              <input
                type="text"
                placeholder="Search by destination name or state"
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-pink-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto bg-white shadow rounded">
            <table className="w-full table-auto">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">
                    #
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">
                    Destination Name
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">
                    State
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((dest, idx) => {
                  const idValue = getDestId(dest);
                  return (
                    <tr
                      key={idValue}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-2 px-4">{idx + 1}</td>
                      <td className="py-2 px-4">{dest.name}</td>
                      <td className="py-2 px-4">{dest.state}</td>
                      <td className="py-2 px-4">
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(idValue)}
                            title="Edit"
                          >
                            <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(idValue)}
                            title="Delete"
                          >
                            <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-4 px-4 text-center text-gray-500"
                    >
                      No destinations found.
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

export default AllDestination;
