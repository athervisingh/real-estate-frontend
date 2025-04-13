import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Pencil,
  Trash2,
  Save,
  X,
  PlusCircle,
  Loader2,
  Search,
} from "lucide-react";

const AdminPanel = () => {
  const [city, setCity] = useState("Abu Dhabi");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [viewCity, setViewCity] = useState("AbuDhabi");
  const [cityData, setCityData] = useState([]);
  const [fetching, setFetching] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState(null);

  const fileInputRef = useRef(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAreaName, setNewAreaName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [areaData, setAreaData] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProperty, setEditProperty] = useState(null);
  const [addProperty, setAddProperty] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAreaData, setFilteredAreaData] = useState(areaData);


  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
       console.log("no token");
       return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: {
            'x-auth-token': token
          }
        });
        console.log(res.data);
      } catch (err) {
        console.error(err);
          }
    };

    fetchDashboard();
  }, []);





  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredAreaData(areaData);
    } else {
      // Filter area names based on search term
      const filteredData = {};

      Object.entries(areaData).forEach(([areaName, properties]) => {
        const formattedAreaName = areaName.replace(/_/g, " ").toLowerCase();

        if (formattedAreaName.includes(searchTerm.toLowerCase())) {
          filteredData[areaName] = properties;
        }
      });

      setFilteredAreaData(filteredData);
    }
  }, [searchTerm, areaData]);

  const handleAreaAdd = (areaName) => {
    setEditProperty({
      house_name: "",
      house_type: "",
      for: "",
      discription: "",
      price: "",
      areaName: areaName, // ✅ set directly here
      imageurl: "",
    });
    setAddProperty(true);
    setEditModalOpen(true);
  };

  const handleAreaEdit = (property, areaName) => {
    setEditProperty({ ...property, areaName });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProperty((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditSubmit = async () => {
    setLoading(true); // 🌀 Start loading

    try {
      const formData = new FormData();

      for (const key in editProperty) {
        if (key === "imageurl" && editProperty[key] instanceof File) {
          formData.append("image", editProperty[key]);
        } else {
          formData.append(key, editProperty[key]);
        }
      }

      const response = await axios.post(
        "http://localhost:5000/api/admin/update-property",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const updated = response.data.data;

        const newAreaData = { ...areaData };
        const areaKey = Object.keys(newAreaData).find((key) =>
          newAreaData[key].some((p) => p._id === updated._id)
        );

        newAreaData[areaKey] = newAreaData[areaKey].map((p) =>
          p._id === updated._id ? updated : p
        );

        setAreaData(newAreaData);
        setEditModalOpen(false);
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error("Error during update:", error);
    } finally {
      setLoading(false); // ✅ End loading
    }
  };

  const handleAddSubmit = async () => {
    try {
      setLoading(true); // 🔄 Start loading

      const formData = new FormData();

      for (const key in editProperty) {
        if (key === "imageurl" && editProperty[key] instanceof File) {
          formData.append("image", editProperty[key]);
        } else {
          formData.append(key, editProperty[key]);
        }
      }

      console.log("📤 Sending form data to backend:", [...formData.entries()]);

      const response = await axios.post(
        "http://localhost:5000/api/admin/add-property",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("📨 Response from backend:", response);

      if (response.status === 200 || response.status === 201) {
        const newProperty = response.data.data;
        const areaKey = editProperty.areaName;

        const newAreaData = { ...areaData };

        if (newAreaData[areaKey]) {
          newAreaData[areaKey].push(newProperty);
        } else {
          newAreaData[areaKey] = [newProperty];
        }

        setAreaData(newAreaData);
        setEditModalOpen(false);
        setAddProperty(false);
      } else {
        alert("Add property failed");
      }
    } catch (error) {
      console.error("❌ Error during add:", error);
      alert("Something went wrong while adding the property.");
    } finally {
      setLoading(false); // ✅ End loading no matter what
    }
  };

  const handleCitySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("city", city);
    if (description.trim()) formData.append("description", description);
    formData.append("image", image);

    try {
      console.log({ city, description, image }); // Log the data being sent to backend
      await axios.post("http://localhost:5000/api/admin/update-city", formData);
      alert("✅ City updated successfully!");
      setCity("Abu Dhabi");
      setDescription("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchCityData();
    } catch (err) {
      console.error("Error during city update:", err); // Log any errors
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCityData = async () => {
    setFetching(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/fetch-city-data?city=${viewCity}`
      );
      setCityData(res.data);
    } catch (err) {
      alert("❌ Failed to fetch city data");
    } finally {
      setFetching(false);
    }
  };

  const fetchAreaData = async () => {
    setFetching(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/fetch-nested-area-data`
      );
      setAreaData(res.data.data); // setting only the `data` part
    } catch (err) {
      alert("❌ Failed to fetch city data");
    } finally {
      setFetching(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await axios.delete("http://localhost:5000/api/admin/delete-city", {
        data: {
          docId: id,
          collectionName: viewCity,
        },
      });

      alert("🗑️ Deleted successfully!");
      setCityData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert("❌ Delete failed");
      console.error(err);
    }
  };

  const handleAreaDelete = async (propertyId, areaName) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/admin/delete-property",
        {
          data: {
            _id: propertyId,
            areaName: areaName,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Remove from frontend state
        const newAreaData = { ...areaData };
        newAreaData[areaName] = newAreaData[areaName].filter(
          (p) => p._id !== propertyId
        );
        setAreaData(newAreaData);

        alert("Property deleted successfully");
      } else {
        alert("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditName(item.name);
    setEditDescription(item.discription);
    setEditImage(null);
  };

  const handleEditSave = async (id) => {
    const formData = new FormData();
    formData.append("city", viewCity);
    formData.append("id", id);
    formData.append("name", editName);
    formData.append("discription", editDescription);
    if (editImage) {
      formData.append("image", editImage);
    }

    try {
      await axios.post("http://localhost:5000/api/admin/edit-city", formData);
      alert("✅ City updated successfully!");
      const updatedData = await axios.get(
        `http://localhost:5000/api/admin/fetch-city-data?city=${viewCity}`
      );
      setCityData(updatedData.data);
      setEditId(null);
      setEditImage(null);
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
  };
  const handleAddNewEntry = () => {
    setNewAreaName("");
    setNewDescription("");
    setNewImage(null);
    setShowAddModal(true);
  };

  const handleNewEntrySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("city", viewCity);
    formData.append("name", newAreaName);
    formData.append("discription", newDescription);
    formData.append("image", newImage);

    try {
      await axios.post("http://localhost:5000/api/admin/addnewEntry", formData);
      alert("✅ Area added successfully!");
      fetchCityData();
      setShowAddModal(false);

      const updatedData = await axios.get(
        `http://localhost:5000/api/admin/fetch-city-data?city=${viewCity}`
      );
      setCityData(updatedData.data);
    } catch (err) {
      alert("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreaData();
    fetchCityData();
  }, [viewCity]);

  return (
    <div className="min-h-screen mt-28 bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 flex justify-center items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-110">
          <img
            src="/images/admin.jpeg"
            alt="Admin Icon"
            className="w-full h-full object-cover"
          />
        </div>
        ADMIN PANEL
      </h1>

      {/* Add/Update Section */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
          Update Emirates
        </h2>

        <form
          onSubmit={handleCitySubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option>Abu Dhabi</option>
              <option>Dubai</option>
              <option>Sharjah</option>
              <option>Ajman</option>
              <option>Umm Al Quwain</option>
              <option>Ras Al Khaimah</option>
              <option>Fujairah</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter city description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload City Image
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setImage(e.target.files[0])}
              disabled={loading}
              className="block w-full text-sm text-gray-700 file:py-2 file:px-4 file:rounded-lg file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`mt-4 w-full md:w-auto px-6 py-2 font-semibold rounded-lg transition duration-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {loading ? "Saving..." : "Save City Info"}
            </button>
          </div>
        </form>
      </div>

      {/* View Section */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
          📄 View City Data
        </h2>

        <div className="mb-4 flex items-center justify-between">
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Emirate to View
            </label>
            <select
              value={viewCity}
              onChange={(e) => setViewCity(e.target.value)}
              disabled={fetching}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option>AbuDhabi</option>
              <option>Dubai</option>
              <option>Sharjah</option>
              <option>Ajman</option>
              <option>UmmAlQuwain</option>
              <option>RasAlKhaimah</option>
              <option>Fujairah</option>
            </select>
          </div>

          <button
    onClick={() => handleAddNewEntry()}
    className="mt-6 md:mt-0 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 h-10 rounded-lg"
  >
    <PlusCircle size={18} className="mr-2 md:mr-2" />
    <span className="hidden md:inline">Add New Entry</span>
  </button>
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000080]">
              <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative">
                <h3 className="text-xl font-semibold mb-4 text-center">
                  ➕ Add New Area
                </h3>

                <form onSubmit={handleNewEntrySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area Name
                    </label>
                    <input
                      type="text"
                      value={newAreaName}
                      onChange={(e) => setNewAreaName(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImage(e.target.files[0])}
                      className="w-full"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Add Area"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto mt-6 rounded-xl border border-[#11314f]/20 shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-sm bg-white">
            <thead className="bg-[#11314f] text-white">
              <tr className="flex flex-col md:table-row">
                <th className="px-4 py-2 text-left font-semibold uppercase">
                  Name
                </th>
                <th className="px-4 py-2 text-left font-semibold uppercase">
                  Description
                </th>
                <th className="px-4 py-2 text-left font-semibold uppercase">
                  Image
                </th>
                <th className="px-4 py-2 text-center font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cityData.length > 0 ? (
                cityData.map((doc) => (
                  <tr
                    key={doc._id}
                    className="flex flex-col md:table-row border-b"
                  >
                    <td className="px-4 py-2">
                      {editId === doc._id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-2 py-1 border rounded-lg"
                        />
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full bg-[#f8bd0f]/20 text-[#11314f] font-semibold">
                          {doc.name}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editId === doc._id ? (
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full px-2 py-1 border rounded-lg"
                        />
                      ) : (
                        doc.discription
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editId === doc._id ? (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setEditImage(e.target.files[0])}
                        />
                      ) : (
                        <img
                          src={doc.imageURL}
                          alt={doc.name}
                          className="w-24 h-16 object-cover rounded-lg border"
                        />
                      )}
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      {editId === doc._id ? (
                        <>
                          <button
                            onClick={() => handleEditSave(doc._id)}
                            className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="inline-flex items-center justify-center bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-lg"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(doc)}
                            className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded-lg"
                          >
                            {" "}
                            {loading ? (
                              <Loader2
                                className="animate-spin mr-2"
                                size={16}
                              />
                            ) : (
                              <Pencil size={16} />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(doc._id)}
                            className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-[#11314f] font-medium"
                  >
                    {fetching ? "Loading..." : "No data found for this city."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <hr className="mt-20"/>
      <div className="p-4 space-y-6 mt-20">
        {/* Search Bar */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
           Search
          </h2>
        <div className="relative mb-6 w-[20vw]">
       
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={20} className="text-gray-500" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search by area name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Property Listings */}
        <div className="space-y-12">
          {Object.keys(filteredAreaData).length > 0 ? (
            Object.entries(filteredAreaData).map(([areaName, properties]) => (
              <div key={areaName}>
                <div className="flex justify-between">
                  <h2 className="text-3xl font-bold capitalize mb-6 text-gray-800">
                    {areaName.replace(/_/g, " ")}
                  </h2>
                  <button
    onClick={() => handleAreaAdd(areaName)}
    className="mt-6 md:mt-0 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 h-10 rounded-lg mb-5"
  >
    <PlusCircle size={18} className="mr-2 md:mr-2" />
    <span className="hidden md:inline">Add New Entry</span>
  </button>
                </div>
                <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
                  {properties.map((property, idx) => (
                    <div
                      key={idx}
                      className="group relative min-w-[280px] bg-white rounded-2xl shadow-lg flex-shrink-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                      {/* Edit/Delete icons */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                        <div
                          onClick={() => handleAreaEdit(property, areaName)}
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200 p-1 rounded-full cursor-pointer"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </div>
                        <div
                          onClick={() =>
                            handleAreaDelete(property._id, areaName)
                          }
                          className="bg-red-100 text-red-700 hover:bg-red-200 p-1 rounded-full cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </div>
                      </div>
                      <img
                        src={property.imageurl}
                        alt={property.house_name}
                        className="w-full h-40 object-cover rounded-t-2xl"
                      />
                      <div className="p-4 space-y-1">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {property.house_name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {property.house_type}
                        </p>
                        <p className="text-sm text-indigo-500 italic">
                          {property.for}
                        </p>
                        <p className="text-sm mt-1 text-gray-700">
                          {property.discription}
                        </p>
                        <p className="text-base font-bold text-green-700 mt-2">
                          AED {property.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">
                No properties found for "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </div>
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Property Detail Form
            </h2>

            <input
              name="house_name"
              value={editProperty.house_name}
              onChange={handleEditChange}
              className="w-full p-2 border rounded-md"
              placeholder="House Name"
            />
            <input
              name="house_type"
              value={editProperty.house_type}
              onChange={handleEditChange}
              className="w-full p-2 border rounded-md"
              placeholder="House Type"
            />
            <input
              name="for"
              value={editProperty.for}
              onChange={handleEditChange}
              className="w-full p-2 border rounded-md"
              placeholder="For (Buy/Rent)"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setEditProperty((prev) => ({
                    ...prev,
                    imageurl: file,
                  }));
                }
              }}
              className="w-full p-2 border rounded-md"
            />

            <textarea
              name="discription"
              value={editProperty.discription}
              onChange={handleEditChange}
              className="w-full p-2 border rounded-md"
              placeholder="Description"
            />
            <input
              name="price"
              value={editProperty.price}
              onChange={handleEditChange}
              type="number"
              className="w-full p-2 border rounded-md"
              placeholder="Price"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={addProperty ? handleAddSubmit : handleEditSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
