// src/pages/AllStays.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import CmsSidebar from "../CmsComponents/CmsSidebar";
import Navbar from "../CmsComponents/CmsNavbar";

function AllStays() {
  const navigate = useNavigate();
  const [stays, setStays] = useState([]);

  const fetchStays = () => {
    fetch("/property-api/newselectedstay")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStays(data.data);
        }
      })
      .catch((err) => console.error("Error fetching stays: ", err));
  };

  useEffect(() => {
    fetchStays();
  }, []);

  const handleEdit = (stayId) => {
    navigate(`/cms/stays/edit/${stayId}`);
  };

  const handleDelete = (stayId) => {
    fetch(`/property-api/newselectedstay/${stayId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStays(stays.filter((stay) => stay._id !== stayId));
        }
      })
      .catch((err) => console.error("Error deleting stay: ", err));
  };

  const handleLogout = () => {
    navigate("/cms/login");
  };

  return (
    <>
      <div className="flex flex-col">
        <Navbar onLogout={handleLogout} />
      </div>
      <div className="flex h-screen">
        <CmsSidebar />
        <div className="flex-1 p-4 overflow-auto bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">All Stays</h2>
            <button
              onClick={() => navigate("/cms/addstay")}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Add New
            </button>
          </div>
          <div className="bg-white shadow rounded">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">Stay</th>
                  <th className="py-2 px-4 text-left">Destination</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stays.map((stay, index) => (
                  <tr key={stay._id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{stay.name}</td>
                    <td className="py-2 px-4">{stay.destination || "-"}</td>
                    <td className="py-2 px-4">{stay.best_price || "-"}</td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(stay._id)} title="Edit">
                          <FaEdit className="text-blue-500 hover:text-blue-700" />
                        </button>
                        <button onClick={() => handleDelete(stay._id)} title="Delete">
                          <FaTrash className="text-red-500 hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllStays;
