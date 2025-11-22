import Products from "./products/AllProduct";
import Product from "./products/Product";
const App = () => {
  return (
    <div className="w-11/12 mx-auto flex justify-between">
      <div className="w-2/3">
        <Products />
      </div>

      <div className="w-1/3">
        <Product id={2} />
      </div>
    </div>
  );
};

export default App;
