import {  HTMLAttributes, ReactNode } from "react";

export interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}
function Button({ className, children, width, ...rest }: IProps) {
  return (
    <div className={`${className} p-2 ${width} rounded-md mt-5`} {...rest}>
      {children}
    </div>
  );
}
export default Button;
