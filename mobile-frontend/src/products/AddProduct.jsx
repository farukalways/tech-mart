import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const AddProduct = () => {
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    thumbnail: "",
  });

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post("http://localhost:3000/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newdata = { ...state, id: crypto.randomUUID().toString() };
    mutation.mutate(newdata);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value =
      event.target.type === "number"
        ? event.target.valueAsNumber
        : event.target.value;

    setState({
      ...state,

      [name]: value,
    });
  };

  return (
    <div>
      <form
        className="w-full max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4"
        onSubmit={handleFormSubmit}
      >
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Product Title
          </label>
          <input
            type="text"
            value={state.title}
            name="title"
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter product title"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={state.description}
            name="description"
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg min-h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter product description..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={state.price}
              name="price"
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter price"
            />
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Rating (0 - 5)
            </label>
            <input
              type="number"
              value={state.rating}
              min={0}
              max={5}
              name="rating"
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Rating"
            />
          </div>
        </div>

        {/* Thumbnail URL */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Thumbnail URL
          </label>
          <input
            type="text"
            value={state.thumbnail}
            name="thumbnail"
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter thumbnail image URL"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-semibold transition-all duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
