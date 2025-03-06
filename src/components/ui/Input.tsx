import { InputHTMLAttributes } from "react";

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
function Input({ ...rest }: IProps) {
  return (
    <input
      type="text"
      name=""
      id=""
      className="border-2 border-gray-600"
      {...rest}
    />
  );
}
export default Input;
