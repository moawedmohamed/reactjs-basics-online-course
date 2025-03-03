import { IProduct } from "../interfaces";
import Image from "./Image";
import functions, { textSlicer } from "../utils/functions";
import Button from "./ui/Button";
export interface IProps {
  product: IProduct;
}
function ProductCard({ product }: IProps) {
  const { category, colors, description, imageURL, price, title, id } = product;

  return (
    <div
      key={id}
      className="max-w-sm md:max-w-lg border rounded-md p-2 flex flex-col justify-between text-center  gap-4   "
    >
      <Image
        imageUrl={imageURL}
        altText={title}
        className="rounded-md w-80 max-h-64 object-cover"
      />

      <h3>{product.title}</h3>
      <p>{textSlicer(description)}</p>
      <div className="flex items-center my-4  space-x-2">
        <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer " />
        <span className="w-5 h-5 bg-yellow-600 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-red-800 rounded-full  cursor-pointer" />
      </div>
      <div className="flex  items-center justify-between">
        <span>{`${price}$`}</span>

        <Image
          className="w-10 h-10 rounded-full object-bottom"
          imageUrl={imageURL}
          altText={title}
        />
      </div>
      <div className="flex  items-center justify-between space-x-2">
        <Button
          className="bg-indigo-600 text-center"
          width="w-full"
          onClick={() => {
            alert("hello world");
          }}
        >
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
