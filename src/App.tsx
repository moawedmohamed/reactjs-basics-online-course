import "./App.css";
import ProductCard from "./components/ProductCard";
import { productList } from "./data";
function App() {
  const renderProduct = productList.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });
  return (
    <div>
      <div
        className="-red-500 m-5
       grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
       xl:grid-cols-4 2xl:grid-cols-5 gap-2 rounded-md
       max-w-md md:max-w-2xl"
      >
        {renderProduct}
      </div>
    </div>
  );
}

export default App;
