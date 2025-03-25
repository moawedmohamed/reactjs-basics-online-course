import { HTMLAttributes } from "react";

export interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
function CircleColor({ color, ...rest }: IProps) {
  return (
    <span
      className={`block w-5 h-5 rounded-full cursor-pointer`}
      style={{ backgroundColor: color }}
      {...rest}
    />
  );
}
export default CircleColor;
