import React, { useState } from 'react';
import { addTrip } from '../services/api';

const AddProductPage = ({ onProductAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTrip = { title, description, price };

    try {
      await addTrip(newTrip);
      alert('Thêm sản phẩm thành công!');
      onProductAdded(); // Gọi lại để refresh danh sách sản phẩm
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm', error);
      alert('Thêm sản phẩm thất bại!');
    }
  };

  return (
    <div>
      <h2>Thêm sản phẩm</h2>
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
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddProductPage;
