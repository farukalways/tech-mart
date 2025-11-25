import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`
  );
  return response.data;
};

const AllProduct = ({ onProductClick }) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
  });

  const mutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:3000/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  if (error)
    return (
      <p className="text-red-500 text-4xl text-center ">
        product data fetching error
      </p>
    );
  if (isLoading)
    return (
      <p className="text-green-500 text-4xl text-center"> Data fatching ... </p>
    );

  return (
    <div>
      {products.data.length > 0 ? (
        <ul className="grid grid-cols-3 gap-5">
          {products.data.map((product) => (
            <li
              key={product.id}
              onClick={() => onProductClick(product.id)}
              className="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full"
            >
              <div className="relative">
                <img
                  src={product.thumbnail}
                  alt="iPhone X"
                  className="w-full h-56 object-cover"
                />

                {/* <span class="absolute top-3 left-3 bg-white/80 px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur">
                  SIM-Free
                </span> */}

                <span className="absolute bottom-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow">
                  $899
                </span>
              </div>

              <div className="p-5 flex flex-col grow">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  {product.description.substring(0, 40)}...
                </p>

                <div className="flex items-center gap-1 mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 
          1.371 1.24.588 1.81l-2.8 2.034a1 1 0 
          00-.364 1.118l1.07 3.292c.3.921-.755 
          1.688-1.54 1.118l-2.8-2.034a1 1 0 
          00-1.175 0l-2.8 2.034c-.784.57-1.839-.197-1.54-1.118l1.07-3.292a1 1 0 
          00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 
          0 00.95-.69l1.07-3.292z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    {product.ratting}
                  </span>
                </div>

                <button className="mt-auto w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold transition-all duration-200 mb-5 ">
                  Add to Cart
                </button>
                <button
                  className="mt-auto w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>no data availeable</p>
      )}

      <div className="flex">
        {products.prev && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.prev)}
          >
            {" "}
            Prev{" "}
          </button>
        )}
        {products.next && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.next)}
          >
            {" "}
            Next{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
