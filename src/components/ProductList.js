import React, { useEffect, useState } from 'react';
import { getTrips, deleteTrip } from '../services/api'; // API service
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getTrips();
        setTrips(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch trips.');
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleDelete = async (tripId) => {
    try {
      await deleteTrip(tripId);
      setTrips(trips.filter(trip => trip.id !== tripId)); // Remove the deleted trip from the list
      toast.success('Trip deleted successfully');
    } catch (error) {
      toast.error('Failed to delete trip');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="products">
      <h2>Trips</h2>
      <Link to="/add-product" className="btn btn-primary">Add New Trip</Link>
      {trips.length === 0 ? (
        <p>No trips available.</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <div key={trip.id} className='product-card'>
              <h3>{trip.tripName}</h3>
              <p>{trip.description}</p>
              <img src = { trip.avatar }
                alt = { trip.tripName }
                style = {
                    { width: "400px" }
                }></img>
              <p><strong>Price:</strong> {trip.price} USD</p>
              <div>
                <Link to={`/edit-product/${trip.id}`} className="btn btn-warning">Edit</Link>
                <button onClick={() => handleDelete(trip.id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
