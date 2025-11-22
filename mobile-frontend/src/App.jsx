import { useState } from "react";
import Products from "./products/AllProduct";
import Product from "./products/Product";
const App = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (id) => {
    setSelectedProductId(id);
  };

  return (
    <div className="w-11/12 mx-auto flex justify-between">
      <div className="w-2/3">
        <Products onProductClick={handleProductClick} />
      </div>

      <div className="w-1/3 top-0 right-0 fixed">
        <Product id={selectedProductId} />
      </div>
    </div>
  );
};

export default App;
