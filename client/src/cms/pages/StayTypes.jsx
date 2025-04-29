import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import CmsNavbar from "../CmsComponents/CmsNavbar";
import CmsSidebar from "../CmsComponents/CmsSidebar";
import initialStayTypes from "../CmsComponents/StayTypes"; // adjust the path if necessary

const StayTypes = () => {
  // Local state to manage the list of stay types.
  const [stayTypes, setStayTypes] = useState(initialStayTypes);

  // State for showing the Add Stay Type form.
  const [showAddForm, setShowAddForm] = useState(false);
  const [newType, setNewType] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // State for editing a stay type.
  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Handler to add a new stay type.
  const handleAddSave = () => {
    if (newType.trim() === "") return; // simple validation

    const newStay = {
      id: Date.now(), // generate a unique id using timestamp
      type: newType,
      description: newDescription,
    };
    setStayTypes([...stayTypes, newStay]);
    // Reset the form and hide it.
    setNewType("");
    setNewDescription("");
    setShowAddForm(false);
  };

  // Handler to delete a stay type.
  const handleDelete = (id) => {
    const filtered = stayTypes.filter((stay) => stay.id !== id);
    setStayTypes(filtered);
  };

  // Start editing a row.
  const handleEditClick = (stay) => {
    setEditId(stay.id);
    setEditType(stay.type);
    setEditDescription(stay.description);
  };

  // Save the edited row.
  const handleEditSave = (id) => {
    const updatedStayTypes = stayTypes.map((stay) =>
      stay.id === id ? { ...stay, type: editType, description: editDescription } : stay
    );
    setStayTypes(updatedStayTypes);
    setEditId(null);
    setEditType("");
    setEditDescription("");
  };

  // Cancel editing.
  const handleEditCancel = () => {
    setEditId(null);
    setEditType("");
    setEditDescription("");
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Top Navbar */}
      <CmsNavbar />

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <CmsSidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Stay Types</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Add Stay Type
            </button>
          </div>

          {/* Add Stay Type Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-4 p-4 border border-gray-300 rounded shadow"
              >
                <h3 className="text-xl font-semibold mb-2">Add New Stay Type</h3>
                <div className="mb-2">
                  <label className="block mb-1 font-semibold">Type</label>
                  <input
                    type="text"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1 font-semibold">Description</label>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddSave}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Type</th>
                  <th className="px-4 py-2 border-b">Description</th>
                  <th className="px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stayTypes.map((stay) => (
                  <tr key={stay.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{stay.id}</td>
                    <td className="px-4 py-2 border-b">
                      {editId === stay.id ? (
                        <input
                          type="text"
                          value={editType}
                          onChange={(e) => setEditType(e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        stay.type
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {editId === stay.id ? (
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        stay.description
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {editId === stay.id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditSave(stay.id)}
                            className="text-green-500 hover:underline"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="text-gray-500 hover:underline"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(stay)}
                            className="text-pink-500 hover:text-pink-700"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(stay.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayTypes;
