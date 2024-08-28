import { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ product, onSubmit }) => {
  const [title, setTitle] = useState(product?.title || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || '');
  const [image, setImage] = useState(product?.image || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, price, image };
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="block w-full p-2 border rounded-md"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="block w-full p-2 border rounded-md"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="block w-full p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
        className="block w-full p-2 border rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md"
      >
        Save
      </button>
    </form>
  );
};

export default ProductForm;
