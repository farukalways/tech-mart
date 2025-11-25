import { useState } from "react";
import Products from "./products/AllProduct";
// import Product from "./products/Product";
import AddProduct from "./products/AddProduct";
const App = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (id) => {
    setSelectedProductId(id);
  };

  return (
    <div className="w-11/12 mx-auto flex justify-between">
      <div
        // className={selectedProductId === null ? "w-full" : "w-2/3"}
        className="w-3/3"
      >
        <Products onProductClick={handleProductClick} />
      </div>

      {/* {selectedProductId && (
        <div className="w-1/3 top-0 right-0 fixed">
          <Product
            id={selectedProductId}
            onBack={() => setSelectedProductId(null)}
          />
        </div>
      )} */}

      {/* <div className="w-1/3 top-0 right-0 fixed">
        <AddProduct />
      </div> */}
    </div>
  );
};

export default App;
