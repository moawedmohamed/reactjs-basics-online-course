import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}
function Button({ className, children, width, ...rest }: IProps) {
  return (
    <button className={`${className} p-2 ${width} rounded-md mt-5`}  {...rest}>
      {children}
    </button>
  );
}
export default Button;
