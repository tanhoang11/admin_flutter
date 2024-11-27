import React, { useState } from "react";
import { addTrip } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [tripData, setTripData] = useState({
    tripName: "",
    time: "",
    avatar: "",
    days: "",
    price: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTrip(tripData);
      toast.success("Trip added successfully!");
      navigate("/products");
    } catch (error) {
      toast.error("Failed to add trip.");
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Trip</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tripName"
          placeholder="Trip Name"
          value={tripData.tripName}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="time"
          placeholder="Time"
          value={tripData.time}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="avatar"
          placeholder="Image URL"
          value={tripData.avatar}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="days"
          placeholder="Days"
          value={tripData.days}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={tripData.price}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Add Trip
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
