import React, { useState, useEffect } from 'react';
import { getTrips, updateTrip } from '../services/api';

const EditProductPage = ({ productId, onProductUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getTrips();
        const product = products.find((p) => p.id === productId);
        if (product) {
          setTitle(product.title);
          setDescription(product.description);
          setPrice(product.price);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTrip = { title, description, price };

    try {
      await updateTrip(productId, updatedTrip);
      alert('Sửa sản phẩm thành công!');
      onProductUpdated(); // Gọi lại để refresh danh sách sản phẩm
    } catch (error) {
      console.error('Lỗi khi sửa sản phẩm', error);
      alert('Sửa sản phẩm thất bại!');
    }
  };

  return (
    <div>
      <h2>Sửa sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Mô tả sản phẩm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="number"
          placeholder="Giá sản phẩm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
};

export default EditProductPage;
