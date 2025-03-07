import { useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Model from "./components/ui/Model";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
function App() {
  // **---------------- State --------------------------------
  const [isOpen, setIsOpen] = useState(true);
  // **---------------- hanker  --------------------------------
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  //*  ---------------- Render --------------------------------

  const renderProduct = productList.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });
  const renderFormInputList = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col ">
      <label
        className="mb-[2px] text-sm font-medium text-gray-700 "
        htmlFor={input.id}
      >
        {input.label}
      </label>
      <Input type="text" id={input.id} name={input.name} />
    </div>
  ));
  return (
    <>
      <main className="container mx-auto">
        <Button
          width="w-full"
          className="bg-indigo-600 hover:bg-indigo-700"
          onClick={openModal}
        >
          Add Product
        </Button>

        <div
          className=" m-5 
       grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
       xl:grid-cols-4 2xl:grid-cols-4 gap-2 md:gap-4 rounded-md
       "
        >
          {renderProduct}
        </div>
      </main>
      <Model isOpen={isOpen} closeModel={closeModal} title="ADD NEW PRODUCT">
        <form className="space-y-3">
          {renderFormInputList}
          <div className="flex items-center space-x-3">
            <Button
              className="w-full p-2  bg-indigo-600 "
              onClick={() => {
                console.log("hello");
              }}
            >
              Submit
            </Button>
            <Button
              className="w-full p-2  bg-gray-400 hover:bg-gray-500 "
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>
    </>
  );
}

export default App;
