import { v4 as uuid } from "uuid";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import Model from "./components/ui/Model";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./validation";
import ErrorMEssage from "./components/ErrorMEssage";
import CircleColor from "./components/CircleColor";
import Select from "./components/ui/Select";
import { ProductName } from "./types";
function App() {
  const defaultValues = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  // **---------------- State --------------------------------
  const [product, setProduct] = useState<IProduct>(defaultValues);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [productEdit, setProductEdit] = useState<IProduct>(defaultValues);
  const [productEditColor, setProductEditColor] =useState<IProduct>(defaultValues);
  const [productEditIndex, setProductEditIndex] = useState<number>(0);
  const [selected, setSelected] = useState(categories[3]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModel, setIsOpenEditModel] = useState(false);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [colorError, setColorError] = useState<string | null>(null);
  // console.log(productEdit);

  // console.log(tempColors);

  const [errors, setError] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  // console.log(product);
  // console.log(errors);

  // **---------------- handler  --------------------------------
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeEditModal = () => {
    setIsOpenEditModel(false);
  };
  const openEditModal = () => {
    setIsOpenEditModel(true);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setError({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductEdit({
      ...productEdit,
      [name]: value,
    });
    setError({
      ...errors,
      [name]: "",
    });
  };

  const onCancel = () => {
    setProduct(defaultValues);
    closeModal();
    // console.log("Error state after reset:", errors); // This might still log the old state due to async updates
  };

  const submitEditHandler = (event: FormEvent<HTMLFormElement>): ReactNode => {
    const { title, description, imageURL, price } = productEdit;
    event.preventDefault();
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    // console.log(errors);
    const hasError =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasError) {
      setError(errors);
      return;
    }
    // console.log("tempColors is :", tempColors);
    // if (tempColors.length === 0) {
    //   setColorError("You must select at least one color");
    //   return;
    // } else {
    //   setColorError(null); // إزالة الخطأ عند تحديد لون
    // }
    // setProducts((prev) => [
    //   { ...product, id: uuid(), colors: tempColors, category: selected },
    //   ...prev,
    // ]);
    const updateProducts = [...products];
    updateProducts[productEditIndex] = {
      ...productEdit,
      colors: tempColors.concat(productEdit.colors),
    };
    setProducts(updateProducts);
    setProduct(defaultValues);
    setTempColors([]);
    closeEditModal();
  };
  // out
  const submitHandler = (event: FormEvent<HTMLFormElement>): ReactNode => {
    const { title, description, imageURL, price } = product;
    event.preventDefault();
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    // console.log(errors);
    const hasError =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasError) {
      setError(errors);
      return;
    }
    console.log("tempColors is :", tempColors);
    if (tempColors.length === 0) {
      setColorError("You must select at least one color");
      return;
    } else {
      setColorError(null); // إزالة الخطأ عند تحديد لون
    }
    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColors, category: selected },
      ...prev,
    ]);

    setProduct(defaultValues);
    setTempColors([]);
    closeModal();
  };

  const onCancelEdit = () => {
    setProduct(defaultValues);
    setError(defaultValues);
    closeEditModal();
  };
  const AddColor = () => {
    setProductEditColor(productEditColor);
  };
  //*  ---------------- Render --------------------------------
  const renderProduct = products.map((product, index) => {
    return (
      <ProductCard
        key={product.id}
        product={product}
        setProductEdit={setProductEdit}
        openEditModal={openEditModal}
        setProductEditIndex={setProductEditIndex}
        index={index}
      />
    );
  });
  const renderFormInputList = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col ">
      <label
        className="mb-[2px] text-sm font-medium text-gray-700 "
        htmlFor={"title"}
      >
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        // placeholder={input.name}
        onChange={onChangeHandler}
      />
      <ErrorMEssage message={errors[input.name]} />
    </div>
  ));
  const renderColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        setTempColors((prev) => {
          if (prev.includes(color)) {
            return prev.filter((item) => item !== color);
          } else if (!productEdit.colors.includes(color)) {
            return [...prev, color];
          }
          return prev;
        });
      }}
    />
  ));
  const renderProductEditWitError = (
    id: string,
    label: string,
    name: ProductName
  ) => {
    return (
      <div className="flex flex-col ">
        <label
          className="mb-[2px] text-sm font-medium text-gray-700 "
          htmlFor={id}
        >
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMEssage message={errors[name]} />
      </div>
    );
  };
  return (
    <>
      <main className="container mx-auto ">
        <div className=" w-full flex justify-center items-center mt-3">
          <Button
            className="w-40 bg-indigo-600 hover:bg-indigo-700 py-3"
            onClick={openModal}
          >
            Build Product
          </Button>
        </div>

        <div
          className=" m-5 
       grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
       xl:grid-cols-4 2xl:grid-cols-4 gap-2 md:gap-4 rounded-md
       "
        >
          {renderProduct}
        </div>
      </main>
      {/* Edit Model */}
      <Model
        isOpen={isOpenEditModel}
        closeModel={closeEditModal}
        title="Edit this PRODUCT"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWitError("title", "Product title", "title")}
          {renderProductEditWitError(
            "description",
            "Product description",
            "description"
          )}
          {renderProductEditWitError(
            "imageURL",
            "Product Image URL",
            "imageURL"
          )}
          {renderProductEditWitError("price", "Product price", "price")}
          {/* <div>
            {colorError && (
              <p className="text-red-500 text-sm">
                ⚠ hello from this form {colorError}
              </p>
            )}
          </div> */}
          <Select
            selected={productEdit.category}
            setSelected={(value) => {
              setProductEdit({ ...productEdit, category: value });
            }}
          />
          <div className="flex items-center space-x-3" onClick={AddColor}>
            {renderColors}
          </div>
          <div className="flex items-center space-x-3 flex-wrap space-y-2 ">
            {tempColors.concat(productEdit.colors).map((color) => (
              <span
                key={color}
                className="p-1 mr-1 rounded-md text-sm text-white flex flex-wrap"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Button className="w-full p-2  bg-indigo-600 " type="submit">
              Submit
            </Button>
            <Button
              className="w-full p-2  bg-gray-400 hover:bg-gray-500 "
              // onClick={closeModal}
              onClick={onCancelEdit}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Model>
      {/* ADD Model */}
      <Model isOpen={isOpen} closeModel={closeModal} title="ADD NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select selected={selected} setSelected={setSelected} />
          <div className="flex items-center space-x-3">{renderColors}</div>
          {colorError && <p className="text-red-500 text-sm">⚠ {colorError}</p>}
          <div className="flex items-center space-x-3 flex-wrap space-y-2 ">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 rounded-md text-sm text-white flex flex-wrap"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button className="w-full p-2  bg-indigo-600 " type="submit">
              Submit
            </Button>
            <Button
              className="w-full p-2  bg-gray-400 hover:bg-gray-500 "
              // onClick={closeModal}
              onClick={onCancel}
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
