import React, { useEffect, useState } from "react";
import { getTrips, updateTrip } from "../services/api";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const { id } = useParams();
  const [tripData, setTripData] = useState({
    tripName: "",
    time: "",
    avatar: "",
    days: "",
    price: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const trips = await getTrips();
        const trip = trips.find((t) => t.id === parseInt(id, 10));
        if (trip) {
          setTripData(trip);
        } else {
          toast.error("Trip not found.");
          navigate("/products");
        }
      } catch (error) {
        toast.error("Failed to load trip details.");
      }
    };

    fetchTrip();
  }, [id, navigate]);

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

  if (!tripData) {
    return <div>Loading...</div>;
  }

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
          type="text"
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
