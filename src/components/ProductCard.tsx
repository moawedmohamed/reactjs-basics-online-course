import { IProduct } from "../interfaces";
import Image from "./Image";
import { textSlicer } from "../utils/functions";
import Button from "./ui/Button";
import CircleColor from "./CircleColor";
import { useState } from "react";
export interface IProps {
  product: IProduct;
  setProductEdit: (product: IProduct) => void;
  index: number;
  openEditModal: () => void;
  setProductEditIndex: (value: number) => void;
}
function ProductCard({
  product,
  setProductEdit,
  openEditModal,
  setProductEditIndex,
  index,
}: IProps) {
  const { category, colors, description, imageURL, price, title, id } = product;
  const renderColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));
  const onEdit = () => {
    setProductEdit(product); // تحديث بيانات المنتج
    openEditModal(); // فتح نافذة التعديل
    setProductEditIndex(index);
  };
  // console.log(product);

  return (
    <div
      key={id}
      className="max-w-sm md:max-w-lg  mx-auto md:mx-0  border rounded-md p-2 flex flex-col justify-between gap-4   "
    >
      <Image
        imageUrl={imageURL}
        altText={title}
        className="rounded-md max-w-lg max-h-64 object-cover"
      />

      <h3>{product.title}</h3>
      <p>{textSlicer(description)}</p>
      <div className="flex items-center my-4  space-x-2">{renderColors}</div>
      <div className="flex  items-center justify-between">
        <span>{`${price}$`}</span>

        <Image
          className="w-10 h-10 rounded-full object-bottom"
          imageUrl={category.imageURL}
          altText={category.name}
        />
      </div>
      <div className="flex  items-center justify-between space-x-2">
        <Button className="bg-indigo-600 " width="w-full" onClick={onEdit}>
          Edit
        </Button>
        <Button className="bg-red-600  text-center" width="w-full">
          Delete
        </Button>
      </div>
    </div>
  );
}
export default ProductCard;
