import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
    const [offers, setOffers] = useState([]);
    const [newOffer, setNewOffer] = useState({
        img: "",
        title: "",
        code: "",
        description: "",
    });
    const [isEditing, setIsEditing] = useState(false); // Track if editing
    const [currentOfferId, setCurrentOfferId] = useState(null); // Track current offer being edited

    const navigate = useNavigate();

    // Fetch offers from the backend
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/offers");
                setOffers(response.data);
            } catch (error) {
                console.error("Error fetching offers", error);
            }
        };

        fetchOffers();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        setNewOffer({ ...newOffer, [e.target.name]: e.target.value });
    };

    // Add or Update offer
    const handleSubmit = async () => {
        if (isEditing) {
            // If editing, update the existing offer
            try {
                const response = await axios.put(`http://localhost:3000/offers/${currentOfferId}`, newOffer);
                setOffers(offers.map(offer => (offer._id === currentOfferId ? response.data : offer))); // Update offers array
                setIsEditing(false); // Reset edit mode
                setCurrentOfferId(null); // Reset current offer
                setNewOffer({ img: "", title: "", code: "", description: "" }); // Clear the form
            } catch (error) {
                console.error("Error updating offer", error.response ? error.response.data : error.message);
            }
        } else {
            // If not editing, add a new offer
            try {
                const response = await axios.post("http://localhost:3000/offers", newOffer);
                setOffers([...offers, response.data]); // Update state with the new offer
                setNewOffer({ img: "", title: "", code: "", description: "" });
            } catch (error) {
                console.error("Error adding offer", error.response ? error.response.data : error.message);
            }
        }
    };

    // Delete an offer
    const deleteOffer = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/offers/${id}`);
            setOffers(offers.filter((offer) => offer._id !== id)); // Update state to remove deleted offer
        } catch (error) {
            console.error("Error deleting offer", error.response ? error.response.data : error.message);
        }
    };

    // Edit an offer
    const editOffer = (offer) => {
        setNewOffer({
            img: offer.img,
            title: offer.title,
            code: offer.code,
            description: offer.description,
        });
        setIsEditing(true);
        setCurrentOfferId(offer._id); // Set current offer ID for editing
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Admin Panel - Manage Offers</h2>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">{isEditing ? "Edit Offer" : "Add New Offer"}</h3>
                    <input
                        type="text"
                        name="img"
                        placeholder="Image URL"
                        value={newOffer.img}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full mb-2"
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Offer Title"
                        value={newOffer.title}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full mb-2"
                    />
                    <input
                        type="text"
                        name="code"
                        placeholder="Offer Code"
                        value={newOffer.code}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full mb-2"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={newOffer.description}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-full mb-2"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        {isEditing ? "Update Offer" : "Add Offer"}
                    </button>
                </div>

                <h3 className="text-lg font-semibold mb-2">Current Offers</h3>
                <ul className="space-y-4">
                    {offers.map((offer) => (
                        <li key={offer._id} className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 flex items-start space-x-4">
                            <img src={offer.img} alt="Offer" className="h-16 w-16 object-cover rounded-lg border border-gray-200" />
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold mb-1">Title: {offer.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-bold text-gray-900">Use Code:</span> <span className="font-bold">{offer.code}</span>
                                </p>
                                <p className="text-sm"><span className=" font-semibold">Description: </span>{offer.description}</p>
                            </div>
                            <div className="flex flex-col justify-between space-y-2">
                                <button
                                    onClick={() => editOffer(offer)} // Handle edit button click
                                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteOffer(offer._id)} // Handle delete button click
                                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
            <button
                onClick={() => navigate('/')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
                Back to Home
            </button>
        </div>
    );
};

export default AdminPanel;
