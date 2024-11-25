import React, { useEffect, useState } from 'react';
import { getTrips } from '../services/api';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getTrips();
        setTrips(data); // Lưu dữ liệu trips vào state
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch trips.');
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="products">
      <h2>Trips</h2>
      {trips.length === 0 ? (
        <p>No trips available.</p>
      ) : (
        <ul>
          {trips.map((trip) => (
            <li key={trip.id}>
              <h3>{trip.tripName}</h3>
              <p>{trip.description}</p>
              <p><strong>Price:</strong> {trip.price} USD</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
