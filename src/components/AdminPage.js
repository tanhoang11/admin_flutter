import React, { useState, useEffect } from "react";
import axios from "axios";
import TripTable from "./TripTable";
import TripFormModal from "./TripFormModal";
import DeleteConfirm from "./DeleteConfirm";
import { Button } from "react-bootstrap";

const AdminPage = () => {
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [formData, setFormData] = useState({
    tripName: "",
    time: "",
    days: "",
    price: "",
    avatar: "",
  });
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [tripToDelete, setTripToDelete] = useState(null);

  const apiBaseUrl = "https://gki-flutter.onrender.com/api/trips";

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(apiBaseUrl);
        setTrips(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách trips:", error);
      }
    };
    fetchTrips();
  }, []);

  const handleShowModal = (trip = null) => {
    setSelectedTrip(trip);
    setFormData(
      trip
        ? { ...trip }
        : { tripName: "", time: "", days: "", price: "", avatar: "" }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/${id}`);
      setTrips((prev) => prev.filter((trip) => trip._id !== id));
      setShowDelete(false);
    } catch (error) {
      console.error("Lỗi khi xóa trip:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTrip) {
        const response = await axios.put(`${apiBaseUrl}/${selectedTrip._id}`, formData);
        setTrips((prev) =>
          prev.map((trip) =>
            trip._id === selectedTrip._id ? { ...trip, ...response.data } : trip
          )
        );
      } else {
        const response = await axios.post(apiBaseUrl, formData);
        setTrips((prev) => [...prev, response.data]);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Lỗi khi lưu trip:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Quản lý Trips</h1>
      <Button
        variant="primary"
        onClick={() => handleShowModal()}
        className="mb-3"
      >
        Thêm Trip
      </Button>
      <TripTable
        trips={trips}
        onEdit={handleShowModal}
        onDelete={(id) => {
          setTripToDelete(id);
          setShowDelete(true);
        }}
      />
      <TripFormModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEdit={!!selectedTrip}
      />
      <DeleteConfirm
        show={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => handleDelete(tripToDelete)}
      />
    </div>
  );
};

export default AdminPage;
