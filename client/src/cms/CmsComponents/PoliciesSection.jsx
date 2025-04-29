// src/CmsComponents/PoliciesSection.jsx
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const modalVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

export default function PoliciesSection ({ initialPolicy = [], onPolicyChange = () => {} }) {
  // initialPolicy is assumed to be an array of objects like: [{ title: "...", text: "..." }, ...]
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    if (Array.isArray(initialPolicy)) {
      const mapped = initialPolicy.map((p, index) => ({
        id: p.id || index + 1,
        title: p.title || "",
        description: p.text || ""
      }));
      setPolicies(mapped);
    } else {
      setPolicies([]);
    }
  }, [initialPolicy]);

  // Convert local policy objects to DB format: { title, text }
  const convertPoliciesForDb = (arr) =>
    arr.map(({ title, description }) => ({ title, text: description }));

  // Modal state for add/edit
  const [showModal, setShowModal] = useState(false);
  const [policyToEdit, setPolicyToEdit] = useState({ id: null, title: "", description: "" });

  const openAddModal = () => {
    setPolicyToEdit({ id: null, title: "", description: "" });
    setShowModal(true);
  };

  const openEditModal = (policy) => {
    setPolicyToEdit(policy);
    setShowModal(true);
  };

  const handleSavePolicy = () => {
    let updated;
    if (policyToEdit.id) {
      updated = policies.map((p) => (p.id === policyToEdit.id ? { ...policyToEdit } : p));
    } else {
      const newId = policies.length ? policies[policies.length - 1].id + 1 : 1;
      updated = [...policies, { ...policyToEdit, id: newId }];
    }
    setPolicies(updated);
    onPolicyChange(convertPoliciesForDb(updated));
    setShowModal(false);
  };

  const handleDeletePolicy = (id) => {
    const updated = policies.filter((p) => p.id !== id);
    setPolicies(updated);
    onPolicyChange(convertPoliciesForDb(updated));
  };

  return (
    <div className="p-4 bg-white space-y-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Policies</h2>
        <button
          onClick={openAddModal}
          type="button"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Add policies
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {policies.length > 0 ? (
          policies.map((policy) => (
            <div key={policy.id} className="bg-white shadow-md p-3 rounded w-48">
              <h3 className="font-semibold mb-1">{policy.title}</h3>
              <div
                className="text-sm text-gray-600 mb-2 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: policy.description }}
              />
              <div className="flex items-center space-x-2 text-gray-500">
                <button type="button" onClick={() => openEditModal(policy)}>
                  <FaEdit className="hover:text-pink-600" />
                </button>
                <button type="button" onClick={() => handleDeletePolicy(policy.id)}>
                  <FaTrash className="hover:text-pink-600" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No policies available.</p>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed top-0 right-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 h-screen bg-white shadow-2xl z-50 flex flex-col"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-bold">
                {policyToEdit.id ? "Edit Policy" : "Add Policy"}
              </h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-4 overflow-auto flex-1">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Eg: Cancellation Policy"
                  value={policyToEdit.title}
                  onChange={(e) =>
                    setPolicyToEdit({ ...policyToEdit, title: e.target.value })
                  }
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={6}
                  placeholder='Eg: <ul>\n<li>Free cancellation if cancelled 30 days prior...</li>\n<li>No refund if cancelled within 14 days</li>\n</ul>'
                  value={policyToEdit.description}
                  onChange={(e) =>
                    setPolicyToEdit({ ...policyToEdit, description: e.target.value })
                  }
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="p-4 border-t flex justify-end">
              <button
                type="button"
                onClick={handleSavePolicy}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


