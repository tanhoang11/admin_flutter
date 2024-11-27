import React, { useEffect, useState } from "react";
import { getTripById, updateTrip } from "../services/api";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const [tripData, setTripData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const trip = await getTripById(id);
        setTripData(trip);
      } catch (error) {
        toast.error("Failed to load trip details.");
      }
    };
    fetchTrip();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTrip(id, tripData);
      toast.success("Trip updated successfully!");
      navigate("/products");
    } catch (error) {
      toast.error("Failed to update trip.");
    }
  };

  if (!tripData) return <div>Loading...</div>;

  return (
    <div className="edit-product">
      <h2>Edit Trip</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tripName"
          value={tripData.tripName || ""}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="time"
          value={tripData.time || ""}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="avatar"
          value={tripData.avatar || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          name="days"
          value={tripData.days || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={tripData.price || ""}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-warning">
          Update Trip
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
