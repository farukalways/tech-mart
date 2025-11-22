import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retrieveProducts = async () => {
  const response = await axios.get("http://localhost:3000/products");
  return response.data;
};

const AllProduct = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: retrieveProducts,
  });

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
      {products.length > 0 ? (
        <div className="grid grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
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

              <div className="p-5">
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

                <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold transition-all duration-200">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>no data availeable</p>
      )}
    </div>
  );
};

export default AllProduct;
